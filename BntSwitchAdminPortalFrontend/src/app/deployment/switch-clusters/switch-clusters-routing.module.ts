import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwitchClustersComponent } from './switch-clusters.component';
import { SwitchClustersCreateComponent } from './switch-clusters-create/switch-clusters-create.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: SwitchClustersComponent,
    data: {
      id: 'link_deployment_clusters',
      permission: 'read',
      title: 'SWITCH_CLUSTERS',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: SwitchClustersCreateComponent,
    data: {
      id: 'link_deployment_clusters',
      permission: 'write',
      title: 'SWITCH_CLUSTERS_CREATE',
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: SwitchClustersCreateComponent,
    data: {
      id: 'link_deployment_clusters',
      permission: 'update',
      title: 'SWITCH_CLUSTERS_EDIT',
    },
    path: 'edit/:id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SwitchClustersRoutingModule {}
