import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ICurrencies } from '../state/currencies.state';

const selectCurrencies = (state: IAppState) => state.currencies;

export const selectCurrenciesList = createSelector(
  selectCurrencies,
  (state: ICurrencies) => state.currencies,
);
