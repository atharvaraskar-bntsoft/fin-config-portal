import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstituionDetailsComponent } from './instituion-details.component';

const routes: Routes = [
  {
    component: InstituionDetailsComponent,
    path: 'institution/details'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituionDetailsRoutingModule { }
