import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRightComponent } from './sidebar-right.component';

@NgModule({
  declarations: [SidebarRightComponent],
  exports: [SidebarRightComponent],
  imports: [CommonModule],
})
export class SidebarRightModule {}
