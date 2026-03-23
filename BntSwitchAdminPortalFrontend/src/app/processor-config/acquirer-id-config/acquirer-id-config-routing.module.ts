import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { AcquirerIdConfigComponent } from './acquirer-id-config.component';
import { AcquirerIdConfigInfoComponent } from './acquirer-id-config-info/acquirer-id-config-info.component';
import { AcquirerIdConfigDetailsComponent } from './acquirer-id-config-details/acquirer-id-config-details.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: AcquirerIdConfigComponent,
    path: '',
  },

  {
    canActivate: [AuthGuard],
    component: AcquirerIdConfigInfoComponent,
    data: {
      id: 'link_acquirer_id_config',
      permission: 'read',
      title: 'Acquirer Details',
    },
    path: 'acquirer-id-config-info/:id',
  },

  {
    canActivate: [AuthGuard],
    component: AcquirerIdConfigDetailsComponent,
    data: {
      id: 'link_acquirer_id_config',
      permission: 'read',
      title: 'Acquirer Details',
    },
    path: 'acquirer-id-config-details/:id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AcquirerIdConfigRoutingModule {}
