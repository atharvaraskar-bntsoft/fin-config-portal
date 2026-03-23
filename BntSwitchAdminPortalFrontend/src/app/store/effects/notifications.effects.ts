import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  ENotificationsActions,
  GetAlerts,
  GetAlertsSuccess,
  GetNotifications,
  GetNotificationsSuccess,
} from '../actions/notifications.actions';
import { NotificationsService } from '../../services/notications.service';
import { NotificationGetCall } from '@app/models/notifications.interface';

@Injectable()
export class NotificationsEffects {
  
  GetAlerts$ = createEffect(() => this._actions$.pipe(
    ofType<GetAlerts>(ENotificationsActions.GetAlerts),
    switchMap(payload => this._notificationsService.getAlerts(payload)),
    switchMap((data: any) => {
      return of(new GetAlertsSuccess(data));
    }),
  ));

  
  GetNotifications$ = createEffect(() => this._actions$.pipe(
    ofType<GetNotifications>(ENotificationsActions.GetNotifications),
    switchMap(payload => this._notificationsService.getNotifications(payload)),
    switchMap((data: NotificationGetCall) => {
      return of(new GetNotificationsSuccess(data));
    }),
  ));

  constructor(private _notificationsService: NotificationsService, private _actions$: Actions) {}
}
