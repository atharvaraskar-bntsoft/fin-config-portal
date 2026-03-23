import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';
import { LocationInfoComponent } from './location-info/location-info.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { LocationDetailsComponent } from './location-details/location-details.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: LocationComponent,
    data: {
      id: 'link_location',
      permission: 'read',
      title: 'LOCATIONS',
    },
    path: '',
  },

  {
    canActivate: [AuthGuard],
    component: LocationInfoComponent,
    data: {
      id: 'link_location',
      permission: 'read',
      title: 'LOCATION_DETAIL',
    },
    path: 'locations-info/:id',
  },

  {
    canActivate: [AuthGuard],
    component: LocationDetailsComponent,
    data: {
      id: 'link_location',
      permission: 'read',
      title: 'LOCATION_DETAIL',
    },
    path: 'locations-details/:id',
  },

  {
    canActivate: [AuthGuard],
    component: LocationComponent,
    data: {
      id: 'link_location',
      permission: 'read',
      title: 'LOCATION',
    },
    path: ':id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LocationRoutingModule {}
