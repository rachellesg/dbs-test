import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  login(): void {
    if (this.username === 'admin' && this.password === 'password') {
      this.message = 'Login successful!';
    } else {
      this.message = 'Invalid username or password.';
    }

    this.username = '';
    this.password = '';
  }
}
