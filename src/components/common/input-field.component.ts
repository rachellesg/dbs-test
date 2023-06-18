import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() type!: string;
  @Input() control!: FormControl;
  @Input() placeholder!: string;
  @Input() errorId!: string;
  @Input() error!: string;

  setFieldTouched(): void {
    this.control.markAsTouched();
  }
}
