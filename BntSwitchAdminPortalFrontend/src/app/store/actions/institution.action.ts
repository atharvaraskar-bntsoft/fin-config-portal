import { InstitutionGetObject } from './../../models/institution.interface';
import { Action } from '@ngrx/store';

export enum EInstitutionActions {
  GetCategoryCode = '[Institution] Get Category Code',
  GetCategoryCodeSuccess = '[Institution] Get Category Code Success',
  GetCurrency = '[Institution] Get Currency',
  GetCurrencySuccess = '[Institution] Get Currency Success',
  GetInstitution = '[Institution] Get Institution',
  GetInstitutionSuccess = '[Institution] Get Institution Success',
  GetInstitutionDetail = '[Institution] Get Institution Detail',
  GetInstitutionDetailSuccess = '[Institution] Get Institution Detail Success',
  GetInstitutionAdditionalService = '[Institution] Get Institution Additional Service',
  GetInstitutionAdditionalServiceSuccess = '[Institution] Get Institution Service Additional Success',
  GetInstitutionService = '[Institution] Get Institution Service',
  GetInstitutionServiceSuccess = '[Institution] Get Institution Service Success',
  GetCountriesList = '[Institution] Get Countries List',
  GetInstitutionList = '[Institution] Get Institution List',

  GetInstitutionGroupList = '[Institution] Get Institution Group List',
  GetInstitutionGroupListSuccess = '[Institution] Get Institution group List Success',
  GetInstitutionRowData = '[Institution] Get Institution Row Data',
  GetInstitutionRowDataSuccess = '[Institution] Get InstitutionRow Data Success',
  GetCountryList = '[Institution] Get Country list',
  GetCountryListSuccess = '[Institution] Get Country List Success',
  GetStateList = '[Institution] Get State by Country',
  GetStateListSuccess = '[Institution] Get State by Country Success',
  ClearState = '[Institution] Clear state',
}

export class GetCurrency implements Action {
  public readonly type = EInstitutionActions.GetCurrency;
}

export class GetCurrencySuccess implements Action {
  public readonly type = EInstitutionActions.GetCurrencySuccess;

  constructor(public payload: any) {}
}

export class GetCategoryCode implements Action {
  public readonly type = EInstitutionActions.GetCategoryCode;
}

export class GetCategoryCodeSuccess implements Action {
  public readonly type = EInstitutionActions.GetCategoryCodeSuccess;

  constructor(public payload: any) {}
}

export class GetInstitution implements Action {
  public readonly type = EInstitutionActions.GetInstitution;

  constructor(public payload?: any) {}
}

export class GetInstitutionSuccess implements Action {
  public readonly type = EInstitutionActions.GetInstitutionSuccess;

  constructor(public payload: InstitutionGetObject) {}
}

export class GetInstitutionDetail implements Action {
  public readonly type = EInstitutionActions.GetInstitutionDetail;

  constructor(public payload: any) {}
}

export class GetInstitutionDetailSuccess implements Action {
  public readonly type = EInstitutionActions.GetInstitutionDetailSuccess;

  constructor(public payload: any) {}
}

export class GetCountriesList implements Action {
  public readonly type = EInstitutionActions.GetCountriesList;
}

export class GetInstitutionGroupList implements Action {
  public readonly type = EInstitutionActions.GetInstitutionGroupList;
}

export class GetInstitutionGroupListSuccess implements Action {
  public readonly type = EInstitutionActions.GetInstitutionGroupListSuccess;

  constructor(public payload: any) {}
}

export class GetInstitutionListSuccess implements Action {
  public readonly type = EInstitutionActions.GetInstitutionSuccess;
  constructor(public payload: any) {}
}

export class GetInstitutionService implements Action {
  public readonly type = EInstitutionActions.GetInstitutionService;
}

export class GetInstitutionServiceSuccess implements Action {
  public readonly type = EInstitutionActions.GetInstitutionServiceSuccess;

  constructor(public payload: any) {}
}

export class GetInstitutionAdditionalService implements Action {
  public readonly type = EInstitutionActions.GetInstitutionAdditionalService;
}

export class GetInstitutionAdditionalServiceSuccess implements Action {
  public readonly type = EInstitutionActions.GetInstitutionAdditionalServiceSuccess;

  constructor(public payload: any) {}
}

export class GetInstitutionRowData implements Action {
  public readonly type = EInstitutionActions.GetInstitutionRowData;

  constructor(public payload: any) {}
}

export class GetInstitutionRowDataSuccess implements Action {
  public readonly type = EInstitutionActions.GetInstitutionRowDataSuccess;

  constructor(public payload: any) {}
}

export class GetCountryList implements Action {
  public readonly type = EInstitutionActions.GetCountryList;
}

export class GetCountryListSuccess implements Action {
  public readonly type = EInstitutionActions.GetCountryListSuccess;

  constructor(public payload: any) {}
}

export class GetStateList implements Action {
  public readonly type = EInstitutionActions.GetStateList;

  constructor(public payload: any) {}
}

export class GetStateListSuccess implements Action {
  public readonly type = EInstitutionActions.GetStateListSuccess;

  constructor(public payload: any) {}
}

export class GetInstitutionList implements Action {
  public readonly type = EInstitutionActions.GetInstitutionList;
}

export class ClearState implements Action {
  public readonly type = EInstitutionActions.ClearState;
}

export type InstitutionAction =
  | GetCategoryCode
  | GetCategoryCodeSuccess
  | GetCurrency
  | GetCurrencySuccess
  | GetInstitution
  | GetInstitutionSuccess
  | GetInstitutionDetail
  | GetInstitutionDetailSuccess
  | GetCountriesList
  | GetInstitutionList
  | GetInstitutionGroupList
  | GetInstitutionGroupListSuccess
  | GetInstitutionService
  | GetInstitutionServiceSuccess
  | GetInstitutionRowData
  | GetInstitutionRowDataSuccess
  | GetInstitutionAdditionalService
  | GetInstitutionAdditionalServiceSuccess
  | GetCountryList
  | GetCountryListSuccess
  | GetStateList
  | GetStateListSuccess
  | GetInstitutionList
  | ClearState;
