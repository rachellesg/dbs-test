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
  snackbarMessage: string = '';
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

  showSnackbar(message: string, variant: string): void {
    this.snackbarMessage = message;
    this.snackbarComponent.openSnackbar(message, variant);
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

    if (this.loginForm.invalid || (isUsernameInvalid && isPasswordEmpty)) {
      this.showSnackbar('Please enter the missing required fields.', 'error');
      return;
    }

    const username = this.loginForm.controls['username']?.value;
    const password = this.loginForm.controls['password']?.value;

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
