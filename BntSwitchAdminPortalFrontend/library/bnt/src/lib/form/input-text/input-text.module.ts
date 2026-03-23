import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ColorModule } from '../../color/color.module';

import { InputTextDirective } from './input-text.directive';

@NgModule({
  declarations: [InputTextDirective],
  exports: [InputTextDirective],
  imports: [CommonModule, ColorModule, FormsModule],
})
export class InputTextModule {}
