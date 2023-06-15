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
  submitted: boolean = false;
  fieldTouched: { [key: string]: boolean } = {};

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(60)]],
      password: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  isFieldInvalid(fieldName: string): boolean | null {
    const fieldControl = this.loginForm.get(fieldName);
    return (
      (fieldControl?.invalid && (fieldControl?.touched || this.submitted)) ||
      null
    );
  }

  isFieldTouched(fieldName: string): boolean {
    return !!this.fieldTouched[fieldName];
  }

  setFieldTouched(fieldName: string): void {
    this.fieldTouched[fieldName] = true;
  }

  login(): void {
    this.submitted = true;

    const isUsernameInvalid = this.isFieldInvalid('username');
    const isPasswordEmpty = this.isFieldInvalid('password');

    if (this.loginForm.invalid || isUsernameInvalid || isPasswordEmpty) {
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

    this.loginForm.reset();
    this.fieldTouched = {};
    this.submitted = false;
  }
}
