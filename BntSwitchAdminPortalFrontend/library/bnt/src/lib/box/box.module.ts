import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationsModule } from '../animations/animations.module';
import { ColorModule } from '../color/color.module';

import {
  BoxHeaderDirective,
  BoxContentDirective,
  BoxFooterDirective,
  BoxToolsDirective,
} from './box.directive';
import { BoxComponent } from './box.component';

@NgModule({
  declarations: [
    BoxComponent,
    BoxHeaderDirective,
    BoxContentDirective,
    BoxFooterDirective,
    BoxToolsDirective,
  ],
  exports: [
    BoxComponent,
    BoxHeaderDirective,
    BoxContentDirective,
    BoxFooterDirective,
    BoxToolsDirective,
  ],
  imports: [CommonModule, AnimationsModule, ColorModule],
})
export class BoxModule {}
