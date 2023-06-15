import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  @Input() message: string = '';
  @Input() variant: string = ''; // Updated to have a type of string

  showSnackbar: boolean = false;

  openSnackbar(message: string, variant: string): void {
    this.message = message;
    this.variant = variant;
    this.showSnackbar = true;
    setTimeout(() => {
      this.closeSnackbar();
    }, 5000);
  }

  closeSnackbar(): void {
    this.showSnackbar = false;
  }
}
