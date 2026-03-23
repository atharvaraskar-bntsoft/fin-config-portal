import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

import { AuditLogDetailsComponent } from './audit-log-details/audit-log-details.component';
import { AuditLogComponent } from './audit-log.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: AuditLogComponent,
    path: '',
    // children: [
    //     { path: '', redirectTo: 'login', pathMatch: 'full' },
    //     { path: '', component: LoginActionComponent},
    //     { path: 'forgot-password', component: ForgotPasswordComponent, data: {
    //       customLayout: true
    //     } },
    // ]
  },
  {
    canActivate: [AuthGuard],
    component: AuditLogDetailsComponent,
    path: 'details',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AuditLogRoutingModule {}
