import { Action } from '@ngrx/store';
import { CountryStateGetObject } from '@app/models/country-states.interface';

export enum ECountryStateActions {
  GetCountryState = '[CountryStates] Get Country State',
  GetCountryStateSuccess = '[CountryStates] Get Country State Success',
  ClearState = '[Clear CountryStates] Clear State  Country State',
}

export class GetCountryState implements Action {
  public readonly type = ECountryStateActions.GetCountryState;

  constructor(public payload?: any) {}
}

export class GetCountryStateSuccess implements Action {
  public readonly type = ECountryStateActions.GetCountryStateSuccess;

  constructor(public payload: CountryStateGetObject) {}
}

export class ClearState implements Action {
  public readonly type = ECountryStateActions.ClearState;
}

export type CountryStatesAction = GetCountryState | GetCountryStateSuccess | ClearState;
