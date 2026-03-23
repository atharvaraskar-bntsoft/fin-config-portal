export interface Merchant {
  id: string;
  name: string;
}

export interface Institution {
  id: string;
  name: string;
}

export interface Country {
  id: number;
  countryName: string;
}

export interface CountryState {
  id: number;
  stateName: string;
}

export interface LocationDetail {
  email: string;
  phone: string;
  fax: string;
  address1: string;
  address2: string;
  city: string;
  country: Country;
  countryState: CountryState;
  zip: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationList {
  id: number;
  totalDevice: number;
  code: string;
  name: string;
  merchant: Merchant;
  institution: Institution;
  description: string;
  activateOn: any;
  expiryOn: any;
  status: boolean;
  locationDetail: LocationDetail;
  coordinates: Coordinates;
  merchantCode?: any;
}

export interface LocationGetData {
  'total-record': number;
  locationList: LocationList[];
  'page-no': number;
  'total-filtered-record': number;
}

export interface LocationGetObject {
  status: string;
  message: string;
  data: LocationGetData;
}
