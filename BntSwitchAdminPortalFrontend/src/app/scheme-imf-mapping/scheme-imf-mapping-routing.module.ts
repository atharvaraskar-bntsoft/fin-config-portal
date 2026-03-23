import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SchemeImfMappingComponent } from './scheme-imf-mapping.component';
import { SchemeImfMappingCreateComponent } from './scheme-imf-mapping-create/scheme-imf-mapping-create.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: SchemeImfMappingComponent,
    data: {
      title: 'Scheme IMF Mapping',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: SchemeImfMappingCreateComponent,
    data: {
      // permission: 'write',
      title: 'Create Scheme IMF Mapping',
    },
    path: 'create',
  },
  // {
  //   canActivate: [AuthGuard],
  //   component: SchemeImfMappingComponent,
  //   data: {
  //     title: 'Scheme IMF Mapping'
  //   },
  //   path: ':id'
  // },
  {
    canActivate: [AuthGuard],
    component: SchemeImfMappingCreateComponent,
    data: {
      // permission: 'write',
      title: 'Edit Scheme IMF Mapping',
    },
    path: ':id/:fieldid',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SchemeImfMappingRoutingModule {}
