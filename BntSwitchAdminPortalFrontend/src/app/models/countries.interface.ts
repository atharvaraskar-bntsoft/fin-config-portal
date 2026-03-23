export interface Currency {
  id: number;
  code: string;
  isoCode: string;
  currencyName: string;
  active: boolean;
  currencyMinorUnit: string;
  deleted: string;
}

export interface CountryList {
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

export interface CountriesGetData {
  'total-record': number;
  'page-no': number;
  countryList: CountryList[];
  'total-filtered-record': number;
}

export interface CountriesGetObject {
  status: string;
  message: string;
  data: CountriesGetData;
}
