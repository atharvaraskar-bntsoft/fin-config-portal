export interface Institution {
  id: string;
  name: string;
}

export interface Category {
  id: number;
  acqAdapterService: boolean;
  integrationFeatureServices: boolean;
  coreSystemService: boolean;
  name: string;
}

export interface Service {
  id: number;
  name: string;
}

export interface Options {
  id?: any;
  partial_auth: boolean;
  velocity: boolean;
  category: Category;
  services: Service[];
  additional_services: any[];
}

export interface Country {
  id: number;
  countryName: string;
}

export interface CountryState {
  id: number;
  stateName: string;
}

export interface MerchantDetail {
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

export interface BankAccount {
  id: number;
  bankName: string;
  branchAddress: string;
  ifscCode: string;
  accountNumber: string;
}

export interface DefaultCurrencyID {
  id: number;
  acqAdapterService: boolean;
  integrationFeatureServices: boolean;
  coreSystemService: boolean;
  name: string;
}

export interface MerchantList {
  id: number;
  institution: Institution;
  code: string;
  name: string;
  description: string;
  activateOn: any;
  expiryOn: any;
  totalLocation: number;
  totalDevice: number;
  status: boolean;
  options: Options;
  acquirerID?: any;
  merchantDetail: MerchantDetail;
  bankAccount: BankAccount;
  markUpFee: number;
  posCountryAFDAmount?: number;
  maxTimeLimitConfig: number;
  hostCapture: boolean;
  defaultCurrencyID: DefaultCurrencyID;
  merchantDcc: string;
  merchantInstitutionCode?: any;
  defaultCurrencyStr?: any;
  ifscCode?: any;
  markUpFeeStr?: any;
  bankName?: any;
  accountNumber?: any;
}

export interface InstitutionGetData {
  'total-record': number;
  'page-no': number;
  merchantList: MerchantList[];
  'total-filtered-record': number;
}

export interface InstitutionGetObject {
  status: string;
  message: string;
  data: InstitutionGetData;
}
