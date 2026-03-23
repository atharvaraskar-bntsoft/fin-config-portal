export interface Location {
  id: string;
  name: string;
}

export interface Merchant {
  id: string;
  name: string;
}

export interface Institution {
  id: string;
  name: string;
}

export interface Type {
  id: number;
  deleted: string;
  code: string;
  active: boolean;
}

export interface DevicesList {
  id: number;
  location: Location;
  merchant: Merchant;
  institution: Institution;
  code: string;
  type: Type;
  activateOn: any;
  expiryOn: any;
  status: boolean;
  locationCode?: any;
  deviceTypeIdStr?: any;
  merchantCode?: any;
  active: boolean;
}

export interface DeviceGetData {
  'total-record': number;
  'page-no': number;
  devicesList: DevicesList[];
  'total-filtered-record': number;
}

export interface DeviceGetObject {
  status: string;
  message: string;
  data: DeviceGetData;
}
