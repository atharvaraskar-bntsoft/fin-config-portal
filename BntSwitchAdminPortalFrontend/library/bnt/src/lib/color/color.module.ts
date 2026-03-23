import { NgModule } from '@angular/core';

import { BackgroundColorDirective, ColorDirective } from './color.directive';

@NgModule({
  declarations: [BackgroundColorDirective, ColorDirective],
  exports: [BackgroundColorDirective, ColorDirective],
})
export class ColorModule {}
