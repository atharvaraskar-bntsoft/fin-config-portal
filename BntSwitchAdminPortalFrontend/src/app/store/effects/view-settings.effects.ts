import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  EViewSettingsActions,
  GetViewSettings,
  GetViewSettingsSuccess,
  UpdateViewSettings,
  UpdateViewSettingsSuccess,
} from '../actions/view-settings.actions';
import { ViewSettingsService } from '@app/services/view-settings.service';
import { AlertService } from '@app/services/alert.service';
import { ViewSettingGetObject, UpdateViewSettingObject } from '@app/models/view-settings.interface';

@Injectable()
export class ViewSettingsEffects {
  
  GetViewSettings$ = createEffect(() => this._actions$.pipe(
    ofType<GetViewSettings>(EViewSettingsActions.GetViewSettings),
    switchMap(() => this._viewSettingsService.getViewSettings()),
    switchMap((response: ViewSettingGetObject) => {
      return of(new GetViewSettingsSuccess(response));
    }),
  ));

  
  UpdateViewSettings$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateViewSettings>(EViewSettingsActions.UpdateViewSettings),
    switchMap(data => this._viewSettingsService.updateErrorCodeMapping(data.payload)),
    switchMap((response: UpdateViewSettingObject) => {
      this.alertService.responseMessage(response);
      return of(new UpdateViewSettingsSuccess(response));
    }),
  ));

  constructor(
    private _viewSettingsService: ViewSettingsService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
