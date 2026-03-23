import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationsModule } from '../animations/animations.module';
import { ColorModule } from '../color/color.module';

import {
  AccordionHeaderComponent,
  AccordionContentComponent,
  AccordionComponent,
  AccordionGroupComponent,
} from './accordion.component';
import { AccordionToggleDirective } from './accordion.directive';

@NgModule({
  declarations: [
    AccordionToggleDirective,
    AccordionHeaderComponent,
    AccordionContentComponent,
    AccordionComponent,
    AccordionGroupComponent,
  ],
  exports: [
    AccordionHeaderComponent,
    AccordionComponent,
    AccordionContentComponent,
    AccordionGroupComponent,
  ],
  imports: [CommonModule, AnimationsModule, ColorModule],
})
export class AccordionModule {}
