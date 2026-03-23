import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerDirective } from './datepicker.directive';
@NgModule({
  declarations: [DatePickerDirective],
  exports: [DatePickerDirective],
  imports: [CommonModule],
})
export class DatePickerRvModule {}
