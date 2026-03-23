import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from '../device/device.component';
import { DeviceInfoComponent } from '../device/device-info/device-info.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: DeviceComponent,
    data: {
      id: 'link_device',
      permission: 'read',
      title: 'DEVICES',
    },
    path: '',
  },

  {
    canActivate: [AuthGuard],
    component: DeviceInfoComponent,
    data: {
      id: 'link_device',
      permission: 'read',
      title: 'DeviceDetail',
    },
    path: 'device-info/:id',
  },

  {
    canActivate: [AuthGuard],
    component: DeviceComponent,
    path: 'filter',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class DeviceRoutingModule {}
