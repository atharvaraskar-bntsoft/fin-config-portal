import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarLeftRoutingModule } from './sidebar-left-routing.module';
import { SidebarLeftComponent } from './sidebar-left.component';

import { BoxModule } from 'bnt';

@NgModule({
  declarations: [SidebarLeftComponent],
  imports: [CommonModule, SidebarLeftRoutingModule, BoxModule],
})
export class SidebarLeftModule {}
