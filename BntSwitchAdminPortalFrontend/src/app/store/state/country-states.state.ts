import { CountryStateGetObject } from '@app/models/country-states.interface';

export interface ICountryState {
  countryStates: CountryStateGetObject;
  countryStatesStatus: any;
}

export const initialCountryStatesState: ICountryState = {
  countryStates: null,
  countryStatesStatus: null,
};
