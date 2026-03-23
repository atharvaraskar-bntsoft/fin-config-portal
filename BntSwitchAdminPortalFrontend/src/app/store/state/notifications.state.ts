import { NotificationGetCall } from '@app/models/notifications.interface';

export interface INotificationsState {
  alerts: any;
  notifications: NotificationGetCall;
  notificationsResponse: NotificationGetCall;
}

export const initialNotificationsState: INotificationsState = {
  alerts: null,
  notifications: null,
  notificationsResponse: null,
};
