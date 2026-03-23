import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VelocityLimitsComponent } from './velocity-limits.component';
import { VelocityLimitsInfoComponent } from './velocity-limits-info/velocity-limits-info.component';
import { VelocityLimitsCreateComponent } from './velocity-limits-create/velocity-limits-create.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: VelocityLimitsComponent,
    data: {
      id: 'link_velocity',
      permission: 'read',
    },
    path: 'velocity-limits',
  },
  {
    canActivate: [AuthGuard],
    component: VelocityLimitsInfoComponent,
    data: {
      id: 'link_velocity',
      permission: 'read',
      title: 'VELOCITY_LIMIT_DETAILS',
    },
    path: 'velocity-limits/velocity-limits-info/:id',
  },
  {
    canActivate: [AuthGuard],
    component: VelocityLimitsCreateComponent,
    data: {
      id: 'link_velocity',
      permission: 'write',
      title: 'VELOCITY_CREATE',
    },
    path: 'velocity-limits/create',
  },
  {
    canActivate: [AuthGuard],
    component: VelocityLimitsCreateComponent,
    data: {
      id: 'link_velocity',
      permission: 'update',
      title: 'VELOCITY_EDIT',
    },
    path: 'velocity-limits/edit/:id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class VelocityLimitsRoutingModule {}
