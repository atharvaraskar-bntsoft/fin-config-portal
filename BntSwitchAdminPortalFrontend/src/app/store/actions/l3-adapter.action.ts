import { Action } from '@ngrx/store';

export enum EL3AdapterActions {
  GetL3AdapterList = '[L3Adapter] Get L3 Adapter Data List',
  GetL3AdapterListSuccess = '[L3Adapter] Get L3 Adapter Data List Success',
  GetL3Adapter = '[L3Adapter] Get L3 Adapter Data',
  GetL3AdapterSuccess = '[L3Adapter] Get L3 Adapter Data Success',
  GetL3AdapterById = '[L3Adapter] Get L3 Adapter By Id',
  GetL3AdapterByIdSuccess = '[L3Adapter] Get L3 Adapter By Id Success',
  GetL3Network = '[L3Adapter] Get L3 Network',
  GetL3NetworkSuccess = '[L3Adapter] Get L3 Network Success',
  ClearState = '[L3Adapter] Clear state',
  GetPostActionMethod = '[L3Adapter] Get Post Action Method',
  GetPreActionMethod = '[L3Adapter] Get Pre Action Method',
  GetPostActionMethodSuccess = '[L3Adapter] Get Post Action Method Success',
  GetPreActionMethodSuccess = '[L3Adapter] Get Pre Action Method Success',
  GetStepListMethod = '[L3Adapter] Get l3 step list Method',
  GetStepListMethodSuccess = '[L3Adapter] Get l3 step list Method Success',
}

export class GetL3AdapterList implements Action {
  public readonly type = EL3AdapterActions.GetL3AdapterList;
  constructor(public payload?: any) {}
}

export class GetL3AdapterListSuccess implements Action {
  public readonly type = EL3AdapterActions.GetL3AdapterListSuccess;
  constructor(public payload: any) {}
}

export class GetL3Adapter implements Action {
  public readonly type = EL3AdapterActions.GetL3Adapter;
  constructor(public payload: any) {}
}

export class GetL3AdapterSuccess implements Action {
  public readonly type = EL3AdapterActions.GetL3AdapterSuccess;
  constructor(public payload: any) {}
}

export class GetL3AdapterById implements Action {
  public readonly type = EL3AdapterActions.GetL3AdapterById;
  constructor(public payload: any) {}
}

export class GetL3AdapterByIdSuccess implements Action {
  public readonly type = EL3AdapterActions.GetL3AdapterByIdSuccess;

  constructor(public payload: any) {}
}

export class GetL3Network implements Action {
  public readonly type = EL3AdapterActions.GetL3Network;
  constructor(public payload: any) {}
}

export class GetL3NetworkSuccess implements Action {
  public readonly type = EL3AdapterActions.GetL3NetworkSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EL3AdapterActions.ClearState;
}

export class GetPostActionMethod implements Action {
  public readonly type = EL3AdapterActions.GetPostActionMethod;
  constructor(public payload?: any) {}
}

export class GetPreActionMethod implements Action {
  public readonly type = EL3AdapterActions.GetPreActionMethod;
  constructor(public payload?: any) {}
}

export class GetPostActionMethodSuccess implements Action {
  public readonly type = EL3AdapterActions.GetPostActionMethodSuccess;
  constructor(public payload?: any) {}
}

export class GetPreActionMethodSuccess implements Action {
  public readonly type = EL3AdapterActions.GetPreActionMethodSuccess;
  constructor(public payload?: any) {}
}

export class GetStepListMethod implements Action {
  public readonly type = EL3AdapterActions.GetStepListMethod;
  constructor(public payload?: any) {}
}

export class GetStepListMethodSuccess implements Action {
  public readonly type = EL3AdapterActions.GetStepListMethodSuccess;
  constructor(public payload?: any) {}
}

export type L3AdapterActions =
  | GetL3AdapterList
  | GetL3AdapterListSuccess
  | GetL3Adapter
  | GetL3AdapterSuccess
  | GetL3AdapterById
  | GetL3AdapterByIdSuccess
  | GetL3Network
  | GetL3NetworkSuccess
  | GetPostActionMethod
  | GetPreActionMethod
  | GetPostActionMethodSuccess
  | GetPreActionMethodSuccess
  | GetStepListMethod
  | GetStepListMethodSuccess
  | ClearState;
