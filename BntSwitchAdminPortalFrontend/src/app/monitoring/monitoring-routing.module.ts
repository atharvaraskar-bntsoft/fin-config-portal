import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

import { MonitoringScreenComponent } from './monitoring-screen/monitoring-screen.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: MonitoringScreenComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MonitoringRoutingModule {}
