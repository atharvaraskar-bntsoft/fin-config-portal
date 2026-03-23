import { Action } from '@ngrx/store';
import { CurrencyGetObject } from '@app/models/currencies.interface';

export enum ECurrenciesActions {
  GetCurrencies = '[Currencies] Get Currencies',
  GetCurrenciesSuccess = '[Currencies] Get Currencies Success',
  ClearState = '[Clear Currencies] Clear State Currencies',
}

export class GetCurrencies implements Action {
  public readonly type = ECurrenciesActions.GetCurrencies;

  constructor(public payload?: any) {}
}

export class GetCurrenciesSuccess implements Action {
  public readonly type = ECurrenciesActions.GetCurrenciesSuccess;

  constructor(public payload: CurrencyGetObject) {}
}

export class ClearState implements Action {
  public readonly type = ECurrenciesActions.ClearState;
}

export type CurrenciesAction = GetCurrencies | GetCurrenciesSuccess | ClearState;
