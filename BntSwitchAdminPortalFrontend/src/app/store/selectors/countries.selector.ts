import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ICountriesState } from '../state/countries.state';

const selectCountries = (state: IAppState) => state.countries;
const selectPermissions = (state: IAppState) => state.permissions;

export const selectCountriesList = createSelector(
  selectCountries,
  (state: ICountriesState) => state.countries,
);

export const selectSelectedCountries = createSelector(
  selectCountries,
  (state: ICountriesState) => state.selectedCountries,
);

export const selectCountryListResponse = createSelector(
  selectCountries,
  (state: ICountriesState) => state.countryListResponse,
);

export const selectStateListResponse = createSelector(
  selectCountries,
  (state: ICountriesState) => state.stateListResponse,
);
export const selectCountryResponse = createSelector(
  selectCountries,
  (state: any) => state.countriesResponse,
);

export const selectCountryStatus = createSelector(
  selectCountries,
  (state: any) => state.countriesStatus,
);
