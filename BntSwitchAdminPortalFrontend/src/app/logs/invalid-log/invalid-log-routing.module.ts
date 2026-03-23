import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SafQueueComponent } from '../saf-queue/saf-queue.component';
import { InvalidLogComponent } from './invalid-log.component';
const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: InvalidLogComponent,
    data: {
      id: 'link_invalid_txn_log',
      permission: 'read',
    },
    path: 'invalid-log',
  },
  {
    canActivate: [AuthGuard],
    component: SafQueueComponent,
    data: {
      id: 'link_saf_queue',
      permission: 'read',
      title: 'SAF_QUEUE',
      // id: 'link_access_log',
    },
    path: 'saf-queue',
  },
  {
    canActivate: [AuthGuard],
    component: SafQueueComponent,
    data: {
      id: 'link_exception_queue',
      permission: 'read',
      title: 'EXCEPTION_QUEUE',
      exception: true,
      // id: 'link_access_log',
    },
    path: 'exception-queue',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class InvalidLogRoutingModule {}
