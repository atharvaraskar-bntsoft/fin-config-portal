import { CountriesGetObject } from '../../models/countries.interface';

export interface ICountriesState {
  countries: CountriesGetObject;
  countriesStatus: any;
  selectedCountries: any;
  countriesList: any;
  countryListResponse: any;
  countriesResponse: any;
  stateListResponse: any;
}

export const initialCountriesState: ICountriesState = {
  countries: null,
  countriesList: null,
  countriesResponse: null,
  countriesStatus: null,
  countryListResponse: null,
  selectedCountries: null,
  stateListResponse: null,
};
