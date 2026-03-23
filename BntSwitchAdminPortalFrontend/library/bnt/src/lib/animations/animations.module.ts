import { NgModule } from '@angular/core';

import { CollapseAnimationDirective } from './animations.directive';

@NgModule({
  declarations: [CollapseAnimationDirective],
  exports: [CollapseAnimationDirective],
})
export class AnimationsModule {}
