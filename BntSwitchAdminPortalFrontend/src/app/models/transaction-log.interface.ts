export interface Param {
  key: string;
  value: string;
  text: string;
  path?: any;
  type?: any;
}

export interface Info {
  name: string;
  params: Param[];
}

export interface Status {
  type: number;
  text: string;
  label: string;
}

export interface LogsList {
  id: string;
  txnType: string;
  paymentMethod: string;
  merchantName: string;
  deviceCode: string;
  locationCode: string;
  responseCode: string;
  merchantCode: string;
  date: any;
  client?: any;
  approved_currency: string;
  guid?: any;
  adapterId?: any;
  destinations: string;
  info: Info;
  status: Status;
  forReview: boolean;
  transactionName: string;
  requestType?: any;
  actionType?: any;
  requested_amount: string;
  requested_currency: string;
  approved_amount: string;
  additional_params: any[];
  errors: any[];
  operations: any[];
}

export interface TransactionLogGetData {
  'total-record': number;
  logsList: LogsList[];
  'page-no': number;
  'total-filtered-record': number;
}

export interface TransactionLogGetObject {
  status: string;
  message: string;
  data: TransactionLogGetData;
}
