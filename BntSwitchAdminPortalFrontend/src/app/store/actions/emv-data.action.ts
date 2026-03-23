import { Action } from '@ngrx/store';

export enum EEMVDataActions {
  GetEMVTable = '[EMVAction] Get EMV Table',
  GetEMVTableSuccess = '[EMVAction] Get EMV Table Success',
  CreateEMVData = '[EMVAction] Create EMV Data',
  CreateEMVDataSuccess = '[EMVAction] Create EMV Data Success',
  UpdateCurrentEMV = '[EMVAction] Get Current EMV',
  UpdateCurrentEMVSuccess = '[EMVAction] Get Current EMV Success',
  CheckUniqueName = '[EMVAction] Check Unique Name',
  CheckUniqueNameSuccess = '[EMVAction] Check Unique Name Success',
  ClearState = '[ELFunction] Clear state',
}
export class GetEMVData implements Action {
  public readonly type = EEMVDataActions.GetEMVTable;
  constructor(public payload?: any) {}
}

export class GetEMVDataSuccess implements Action {
  public readonly type = EEMVDataActions.GetEMVTableSuccess;
  constructor(public payload: any) {}
}

export class CreateEMVData implements Action {
  public readonly type = EEMVDataActions.CreateEMVData;
  constructor(public payload?: any) {}
}

export class CreateEMVDataSuccess implements Action {
  public readonly type = EEMVDataActions.CreateEMVDataSuccess;
  constructor(public payload: any) {}
}

export class UpdateCurrentEMV implements Action {
  public readonly type = EEMVDataActions.UpdateCurrentEMV;
  constructor(public payload: any) {}
}

export class UpdateCurrentEMVSuccess implements Action {
  public readonly type = EEMVDataActions.UpdateCurrentEMVSuccess;
  constructor(public payload: any) {}
}

export class CheckUniqueName implements Action {
  public readonly type = EEMVDataActions.CheckUniqueName;
  constructor(public payload: any) {}
}

export class CheckUniqueNameSuccess implements Action {
  public readonly type = EEMVDataActions.CheckUniqueNameSuccess;
  constructor(public payload: any) {}
}

export type EMVDataActions =
  | GetEMVData
  | GetEMVDataSuccess
  | CreateEMVData
  | CreateEMVDataSuccess
  | UpdateCurrentEMV
  | UpdateCurrentEMVSuccess
  | CheckUniqueNameSuccess
  | CheckUniqueName;
