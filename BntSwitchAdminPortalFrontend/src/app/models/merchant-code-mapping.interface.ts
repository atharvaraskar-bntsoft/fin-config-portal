export interface ProcessorId {
  id: string;
  name: string;
}

export interface MerchantMappingList {
  id: number;
  processorId: ProcessorId;
  merchantCode: string;
  processorMerchantCode: string;
  active: boolean;
  processorList?: any;
  deleted: string;
}

export interface ProcessorList {
  id: number;
  acqAdapterService: boolean;
  integrationFeatureServices: boolean;
  coreSystemService: boolean;
  name: string;
}

export interface Data {
  merchantMappingList: MerchantMappingList[];
  'total-record': number;
  'page-no': number;
  processorList: ProcessorList[];
  'total-filtered-record': number;
}

export interface MerchantGetObject {
  status: string;
  message: string;
  data: Data;
}
