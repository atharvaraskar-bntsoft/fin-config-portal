import { Action } from '@ngrx/store';

import { CountriesGetObject } from '../../models/countries.interface';

export enum ECountriesActions {
  GetCountries = '[Countries] Get Countries',
  GetCountriesSuccess = '[Countries] Get Countries Success',
  GetCountryList = '[Countries] Get Country list',
  GetCountryListSuccess = '[Countries] Get Country List Success',
  GetStateByCountry = '[Countries] Get State by Country',
  GetStateByCountrySuccess = '[Countries] Get State by Country Success',
  ClearState = '[Clear Countries] Clear State Countries Success',
}

export class GetCountries implements Action {
  public readonly type = ECountriesActions.GetCountries;
  constructor(public payload?: any) {}
}

export class GetCountriesSuccess implements Action {
  public readonly type = ECountriesActions.GetCountriesSuccess;
  constructor(public payload: CountriesGetObject) {}
}

export class GetCountryList implements Action {
  public readonly type = ECountriesActions.GetCountryList;
}

export class GetCountryListSuccess implements Action {
  public readonly type = ECountriesActions.GetCountryListSuccess;
  constructor(public payload: any) {}
}

export class GetStateByCountry implements Action {
  public readonly type = ECountriesActions.GetStateByCountry;
  constructor(public payload: any) {}
}

export class GetStateByCountrySuccess implements Action {
  public readonly type = ECountriesActions.GetStateByCountrySuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = ECountriesActions.ClearState;
}

export type CountriesActions =
  | GetCountries
  | GetCountriesSuccess
  | GetCountryList
  | GetCountryListSuccess
  | GetStateByCountry
  | GetStateByCountrySuccess
  | ClearState;
