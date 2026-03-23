import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  ELocationActions,
  GetLocation,
  GetLocationSuccess,
  GetLocationDetail,
  GetLocationDetailSuccess,
} from '../actions/location.action';
import { LocationService } from '../../services/location.service';
import { AlertService } from '@app/services/alert.service';
import { LocationGetObject } from '@app/models/location.interface';

@Injectable()
export class LocationEffects {
  
  GetLocation$ = createEffect(() => this._actions$.pipe(
    ofType<GetLocation>(ELocationActions.GetLocation),
    switchMap(payload => this._locationService.getLogs(payload)),
    switchMap((data: LocationGetObject) => {
      return of(new GetLocationSuccess(data));
    }),
  ));

  
  GetLocationDetail$ = createEffect(() => this._actions$.pipe(
    ofType<GetLocationDetail>(ELocationActions.GetLocationDetail),
    switchMap(data => this._locationService.getLocationDetail(data.payload)),
    switchMap((response: any) => {
      return of(new GetLocationDetailSuccess(response.data));
    }),
  ));

  constructor(
    private _locationService: LocationService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
