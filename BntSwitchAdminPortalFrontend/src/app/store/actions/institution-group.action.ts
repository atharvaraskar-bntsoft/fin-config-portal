import { Action } from '@ngrx/store';
import { InstitutionGroupGetObject } from '@app/models/institution-group.interface';

export enum EInstitutionGroupActions {
  GetInstitutionGroups = '[Groups] Get Institution Groups',
  GetInstitutionGroupList = '[Groups] Get Institution Group List',
  GetInstitutionGroupListSuccess = '[Groups] Get Institution Group List Success',
  GetInstitutionGroupsSuccess = '[Groups] Get Institution Groups Success',
  GetRowDataInstitutionGroups = '[Groups] Row Data Institution Group',
  GetRowDataInstitutionGroupSuccess = '[Groups] Row Data Institution Group Success',
  GetInstitutionGroupDetails = '[Groups] Get Institution Group Details',
  GetInstitutionGroupDetailsSuccess = '[Groups] Get Institution Group Details Success',
  ClearState = '[Clear StateInstitutionGroup] Clear State Institution Groups',
}

export class GetInstitutionGroups implements Action {
  public readonly type = EInstitutionGroupActions.GetInstitutionGroups;

  constructor(public payload?: any) {}
}

export class GetInstitutionGroupList implements Action {
  public readonly type = EInstitutionGroupActions.GetInstitutionGroupList;
}

export class GetInstitutionGroupListSuccess implements Action {
  public readonly type = EInstitutionGroupActions.GetInstitutionGroupListSuccess;

  constructor(public payload: any) {}
}

export class GetInstitutionGroupsSuccess implements Action {
  public readonly type = EInstitutionGroupActions.GetInstitutionGroupsSuccess;

  constructor(public payload: InstitutionGroupGetObject) {}
}

export class GetRowDataInstitutionGroups implements Action {
  public readonly type = EInstitutionGroupActions.GetRowDataInstitutionGroups;

  constructor(public payload: any) {}
}

export class GetRowDataInstitutionGroupSuccess implements Action {
  public readonly type = EInstitutionGroupActions.GetRowDataInstitutionGroupSuccess;

  constructor(public payload: any) {}
}

export class GetInstitutionGroupDetails implements Action {
  public readonly type = EInstitutionGroupActions.GetInstitutionGroupDetails;

  constructor(public payload: any) {}
}

export class GetInstitutionGroupDetailsSuccess implements Action {
  public readonly type = EInstitutionGroupActions.GetInstitutionGroupDetailsSuccess;

  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EInstitutionGroupActions.ClearState;
}

export type InstitutiongoupActions =
  | GetInstitutionGroups
  | GetInstitutionGroupsSuccess
  | GetInstitutionGroupList
  | GetInstitutionGroupListSuccess
  | GetRowDataInstitutionGroups
  | GetRowDataInstitutionGroupSuccess
  | GetInstitutionGroupDetails
  | GetInstitutionGroupDetailsSuccess
  | ClearState;
