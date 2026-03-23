import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EDeviceTypesActions } from '@app/store/actions/device-types.action';
import { GetDeviceTypes, GetDeviceTypesSuccess } from '@app/store/actions/device-types.action';
import { DeviceTypesService } from '@app/services/device-types.service';
import { AlertService } from '@app/services/alert.service';
import { DeviceTypeGetObject } from '@app/models/device-types.interface';

@Injectable()
export class DeviceTypesEffects {
  
  GetDeviceTypes$ = createEffect(() => this._actions$.pipe(
    ofType<GetDeviceTypes>(EDeviceTypesActions.GetDeviceTypes),
    switchMap(payload => this._deviceTypes.getLogs(payload)),
    switchMap((response: DeviceTypeGetObject) => {
      return of(new GetDeviceTypesSuccess(response));
    }),
  ));

  constructor(
    private _deviceTypes: DeviceTypesService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
