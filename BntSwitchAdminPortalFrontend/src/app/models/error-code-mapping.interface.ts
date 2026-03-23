export interface ProcessorId {
  id: string;
  name: string;
}

export interface ErrorMappingList {
  id: number;
  processorId: ProcessorId;
  errorCode: string;
  errorType: string;
  processorErrorCode: string;
  active: boolean;
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
  'total-record': number;
  errorMappingList: ErrorMappingList[];
  'page-no': number;
  processorList: ProcessorList[];
  'total-filtered-record': number;
}

export interface ErrorCodeGetObject {
  status: string;
  message: string;
  data: Data;
}
