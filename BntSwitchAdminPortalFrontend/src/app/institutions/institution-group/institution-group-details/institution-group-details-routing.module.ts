import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitutionGroupDetailsComponent } from './institution-group-details.component';

const routes: Routes = [
  {
    component: InstitutionGroupDetailsComponent,
    path: 'institution-group/details',

    // children: [
    //     { path: '', redirectTo: 'login', pathMatch: 'full' },
    //     { path: '', component: LoginActionComponent},
    //     { path: 'forgot-password', component: ForgotPasswordComponent, data: {
    //       customLayout: true
    //     } },
    // ]
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class InstitutonGroupDetailsRoutingModule {}
