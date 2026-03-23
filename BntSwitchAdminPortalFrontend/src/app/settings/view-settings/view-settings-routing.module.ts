import { MasterConfigurationDetailsComponent } from './../master-configuration/master-configuration-details/master-configuration-details.component';
import { MasterConfigurationComponent } from './../master-configuration/master-configuration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSettingsComponent } from './view-settings.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: ViewSettingsComponent,
    path: 'view-settings',
  },
  {
    canActivate: [AuthGuard],
    component: MasterConfigurationComponent,
    path: 'master-configuration',
    data: {
      title: "Master Configuration's",
    },
  },
  {
    canActivate: [AuthGuard],
    component: MasterConfigurationDetailsComponent,
    data: {
      title: 'Master Configuration Details',
    },
    path: 'config/details',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ViewSettingsRoutingModule {}
