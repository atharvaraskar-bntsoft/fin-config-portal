import { Action } from '@ngrx/store';
import { StatusGetObject } from '@app/models/status.interface';

export enum EStatusActions {
  GetStatus = '[Status] Get Status List',
  GetStatusSuccess = '[Status] Get Status List Success',
}
export class GetStatus implements Action {
  public readonly type = EStatusActions.GetStatus;
}
export class GetStatusSuccess implements Action {
  public readonly type = EStatusActions.GetStatusSuccess;
  constructor(public payload: StatusGetObject) {}
}

export type StatusActions = GetStatus | GetStatusSuccess;
