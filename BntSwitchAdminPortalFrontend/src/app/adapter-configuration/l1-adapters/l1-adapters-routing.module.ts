import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { L1AdaptersComponent } from './l1-adapters.component';
import { L1AdapterHomeComponent } from './l1-adapter-home/l1-adapter-home.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: L1AdaptersComponent,
    data: {
      id: 'link_l1_adapters',
      permission: 'write',
      title: 'L1AdaptersCreate',
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: L1AdapterHomeComponent,
    data: {
      id: 'link_l1_adapters',
      permission: 'read',
      title: 'L1 Adapters List',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: L1AdaptersComponent,
    data: {
      id: 'link_l1_adapters',
      permission: 'update',
      edit: true,
      title: 'L1AdaptersEdit',
    },
    path: ':adapterId',
  },
  {
    canActivate: [AuthGuard],
    component: L1AdaptersComponent,
    data: {
      id: 'link_l1_adapters',
      permission: 'read',
      edit: true,
      title: 'L1 Adapters Details',
    },
    path: ':adapterId/:view',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class L1AdaptersRoutingModule {}
