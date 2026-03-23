import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { DeploymentWorkflowMapperComponent } from './deployment-workflow-mapper.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: DeploymentWorkflowMapperComponent,
    data: {
      id: 'link_deployment_l2json',
      permission: 'read',
      title: 'L2_JSON',
    },
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class DeploymentWorkflowMapperRoutingModule {}
