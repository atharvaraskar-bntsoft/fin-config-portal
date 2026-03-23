import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ColorModule } from '../../color/color.module';

import { InputGroupComponent } from './input-group.component';
import {
  InputGroupAddonLeftDirective,
  InputGroupAddonRightDirective,
  InputGroupContentDirective,
  InputGroupErrorDirective,
  InputGroupLabelDirective,
} from './input-group.directive';

@NgModule({
  declarations: [
    InputGroupComponent,
    InputGroupLabelDirective,
    InputGroupAddonLeftDirective,
    InputGroupAddonRightDirective,
    InputGroupContentDirective,
    InputGroupErrorDirective,
  ],
  exports: [
    InputGroupComponent,
    InputGroupLabelDirective,
    InputGroupAddonLeftDirective,
    InputGroupAddonRightDirective,
    InputGroupContentDirective,
    InputGroupErrorDirective,
  ],
  imports: [CommonModule, ColorModule, FormsModule],
})
export class InputGroupModule {}
