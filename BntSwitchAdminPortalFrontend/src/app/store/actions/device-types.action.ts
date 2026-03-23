import { DeviceTypeGetObject } from './../../models/device-types.interface';
import { Action } from '@ngrx/store';

export enum EDeviceTypesActions {
  GetDeviceTypes = '[DeviceTypes] Get Device Types',
  GetDeviceTypesSuccess = '[DeviceTypes] Get Device Types Success',
  ClearState = '[DeviceTypes] Clear State Device Types',
}

export class GetDeviceTypes implements Action {
  public readonly type = EDeviceTypesActions.GetDeviceTypes;

  constructor(public payload?: any) {}
}

export class GetDeviceTypesSuccess implements Action {
  public readonly type = EDeviceTypesActions.GetDeviceTypesSuccess;
  constructor(public payload: DeviceTypeGetObject) {}
}

export class ClearState implements Action {
  public readonly type = EDeviceTypesActions.ClearState;
}

export type DeviceTypesActions = GetDeviceTypes | GetDeviceTypesSuccess | ClearState;
