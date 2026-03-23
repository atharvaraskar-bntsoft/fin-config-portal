import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';

import {
  EDeviceActions,
  GetDevice,
  GetDeviceDetail,
  GetTreeDeepDevice,
  GetTreeDeepDeviceSuccess,
  GetDeviceDetailSuccess,
  GetDeviceSuccess,
  GetDeviceTypes,
  GetDeviceTypesSuccess,
  GetInstitutionGroupList,
  GetInstitutionGroupListSuccess,
  GetInstitutionList,
  GetInstitutionListSuccess,
  GetLocationList,
  GetLocationListSuccess,
  GetDeviceModelMapping,
  GetDeviceModelMappingSuccess,
} from '../actions/device.action';
import { DeviceService } from '../../services/device.service';
import { DeviceGetObject } from '@app/models/device.interface';

@Injectable()
export class DeviceEffects {
  
  GetDevice$ = createEffect(() => this._actions$.pipe(
    ofType<GetDevice>(EDeviceActions.GetDevice),
    switchMap((payload: any) => this._deviceService.getDevices(payload)),
    switchMap((data: DeviceGetObject) => {
      return of(new GetDeviceSuccess(data));
    }),
  ));

  
  GetTreeDeepDevice$ = createEffect(() => this._actions$.pipe(
    ofType<GetTreeDeepDevice>(EDeviceActions.GetTreeDeepDevice),
    switchMap((payload: any) => this._deviceService.getTreeDeepDevices()),
    switchMap((data: any) => {
      return of(new GetTreeDeepDeviceSuccess(data.data));
    }),
  ));

  
  GetDeviceDetail$ = createEffect(() => this._actions$.pipe(
    ofType<GetDeviceDetail>(EDeviceActions.GetDeviceDetail),
    switchMap(data => this._deviceService.getDeviceDetail(data.payload)),
    switchMap((data: any) => {
      return of(new GetDeviceDetailSuccess(data.data));
    }),
  ));

  
  GetDeviceTypes$ = createEffect(() => this._actions$.pipe(
    ofType<GetDeviceTypes>(EDeviceActions.GetDeviceTypes),
    switchMap(() => this._deviceService.getDeviceTypes()),
    switchMap((data: any) => {
      return of(new GetDeviceTypesSuccess(data.data));
    }),
  ));

  
  GetInstitutionList$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionList>(EDeviceActions.GetInstitutionList),
    switchMap(payload => this._deviceService.getInstitution(payload)),
    switchMap((data: any) => {
      return of(new GetInstitutionListSuccess(data.data));
    }),
  ));

  
  GetInstitutionGroupList$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionGroupList>(EDeviceActions.GetInstitutionGroupList),
    switchMap(() => this._deviceService.getInstitutionGroup()),
    switchMap((data: any) => {
      return of(new GetInstitutionGroupListSuccess(data.data));
    }),
  ));

  
  GetLocationList$ = createEffect(() => this._actions$.pipe(
    ofType<GetLocationList>(EDeviceActions.GetLocationList),
    switchMap(payload => this._deviceService.getLocation(payload)),
    switchMap((data: any) => {
      return of(new GetLocationListSuccess(data.data));
    }),
  ));

  
  DeviceModelMapping$ = createEffect(() => this._actions$.pipe(
    ofType<GetDeviceModelMapping>(EDeviceActions.GetDeviceModelMapping),
    switchMap(data => this._deviceService.getDeviceModelMapping()),
    switchMap((response: any) => {
      return of(new GetDeviceModelMappingSuccess(response.data));
    }),
  ));

  constructor(
    private _deviceService: DeviceService,
    private alertService: AlertService,
    private _actions$: Actions,
  ) {}
}
