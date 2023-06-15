import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  @Input() message: string = '';
  showSnackbar: boolean = false;

  openSnackbar(message: string): void {
    this.message = message;
    this.showSnackbar = true;
    setTimeout(() => {
      this.closeSnackbar();
    }, 5000);
  }

  closeSnackbar(): void {
    this.showSnackbar = false;
  }
}
