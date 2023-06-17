import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: string = '';
  @Input() onClick?: () => void;
  @Input() type?: string = 'button';

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
