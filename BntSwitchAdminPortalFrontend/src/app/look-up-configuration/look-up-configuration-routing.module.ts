import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { LookUpConfigurationComponent } from './look-up-configuration.component';
import { ValueConfigurationComponent } from './value-configuration/value-configuration.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: LookUpConfigurationComponent,
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: ValueConfigurationComponent,
    data: {
      id: 'link_lookup_values',
      permission: 'read',
      title: 'Lookup Value',
    },
    path: 'detail/:id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LookUpConfigurationRoutingModule {}
