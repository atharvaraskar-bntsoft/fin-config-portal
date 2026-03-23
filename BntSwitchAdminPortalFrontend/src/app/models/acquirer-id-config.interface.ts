export interface Country {
  id: number;
  code?: any;
  countryName: string;
  currency?: any;
  isoCode?: any;
  shortCode?: any;
  isdCode?: any;
  active: boolean;
  deleted?: any;
}

export interface AcquirerMappingList {
  id: number;
  code: string;
  description: string;
  active: boolean;
  deleted: string;
  country: Country;
}

export interface AcquirerIdGetData {
  'total-record': number;
  acquirerMappingList: AcquirerMappingList[];
  'page-no': number;
}

export interface AcquirerIdGetObject {
  status: string;
  message: string;
  data: AcquirerIdGetData;
}
