import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionGroupComponent } from './institution-group.component';
import { InstitutionGroupDetailsComponent } from './institution-group-details/institution-group-details.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: InstitutionGroupComponent,
    data: {
      id: 'link_institution',
      permission: 'read',
      title: 'INSTITUTION_GROUPS',
    },
    path: 'institution-group',
  },
  {
    canActivate: [AuthGuard],
    component: InstitutionGroupDetailsComponent,
    data: {
      id: 'link_institution',
      permission: 'read',
      title: 'INSTITUTION_GROUP_DETAIL',
    },
    path: 'institution-group/:id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class InstitutonGroupRoutingModule {}
