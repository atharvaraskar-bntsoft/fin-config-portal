import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { L3AdaptersComponent } from './l3-adapters.component';
import { L3AdaptersCreateComponent } from './l3-adapters-create/l3-adapters-create.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: L3AdaptersComponent,
    data: {
      id: 'link_l3_adapters',
      permission: 'read',
      title: 'L3 Adapters List',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: L3AdaptersCreateComponent,
    data: {
      id: 'link_l3_adapters',
      permission: 'write',
      title: 'L3AdaptersCreate',
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: L3AdaptersCreateComponent,
    data: {
      id: 'link_l3_adapters',
      permission: 'update',
      title: 'L3AdaptersEdit',
    },
    path: ':adapterId',
  },
  {
    canActivate: [AuthGuard],
    component: L3AdaptersCreateComponent,
    data: {
      id: 'link_l3_adapters',
      permission: 'read',
      title: 'L3 Adapters Details',
    },
    path: ':adapterId/:view',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class L3AdaptersRoutingModule {}
