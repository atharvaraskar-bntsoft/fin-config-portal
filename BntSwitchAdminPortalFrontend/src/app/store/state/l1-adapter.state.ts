import { L1AdapterGetObject } from '@app/models/l1-adapter.interface';

export interface IL1AdapterState {
  l1Adapter: L1AdapterGetObject;
  l1AdapterGetById: any;
  l1AdapterPostResponse: any;
  l1AdapterDeleteResponse: any;
  l1AdapterEntityMappingList: any;
  l1AdapterEntityIMFList: any;
  templateList: any;
  formatList: any;
  l1AdapterData: any;
  schemaList: any;
  l1AdapterTransactionType: any;
  l1AdapterRuleList: any;
  networkList: any;
  schemaDraft: any;
  adapterById: any;
  menu: any;
  SchemeImfMapper: any;
  AdapterDataMap: any;
  internalCode: any;
  versionData: any;
  download: any;
  downloadByID: any;
  upload: any;
  DeleteRow: any;
  lookuplist: any;
  MessageContextList: any;
  getNameValidation: any;
  getPaymentlist: any;
  postAction: any;
  preAction: any;
  stepList: any;
  saveDraft: any;
}

export const initialIL1AdapterState: IL1AdapterState = {
  adapterById: null,
  formatList: null,
  internalCode: null,
  l1Adapter: null,
  l1AdapterData: null,
  l1AdapterDeleteResponse: null,
  l1AdapterEntityIMFList: null,
  l1AdapterEntityMappingList: null,
  l1AdapterGetById: null,
  l1AdapterPostResponse: null,
  l1AdapterRuleList: null,
  l1AdapterTransactionType: null,
  menu: null,
  networkList: null,
  schemaDraft: null,
  schemaList: null,
  templateList: null,
  SchemeImfMapper: null,
  AdapterDataMap: null,
  versionData: null,
  download: null,
  downloadByID: null,
  upload: null,
  DeleteRow: null,
  lookuplist: null,
  MessageContextList: null,
  getNameValidation: null,
  getPaymentlist: null,
  postAction: null,
  preAction: null,
  stepList: null,
  saveDraft: null
};
