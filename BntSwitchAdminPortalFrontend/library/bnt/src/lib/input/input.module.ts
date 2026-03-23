import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { UppercaseDirective } from './uppercase.directive';
import { RvCheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';
import { NoWhitespaceDirective } from './no-whitespace.directive';

@NgModule({
  declarations: [RvCheckboxComponent, NoWhitespaceDirective],
  exports: [RvCheckboxComponent, NoWhitespaceDirective],
  imports: [CommonModule, FormsModule],
})
export class InputRvModule {}
