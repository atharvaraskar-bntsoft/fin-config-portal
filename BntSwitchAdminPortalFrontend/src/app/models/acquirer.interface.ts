export interface ProcessorId {
  id: string;
  name: string;
}

export interface AcquirerCode {
  id: string;
  code: string;
  description: string;
}

export interface MerchantAcquirerList {
  id: number;
  entityType: string;
  entityId: string;
  processorId: ProcessorId;
  acquirerCode: AcquirerCode;
  deleted?: any;
  active: boolean;
  status: boolean;
  entityName: string;
}

export interface InstitutionAcquirerGetData {
  'total - record': number;
  'page - no': number;
  'total - filtered - record': number;
  merchantAcquirerList: MerchantAcquirerList[];
}

export interface InstitutionAcquirerGetObject {
  status: string;
  message: string;
  data: InstitutionAcquirerGetData;
}
