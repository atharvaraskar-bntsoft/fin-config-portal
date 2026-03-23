import { Action } from '@ngrx/store';
import { LocationGetObject } from '@app/models/location.interface';

export enum ELocationActions {
  GetLocation = '[Location] Get Location',
  GetLocationSuccess = '[Location] Get Location Success',
  GetLocationDetail = '[Location] Get Location Detail',
  GetLocationDetailSuccess = '[Location] Get Location Detail Success',
  ClearState = '[Location] Clear State of Loction',
}
export class GetLocation implements Action {
  public readonly type = ELocationActions.GetLocation;
  constructor(public payload?: any) {}
}
export class GetLocationSuccess implements Action {
  public readonly type = ELocationActions.GetLocationSuccess;
  constructor(public payload: LocationGetObject) {}
}

export class GetLocationDetail implements Action {
  public readonly type = ELocationActions.GetLocationDetail;
  constructor(public payload: any) {}
}
export class GetLocationDetailSuccess implements Action {
  public readonly type = ELocationActions.GetLocationDetailSuccess;
  constructor(public payload: any) {}
}
export class ClearState implements Action {
  public readonly type = ELocationActions.ClearState;
}

export type LocationActions =
  | GetLocation
  | GetLocationSuccess
  | GetLocationDetail
  | GetLocationDetailSuccess
  | ClearState;
