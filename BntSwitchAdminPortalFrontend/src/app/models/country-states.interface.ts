export interface Currency {
  id: number;
  code: string;
  isoCode: string;
  currencyName: string;
  active: boolean;
  currencyMinorUnit: string;
  deleted: string;
}

export interface Country {
  id: number;
  code: string;
  countryName: string;
  currency: Currency;
  isoCode: string;
  shortCode: string;
  isdCode: string;
  active: boolean;
  deleted: string;
}

export interface StateList {
  id: number;
  code: string;
  deleted: string;
  stateName: string;
  country: Country;
  active: boolean;
}

export interface CountryStateGetData {
  'total-record': number;
  'page-no': number;
  stateList: StateList[];
  'total-filtered-record': number;
}

export interface CountryStateGetObject {
  status: string;
  message: string;
  data: CountryStateGetData;
}
