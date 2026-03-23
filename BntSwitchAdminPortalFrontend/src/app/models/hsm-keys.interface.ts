export interface ResultList {
  id: number;
  keyType: string;
  merchantCode: string;
  merchantInstitutionCode: string;
  keyLable: string;
  startDate: any;
  endDate: any;
  active: string;
  deviceCode: string;
  merchant?: any;
  device?: any;
  counter?: any;
  location?: any;
  merchantInstitution?: any;
  locationCode?: any;
  ksn?: any;
  keyValue: string;
}

export interface HsmKeysGetData {
  'total-record': number;
  'page-no': number;
  resultList: ResultList[];
  'total-filtered-record': number;
}

export interface HsmKeysGetObject {
  status: string;
  message: string;
  data: HsmKeysGetData;
}
