export interface IFilterData {
  function: Array<any>;
  location: Array<any>;
  address: Array<any>;
  actionType: any;
  country: any;
  currency: any;
  destination: any;
  device: any;
  entityType: any;
  loginResult: any;
  merchant: Array<any>;
  merchantGroup: Array<any>;
  status: Array<any>;
  service: Array<any>;
  processorList: Array<any>;
  applyLimit: any;
  txnType: any;
  role: any;
  Schedule_Status: any;
  scheme: any;
  user: any;
  zone: any;
}

export interface IFilter {
  data: IFilterData;
  message: String;
  status: String;
}
