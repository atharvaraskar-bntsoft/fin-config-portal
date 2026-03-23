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

export interface AcquirerCode {
  id: number;
  name: string;
}

export interface CutoffMappingList {
  id: number;
  processorId: ProcessorId;
  acquirerCode: AcquirerCode;
  deleted: string;
  cutOff: string;
  timePickerBox?: any;
  active: boolean;
}

export interface Data {
  'total-record': number;
  'page-no': number;
  processorList: ProcessorList[];
  cutoffMappingList: CutoffMappingList[];
  'total-filtered-record': number;
}

export interface CutOffMappingGetObject {
  status: string;
  message: string;
  data: Data;
}
