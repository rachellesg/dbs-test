import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';
  submitted: boolean | null = null;
  isUsernameTouched: boolean = false;
  isPasswordTouched: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.maxLength(60)],
      password: ['', Validators.required, Validators.maxLength(60)],
    });
  }

  isUsernameInvalid(): boolean | null {
    const usernameControl = this.loginForm.get('username');
    return (
      (usernameControl?.invalid &&
        (usernameControl?.touched || this.submitted)) ||
      null
    );
  }

  isPasswordEmpty(): boolean | null {
    const passwordControl = this.loginForm.get('password');
    return (
      (passwordControl?.invalid &&
        (passwordControl?.touched || this.submitted)) ||
      null
    );
  }

  login(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.message = 'Please enter both username and password.';
      return;
    }
    const username = this.loginForm.controls['username']?.value;
    const password = this.loginForm.controls['password']?.value;

    if (username === 'admin' && password === 'password') {
      this.message = 'Login successful!';
    } else {
      this.message = 'Invalid username or password.';
    }

    // Reset form after login attempt
    this.loginForm.reset();
    this.submitted = false;
  }
}
