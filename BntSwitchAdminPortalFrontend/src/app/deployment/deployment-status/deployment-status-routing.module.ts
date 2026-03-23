import { CreateDeploymentComponent } from './../schedule/create-deployment/create-deployment.component';
import { ScheduleComponent } from './../schedule/schedule.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeploymentStatusComponent } from './deployment-status.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: ScheduleComponent,
    data: {
      id: 'link_deployment_schedule',
      permission: 'read',
      title: 'Schedule',
    },
    path: 'deployment-schedule',
  },
  {
    canActivate: [AuthGuard],
    component: CreateDeploymentComponent,
    data: {
      id:'link_deployment_schedule',
      permission: 'write',
      title: 'Create Deployment',
    },
    path: 'create-schedule-deployment',
  },
  {
    canActivate: [AuthGuard],
    component: CreateDeploymentComponent,
    data: {
      id:'link_deployment_schedule',
      permission: 'update',
      title: 'Edit Deployment',
    },
    path: 'edit-schedule-deployment/:id',
  },
  {
    canActivate: [AuthGuard],
    component: DeploymentStatusComponent,
    data: {
      id:'link_deployment_status',
      permission: 'read',
      title: 'DEPLOYMENT_STATUS',
    },
    path: 'deployment-status',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class DeploymentStatusRoutingModule {}
