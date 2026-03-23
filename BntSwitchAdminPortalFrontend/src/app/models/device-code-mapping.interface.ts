export interface ProcessorList {
  id: number;
  acqAdapterService: boolean;
  integrationFeatureServices: boolean;
  coreSystemService: boolean;
  name: string;
}

export interface ProcessorId {
  id: string;
  name: string;
}

export interface DeviceMappingList {
  id: number;
  processorId: ProcessorId;
  deviceCode: string;
  processorDeviceCode: string;
  active: boolean;
  deleted: string;
}

export interface DeviceMappingGetData {
  'total-record': number;
  'page-no': number;
  processorList: ProcessorList[];
  'total-filtered-record': number;
  deviceMappingList: DeviceMappingList[];
}

export interface DeviceMappingGetObject {
  status: string;
  message: string;
  data: DeviceMappingGetData;
}

export interface Datum {
  id: number;
  acqAdapterService: boolean;
  integrationFeatureServices: boolean;
  coreSystemService: boolean;
  name: string;
}

export interface ProcessorListObject {
  status: string;
  message?: any;
  data: Datum[];
}

export interface DeviceListDatum {
  id: number;
  location?: any;
  merchant?: any;
  institution?: any;
  code: string;
  type?: any;
  activateOn?: any;
  expiryOn?: any;
  status: boolean;
  locationCode?: any;
  deviceTypeIdStr?: any;
  merchantCode?: any;
  active: boolean;
}

export interface DeviceListObject {
  status: string;
  message: string;
  data: DeviceListDatum[];
}

export interface PostCallDatum {
  active: boolean;
  deviceCode: string;
  id?: any;
  processorDeviceCode: string;
  processorId: ProcessorId;
  processorName?: any;
}

export interface PostcallObject {
  status: string;
  message: string;
  data: PostCallDatum;
}

export interface ProcessorId {
  id: string;
  name: string;
}
