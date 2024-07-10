import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  user: any = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  };
  successMessage: string | null = null; 

  constructor(private userService: UserService, private router:Router) { }

  register(): void {
    this.userService.register(this.user).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.successMessage = 'User registered successfully. Redirecting to login...';

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        console.error('There was an error during the registration process', error);
      }
    );
  }

}
