export interface DeviceTypeList {
  id: number;
  code: string;
  countryName?: any;
  currency?: any;
  isoCode?: any;
  shortCode?: any;
  isdCode?: any;
  active: boolean;
  deleted: string;
}

export interface DeviceTypeGetData {
  'total-record': number;
  'page-no': number;
  'total-filtered-record': number;
  deviceTypeList: DeviceTypeList[];
}

export interface DeviceTypeGetObject {
  status: string;
  message: string;
  data: DeviceTypeGetData;
}
