import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationsModule } from '../animations/animations.module';
import { ColorModule } from '../color/color.module';

import {
  DropdownComponent,
  DropdownToggleComponent,
  DropdownMenuComponent,
} from './dropdown.component';

@NgModule({
  declarations: [DropdownComponent, DropdownToggleComponent, DropdownMenuComponent],
  exports: [DropdownComponent, DropdownToggleComponent, DropdownMenuComponent],
  imports: [CommonModule, AnimationsModule, ColorModule],
})
export class DropdownModule {}
