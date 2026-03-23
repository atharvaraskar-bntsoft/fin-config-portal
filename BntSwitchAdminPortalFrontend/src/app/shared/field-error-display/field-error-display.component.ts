import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  styleUrls: ['./field-error-display.component.css'],
  templateUrl: './field-error-display.component.html',
})
export class FieldErrorDisplayComponent {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
}
