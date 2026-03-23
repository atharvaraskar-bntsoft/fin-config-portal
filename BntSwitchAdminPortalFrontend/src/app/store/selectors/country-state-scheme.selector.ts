import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ICountryState } from '../state/country-states.state';

const selectCountryStatesScheme = (state: IAppState) => state.countryStates;

export const selectCountryStatesList = createSelector(
  selectCountryStatesScheme,
  (state: ICountryState) => state.countryStates,
);
export const selectCountryStatesStatus = createSelector(
  selectCountryStatesScheme,
  (state: ICountryState) => state.countryStatesStatus,
);
