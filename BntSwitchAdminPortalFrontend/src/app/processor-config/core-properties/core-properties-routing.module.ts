import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorePropertiesComponent } from './core-properties.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { CreateCoreProperComponent } from './create-core-properties/create-core-proper.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: CorePropertiesComponent,
    path: '',
    data: {
      permission: 'read',
      // id: 'link_core_properties',
      id: 'link_l1_adapters'
    },
  },
  {
    canActivate: [AuthGuard],
    component: CreateCoreProperComponent,
    data: {
      id: 'link_l1_adapters',
      permission: 'write',
      title: 'Create Core Properties',
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: CreateCoreProperComponent,
    data: {
      id: 'link_l1_adapters',
      permission: 'write',
      title: 'Update Core Properties',
    },
    path: 'update/:id',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorePropertiesRoutingModule { }
