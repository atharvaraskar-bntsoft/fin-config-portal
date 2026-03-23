import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AnimationsModule } from '../../animations/animations.module';
import { SharedModule } from '@app/shared/shared.module';

import { SidebarLeftToggleDirective } from './sidebar-left.directive';
import { SidebarLeftComponent } from './sidebar-left.component';

@NgModule({
  declarations: [SidebarLeftToggleDirective, SidebarLeftComponent],
  exports: [SidebarLeftComponent],
  imports: [CommonModule, RouterModule, AnimationsModule, SharedModule],
})
export class SidebarLeftModule {}
