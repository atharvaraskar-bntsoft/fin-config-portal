import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationsModule } from '../animations/animations.module';
import { ColorModule } from '../color/color.module';

import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [AlertComponent],
  exports: [AlertComponent],
  imports: [CommonModule, AnimationsModule, ColorModule],
})
export class AlertModule {}
