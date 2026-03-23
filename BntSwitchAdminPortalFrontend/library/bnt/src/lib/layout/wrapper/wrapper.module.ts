import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrapperComponent } from './wrapper.component';

@NgModule({
  declarations: [WrapperComponent],
  exports: [WrapperComponent],
  imports: [CommonModule],
})
export class WrapperModule {}
