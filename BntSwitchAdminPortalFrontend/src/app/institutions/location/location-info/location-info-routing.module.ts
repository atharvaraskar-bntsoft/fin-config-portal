import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { LocationInfoComponent } from './location-info.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: LocationInfoComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LocationInfoRoutingModule {}
