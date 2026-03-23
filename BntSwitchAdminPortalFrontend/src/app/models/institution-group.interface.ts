export interface InstitutionID {
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

export interface InstitutionDetail {
  id: number;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  country: Country;
  countryState: CountryState;
  phone: string;
  fax: string;
  email: string;
}

export interface InstitutionList {
  id: number;
  institutionID: InstitutionID;
  code: string;
  name: string;
  description: string;
  activateOn: any;
  expiryOn: any;
  status: boolean;
  totalMerchant: number;
  totalLocation: number;
  totalDevice: number;
  merchantInstitutionDcc: boolean;
  institutionDetail: InstitutionDetail;
}

export interface InstitutionGroupGetData {
  'total-record': number;
  institutionList: InstitutionList[];
  'page-no': number;
  'total-filtered-record': number;
}

export interface InstitutionGroupGetObject {
  status: string;
  message: string;
  data: InstitutionGroupGetData;
}
