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
  rememberMe: boolean = false;

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

  toggleRememberMe(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.rememberMe = checked;
  }

  login(): void {
    this.submitted = true;

    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control?.markAsTouched();
    });

    const isUsernameInvalid = this.isFieldInvalid('username');
    const isPasswordInvalid = this.isFieldInvalid('password');

    if (this.loginForm.invalid && isUsernameInvalid && isPasswordInvalid) {
      this.showSnackbar('Please enter your username and password', 'error');
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username === 'admin' && password === 'password') {
      if (this.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('username', username);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('username');
      }

      this.showSnackbar('Login success!', 'success');
    } else {
      if (isUsernameInvalid && !isPasswordInvalid) {
        this.showSnackbar('Please enter your username', 'error');
      } else if (isPasswordInvalid && !isUsernameInvalid) {
        this.showSnackbar('Please enter your password', 'error');
      } else {
        this.showSnackbar('Incorrect username or password.', 'error');
      }
      return;
    }

    this.loginForm.reset();
    this.submitted = false;
  }

  ngOnInit() {
    const rememberMeState = localStorage.getItem('rememberMe');
    this.rememberMe = rememberMeState === 'true';

    if (this.rememberMe) {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        this.loginForm.patchValue({ username: storedUsername });
      }
    }
  }
}
