import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceTypesComponent } from '@app/settings/device-types/device-types.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: DeviceTypesComponent,
    data: {
      id: 'link_device_types',
      permission: 'read',
      title: 'Devicestypes',
    },
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class DeviceTypesRoutingModule {}
