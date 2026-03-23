import { Action } from '@ngrx/store';
import { NotificationGetCall } from '@app/models/notifications.interface';

export enum ENotificationsActions {
  GetAlerts = '[Alerts] Get Alerts List',
  GetAlertsSuccess = '[Alerts] Get Alerts List Success',
  GetNotifications = '[Notifications] Get Notifications List',
  GetNotificationsSuccess = '[Notifications] Get Notifications List Success',
  PostNotifications = '[Notifications] Post Notifications',
  PostNotificationsSuccess = '[Notifications] Post Notifications Success',
}

export class GetAlerts implements Action {
  public readonly type = ENotificationsActions.GetAlerts;

  constructor(public payload?: any) {}
}

export class GetAlertsSuccess implements Action {
  public readonly type = ENotificationsActions.GetAlertsSuccess;

  constructor(public payload: any) {}
}

export class GetNotifications implements Action {
  public readonly type = ENotificationsActions.GetNotifications;

  constructor(public payload?: any) {}
}

export class GetNotificationsSuccess implements Action {
  public readonly type = ENotificationsActions.GetNotificationsSuccess;

  constructor(public payload: NotificationGetCall) {}
}

export type NotificationsActions =
  | GetAlerts
  | GetAlertsSuccess
  | GetNotifications
  | GetNotificationsSuccess;
