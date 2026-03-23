import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryStatesComponent } from './country-states.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: CountryStatesComponent,
    data: {
      id: 'link_country_states',
      permission: 'read',
      title: 'CountryStates',
    },
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CountryStatesRoutingModule {}
