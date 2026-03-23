export interface CurrencyList {
  id: number;
  code: string;
  isoCode: string;
  currencyName: string;
  active: boolean;
  currencyMinorUnit: string;
  deleted: string;
}

export interface CurrencyGetData {
  'total-record': number;
  'page-no': number;
  currencyList: CurrencyList[];
  'total-filtered-record': number;
}

export interface CurrencyGetObject {
  status: string;
  message: string;
  data: CurrencyGetData;
}
