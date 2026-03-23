import { Action } from '@ngrx/store';

export enum EHistoryActions {
  GetHistory = '[History] Get History',
  GetHistorySuccess = '[History] Get History Success',
  GetByIdHistory = '[History] GetById History',
  GetByIdHistorySuccess = '[History] GetById History Success',
  ClearState = '[History] Clear state',
}
export class GetHistory implements Action {
  public readonly type = EHistoryActions.GetHistory;
  constructor(public payload?: any) {}
}

export class GetHistorySuccess implements Action {
  public readonly type = EHistoryActions.GetHistorySuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EHistoryActions.ClearState;
}

export class GetByIdHistory implements Action {
  public readonly type = EHistoryActions.GetByIdHistory;
  constructor(public payload: any) {}
}
export class GetByIdHistorySuccess implements Action {
  public readonly type = EHistoryActions.GetByIdHistorySuccess;
  constructor(public payload: any) {}
}

export type HistoryActions =
  | GetHistory
  | GetHistorySuccess
  | GetByIdHistory
  | GetByIdHistorySuccess
  | ClearState;
