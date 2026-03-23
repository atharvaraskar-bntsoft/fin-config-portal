import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { StatusComponent } from './status.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: StatusComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class StatusRoutingModule {}
