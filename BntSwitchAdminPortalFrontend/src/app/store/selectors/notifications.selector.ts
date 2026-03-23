import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { INotificationsState } from '../state/notifications.state';

const selectNotifications = (state: IAppState) => state.notifications;
const selectPermissions = (state: IAppState) => state.permissions;

export const selectNotificationsList = createSelector(
  selectNotifications,
  (state: INotificationsState) => state.notifications,
);
export const selectAlertsList = createSelector(
  selectNotifications,
  (state: INotificationsState) => state.alerts,
);

export const selectNotificationsSuccess = createSelector(
  selectNotifications,
  (state: any) => state.notificationsResponse,
);
