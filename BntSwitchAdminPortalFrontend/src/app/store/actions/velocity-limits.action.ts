import { Action } from '@ngrx/store';

export enum EVelocityLimitsActions {
  GetVelocityLimits = '[LogsLimits] Get Velocity Limits',
  GetVelocityLimitsSuccess = '[LogsLimits] Get Velocity Limits Success',
  GetVelocityLimitsEditTransaction = '[LogsLimitsEditTransaction] Get Velocity Limits Edit Transaction',
  GetVelocityLimitsEditTransactionSuccess = '[LogsLimitsEditTransaction] Get Velocity Limits Edit Transaction Success',
  GetVelocityLimitsEditInstitution = '[LogsLimitsEditInstitution] Get Velocity Limits Edit Institution',
  GetVelocityLimitsEditInstitutionSuccess = '[LogsLimitsEditInstitution] Get Velocity Limits Edit Institution Success',
  GetVelocityLimitsEditCurrency = '[LogsLimitsEditCurrency] Get Velocity Limits Currency',
  GetVelocityLimitsEditCurrencySuccess = '[LogsLimitsEditCurrency] Get Velocity Limits Currency Success',
  GetVelocityLimitsEditRow = '[LogsLimitsEditRow] Get Velocity Limits Row',
  GetVelocityLimitsEditRowSuccess = '[LogsLimitsEditRow] Get Velocity Limits Row Success',
  DeleteVelocityLimits = '[DeleteLimits] Delete Velocity Limits',
  DeleteVelocityLimitsSuccess = '[DeleteLimits] Delete Velocity Limits Success',
  UpdateVelocityLimits = '[UpdateLimits] Update Velocity Limits',
  UpdateVelocityLimitsSuccess = '[UpdateLimits] Update Velocity Limits Success',
  CreateVelocityLimits = '[CreateLimits] Create Velocity Limits',
  CreateVelocityLimitsSuccess = '[CreateLimits] Create Velocity Limits Success',
  ClearState = '[Limits] Clear States Velocity Limits',
}
export class GetVelocityLimits implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimits;

  constructor(public payload?: any) {}
}
export class GetVelocityLimitsSuccess implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimitsSuccess;
  constructor(public payload: any) {}
}
export class GetVelocityLimitsEditTransaction implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimitsEditTransaction;
}
export class GetVelocityLimitsEditTransactionSuccess implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimitsEditTransactionSuccess;
  constructor(public payload: any) {}
}
export class GetVelocityLimitsEditInstitution implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimitsEditInstitution;
}
export class GetVelocityLimitsEditInstitutionSuccess implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimitsEditInstitutionSuccess;
  constructor(public payload: any) {}
}
export class GetVelocityLimitsEditCurrency implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimitsEditCurrency;
}
export class GetVelocityLimitsEditCurrencySuccess implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimitsEditCurrencySuccess;
  constructor(public payload: any) {}
}
export class GetVelocityLimitsEditRow implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimitsEditRow;
  constructor(public payload: any) {}
}
export class GetVelocityLimitsEditRowSuccess implements Action {
  public readonly type = EVelocityLimitsActions.GetVelocityLimitsEditRowSuccess;
  constructor(public payload: any) {}
}
export class DeleteVelocityLimits implements Action {
  public readonly type = EVelocityLimitsActions.DeleteVelocityLimits;
  constructor(public payload: any) {}
}
export class DeleteVelocityLimitsSuccess implements Action {
  public readonly type = EVelocityLimitsActions.DeleteVelocityLimitsSuccess;
  constructor(public payload: any) {}
}
export class UpdateVelocityLimits implements Action {
  public readonly type = EVelocityLimitsActions.UpdateVelocityLimits;
  constructor(public payload: any) {}
}
export class UpdateVelocityLimitsSuccess implements Action {
  public readonly type = EVelocityLimitsActions.UpdateVelocityLimitsSuccess;
  constructor(public payload: any) {}
}
export class CreateVelocityLimits implements Action {
  public readonly type = EVelocityLimitsActions.CreateVelocityLimits;
  constructor(public payload: any) {}
}
export class CreateVelocityLimitsSuccess implements Action {
  public readonly type = EVelocityLimitsActions.CreateVelocityLimitsSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EVelocityLimitsActions.ClearState;
}

export type VelocityLimitsActions =
  | GetVelocityLimits
  | GetVelocityLimitsSuccess
  | GetVelocityLimitsEditTransaction
  | GetVelocityLimitsEditTransactionSuccess
  | GetVelocityLimitsEditInstitution
  | GetVelocityLimitsEditInstitutionSuccess
  | DeleteVelocityLimits
  | DeleteVelocityLimitsSuccess
  | GetVelocityLimitsEditCurrency
  | GetVelocityLimitsEditCurrencySuccess
  | GetVelocityLimitsEditRow
  | GetVelocityLimitsEditRowSuccess
  | UpdateVelocityLimits
  | UpdateVelocityLimitsSuccess
  | CreateVelocityLimits
  | CreateVelocityLimitsSuccess
  | ClearState;
