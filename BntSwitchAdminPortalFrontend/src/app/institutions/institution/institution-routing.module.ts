import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionComponent } from './institution.component';
import { InstitutionInfoComponent } from './institution-info/institution-info.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { InstituionDetailsComponent } from './instituion-details/instituion-details.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: InstitutionComponent,
    data: {
      id: 'link_merchant',
      permission: 'read',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: InstitutionInfoComponent,
    data: {
      id: 'link_merchant',
      permission: 'read',
      title: 'InstitutionDetails',
    },
    path: 'institution-info/:id',
  },
  {
    canActivate: [AuthGuard],
    component: InstituionDetailsComponent,
    data: {
      id: 'link_merchant',
      permission: 'read',
      title: 'InstitutionDetails',
    },
    path: 'institution-details/:id',
  },
  {
    canActivate: [AuthGuard],
    component: InstitutionComponent,
    path: 'filter',
    data: {
      id: 'link_merchant',
      permission: 'read',
    },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class InstitutionRoutingModule {}
