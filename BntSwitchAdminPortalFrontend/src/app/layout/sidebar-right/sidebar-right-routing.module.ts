import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarRightComponent } from './sidebar-right.component';

const routes: Routes = [
  {
    component: SidebarRightComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SidebarRightRoutingModule {}
