import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { RuntimePropertiesComponent } from './runtime-properties.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: RuntimePropertiesComponent,
    path: '',
    data: {
      permission: 'read',
      id: 'link_l1_adapters',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuntimePropertiesRoutingModule { }
