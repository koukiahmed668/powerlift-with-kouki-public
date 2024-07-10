import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected property name
})
export class LoginComponent {
  user: any = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) { }

  login(): void {
    this.userService.login(this.user).subscribe(
      response => {
        this.router.navigate(['/home']); 
      },
      error => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
