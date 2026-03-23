import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRightRoutingModule } from './sidebar-right-routing.module';
import { SidebarRightComponent } from './sidebar-right.component';

import { BoxModule } from 'bnt';

@NgModule({
  declarations: [SidebarRightComponent],
  imports: [CommonModule, SidebarRightRoutingModule, BoxModule],
})
export class SidebarRightModule {}
