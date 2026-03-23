import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorModule } from '../color/color.module';

import {
  BoxInfoHeaderDirective,
  BoxInfoContentDirective,
  BoxInfoFooterDirective,
} from './box-info.directive';
import { BoxInfoComponent } from './box-info.component';

@NgModule({
  declarations: [
    BoxInfoComponent,
    BoxInfoHeaderDirective,
    BoxInfoContentDirective,
    BoxInfoFooterDirective,
  ],
  exports: [
    BoxInfoComponent,
    BoxInfoHeaderDirective,
    BoxInfoContentDirective,
    BoxInfoFooterDirective,
  ],
  imports: [CommonModule, ColorModule],
})
export class BoxInfoModule {}
