import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { LocationDetailsComponent } from './location-details.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: LocationDetailsComponent,
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationDetailsRoutingModule {}
