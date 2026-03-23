import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarLeftComponent } from './sidebar-left.component';

const routes: Routes = [
  {
    component: SidebarLeftComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SidebarLeftRoutingModule {}
