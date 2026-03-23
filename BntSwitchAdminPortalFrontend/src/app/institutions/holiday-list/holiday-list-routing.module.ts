import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { HolidayListComponent } from './holiday-list.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: HolidayListComponent,
    data: {
      id: 'link_device',
      permission: 'read',
      title: 'Holiday',
    },
    path: '',
  },

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class HolidayRoutingModule {}
