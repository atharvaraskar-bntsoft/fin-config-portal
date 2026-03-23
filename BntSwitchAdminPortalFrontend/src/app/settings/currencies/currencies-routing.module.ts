import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesComponent } from './currencies.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: CurrenciesComponent,
    data: {
      id: 'link_currencies',
      permission: 'read',
      title: 'Currencies',
    },
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CurrenciesRoutingModule {}
