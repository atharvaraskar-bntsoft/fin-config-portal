import { Action } from '@ngrx/store';
import { InstitutionAcquirerGetObject } from '@app/models/acquirer.interface';

export enum EAcquirerActions {
  GetAcquirer = '[Acquirer] Get Acquirer',
  GetAcquirerSuccess = '[Acquirer] Get Acquirer Success',
  GetInstitutionAcquirerProcessorList = '[Acquirer] Get Lists',
  GetInstitutionAcquirerProcessorListSuccess = '[Acquirer] Get Lists Success',
  PostAcquirer = '[Acquirer] Post Acquirer',
  PostAcquirerSuccess = '[Acquirer] Post Acquirer Success',
  PutAcquirer = '[Acquirer] Put Institution',
  GetAcquirerRowData = '[Acquirer] Get Acquirer Row Data',
  GetAcquirerRowDataSuccess = '[Acquirer] Get Acquirer Row Data Success',
  ClearState = '[Acquirer] Clear State Acquirer',
}

export class GetAcquirer implements Action {
  public readonly type = EAcquirerActions.GetAcquirer;
  constructor(public payload?: any) {}
}
export class GetAcquirerSuccess implements Action {
  public readonly type = EAcquirerActions.GetAcquirerSuccess;
  constructor(public payload: InstitutionAcquirerGetObject) {}
}
export class GetInstitutionAcquirerProcessorList implements Action {
  public readonly type = EAcquirerActions.GetInstitutionAcquirerProcessorList;
}
export class GetInstitutionAcquirerProcessorListSuccess implements Action {
  public readonly type = EAcquirerActions.GetInstitutionAcquirerProcessorListSuccess;
  constructor(public payload: any) {}
}
export class PostAcquirer implements Action {
  public readonly type = EAcquirerActions.PostAcquirer;

  constructor(public payload: any) {}
}
export class PostAcquirerSuccess implements Action {
  public readonly type = EAcquirerActions.PostAcquirerSuccess;

  constructor(public payload: any) {}
}

export class GetAcquirerRowData implements Action {
  public readonly type = EAcquirerActions.GetAcquirerRowData;

  constructor(public payload: any) {}
}

export class GetAcquirerRowDataSuccess implements Action {
  public readonly type = EAcquirerActions.GetAcquirerRowDataSuccess;

  constructor(public payload: any) {}
}

export class PutAcquirer implements Action {
  public readonly type = EAcquirerActions.PutAcquirer;

  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EAcquirerActions.ClearState;
}

export type AcquirerActions =
  | GetAcquirer
  | GetAcquirerSuccess
  | GetInstitutionAcquirerProcessorList
  | GetInstitutionAcquirerProcessorListSuccess
  | PostAcquirer
  | GetAcquirerRowData
  | PostAcquirerSuccess
  | GetAcquirerRowDataSuccess
  | PutAcquirer
  | ClearState;
