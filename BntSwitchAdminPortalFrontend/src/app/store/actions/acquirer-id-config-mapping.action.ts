import { Action } from '@ngrx/store';
import { AcquirerIdGetObject } from '@app/models/acquirer-id-config.interface';

export enum EAcquirerIdConfigActions {
  GetAcquirerIdConfig = '[AcquirerIdConfig] Get Acquirer Id Config',
  GetAcquirerIdConfigSuccess = '[AcquirerIdConfig] Get Acquirer Id Config Success',
  GetAcquirerIdConfigDetails = '[AcquirerIdConfig] Get Acquirer Id Config Details',
  GetAcquirerIdConfigDetailsSuccess = '[AcquirerIdConfig] Get Acquirer Id Config Details Success',
  ClearState = '[AcquirerIdConfig] Clear state',
  GetAcquirerIdFlag = '[AcquirerIdFlag] Get Acquirer Id Flag',
  GetAcquirerIdFlagSuccess = '[AcquirerIdFlagSuccess] Get Acquirer Id Flag Success',
}

export class GetAcquirerIdConfig implements Action {
  public readonly type = EAcquirerIdConfigActions.GetAcquirerIdConfig;
  constructor(public payload?: any) {}
}

export class GetAcquirerIdConfigSuccess implements Action {
  public readonly type = EAcquirerIdConfigActions.GetAcquirerIdConfigSuccess;
  constructor(public payload: AcquirerIdGetObject) {}
}

export class GetAcquirerIdConfigDetails implements Action {
  public readonly type = EAcquirerIdConfigActions.GetAcquirerIdConfigDetails;
  constructor(public payload: any) {}
}

export class GetAcquirerIdConfigDetailsSuccess implements Action {
  public readonly type = EAcquirerIdConfigActions.GetAcquirerIdConfigDetailsSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EAcquirerIdConfigActions.ClearState;
}

export class GetAcquirerIdFlag implements Action {
  public readonly type = EAcquirerIdConfigActions.GetAcquirerIdFlag;
  constructor(public payload?: any) {}
}

export class GetAcquirerIdFlagSuccess implements Action {
  public readonly type = EAcquirerIdConfigActions.GetAcquirerIdFlagSuccess;
  constructor(public payload: any) {}
}

export type AcquirerIdConfigActions =
  | GetAcquirerIdConfig
  | GetAcquirerIdConfigSuccess
  | ClearState
  | GetAcquirerIdConfigDetails
  | GetAcquirerIdConfigDetailsSuccess
  | GetAcquirerIdFlag
  | GetAcquirerIdFlagSuccess;
