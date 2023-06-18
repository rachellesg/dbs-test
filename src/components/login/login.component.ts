import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarComponent } from '../common/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SnackbarComponent],
})
export class LoginComponent {
  @ViewChild(SnackbarComponent) snackbarComponent!: SnackbarComponent;
  snackbarMessage = '';
  loginForm: FormGroup;
  submitted = false;
  fieldTouched: { [key: string]: boolean } = {};

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(60)]],
      password: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  showSnackbar(message: string, variant: string): void {
    this.snackbarMessage = message;
    this.snackbarComponent.openSnackbar(message, variant);
  }

  isFieldInvalid(fieldName: string): boolean | null {
    const fieldControl = this.loginForm.get(fieldName);
    return (fieldControl?.invalid && this.submitted) || null;
  }

  login(): void {
    this.submitted = true;

    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control?.markAsTouched();
    });

    const isUsernameInvalid = this.isFieldInvalid('username');
    const isPasswordInvalid = this.isFieldInvalid('password');

    if (this.loginForm.invalid || (isUsernameInvalid && isPasswordInvalid)) {
      console.log(this.loginForm.invalid, isUsernameInvalid, isPasswordInvalid);
      this.showSnackbar('Please enter the missing required fields.', 'error');
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username === 'admin' && password === 'password') {
      this.showSnackbar('Login success!', 'success');
    } else {
      this.showSnackbar('Invalid username or password.', 'error');
      return;
    }

    this.loginForm.reset();
    this.fieldTouched = {};
    this.submitted = false;
  }
}
