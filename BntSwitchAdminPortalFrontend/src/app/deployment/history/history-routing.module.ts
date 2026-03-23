import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: HistoryComponent,
    data: {
      id: 'link_deployment_history',
      permission: 'read',
      title: 'DEPLOYMENT_HISTORY',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: HistoryDetailComponent,
    data: {
      id: 'link_deployment_history',
      permission: 'read',
      title: 'Deployment History Details',
    },
    path: ':id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class HistoryRoutingModule {}
