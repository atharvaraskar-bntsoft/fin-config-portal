import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalsComponent } from './approvals.component';
import { ApprovalsDetailsComponent } from './approvals-details/approvals-details.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    component: ApprovalsComponent,
    path: '',
    canActivate: [AuthGuard],
    data: {
      id: 'link_pending_approvals',
      permission: 'read',
    },
  },
  {
    component: ApprovalsDetailsComponent,
    path: 'details',
    canActivate: [AuthGuard],
    data: {
      id: 'link_pending_approvals',
      permission: 'read',
    },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ApprovalsRoutingModule {}
