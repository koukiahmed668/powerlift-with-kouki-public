import { Component, AfterViewInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostDTO } from '../services/PostDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService, UserDTO } from '../services/user.service'; // Import UserDTO from UserService
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements AfterViewInit {

  constructor(private postService: PostService,
     private snackBar: MatSnackBar,
     private userService:UserService
    ) { }

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

  createPost(title: string, body: string): void {
    if (!title || !body) {
      this.snackBar.open('Both title and body are required', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Fetch logged-in user's ID
    const userId = this.userService.getLoggedInUserId(); // Assuming getLoggedInUserId() returns number | null

    if (userId === null) {
      console.error('User ID not found');
      this.snackBar.open('User ID not found', 'Close', {
        duration: 3000,
      });
      return;
    }

    const newPost: PostDTO = { title, body, userId };
    this.postService.createPost(newPost,userId).subscribe(
      (data: PostDTO) => {
        this.snackBar.open('Post created successfully!', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error creating post', error);
        this.snackBar.open('There was an error creating the post', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}