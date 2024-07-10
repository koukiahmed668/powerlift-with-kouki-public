import { Component, AfterViewInit, OnInit, ElementRef, HostListener } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostDTO } from '../services/PostDTO';
import { UserService, UserDTO } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit, OnInit {
  posts: PostDTO[] = [];
  user: UserDTO | undefined;
  activePostId: number | null = null;

  constructor(private postService: PostService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private elRef: ElementRef,

            ) { }

  ngOnInit(): void {
    this.fetchPosts();
    this.getLoggedInUser();
  }

  ngAfterViewInit() {
    this.initDarkThemeToggle();
  }

  initDarkThemeToggle() {
    const darkButton = document.querySelector('.darkTheme');

    if (darkButton) {
      darkButton.addEventListener('click', () => {
        darkButton.classList.toggle('button-Active');
        document.body.classList.toggle('dark-color');
      });
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });
  }

  
  getLoggedInUser(): void {
    this.userService.getLoggedInUser().subscribe(
      (user: UserDTO) => {
        this.user = user;
        console.log(user);
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }
  
  fetchPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data: PostDTO[]) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }

  toggleMenu(postId: number): void {
    if (this.activePostId === postId) {
      this.activePostId = null; // Close the menu if already open
    } else {
      this.activePostId = postId; // Open the menu for the clicked post
    }
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
      this.openSnackBar('Post deleted successfully', 'Close');
    });
  }

  editPost(postId: number): void {
    // Implement edit logic here
    console.log(`Editing post ${postId}`);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.isClickInsidePostMenu(event)) {
      this.activePostId = null; // Close the menu if clicked outside
    }
  }

  isClickInsidePostMenu(event: MouseEvent): boolean {
    const targetElement = event.target as HTMLElement;
    const postMenu = this.elRef.nativeElement.querySelector('.post-options');

    if (postMenu && postMenu.contains(targetElement)) {
      return true; // Click is inside the post menu
    }

    return false; // Click is outside the post menu
  }
  
}
