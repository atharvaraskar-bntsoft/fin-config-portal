import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { NotificationsDetailsComponent } from './notifications-details/notifications-details.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    component: NotificationsComponent,
    path: '',
    canActivate: [AuthGuard],
    data: {
      id: 'link_notification',
      permission: 'read',
    },
  },
  {
    component: NotificationsDetailsComponent,
    path: 'details',
    canActivate: [AuthGuard],
    data: {
      id: 'link_notification',
      permission: 'read',
    },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class NotificationsRoutingModule {}
