export interface SchemeImfMapperList {
  id: number;
  fieldId: number;
  messageStandard: any;
  requestImfExpression: any;
  responseImfExpression: any;
  responseImfLeg: any;
  requestImfField: any;
  responseImfField: any;
}

export interface SchemeImfMapperGetData {
  'total-record': number;
  'page-no': number;
  schemeImfMapperList: SchemeImfMapperList[];
  'total-filtered-record': number;
}

export interface SchemeImfMapperGetObject {
  status: string;
  message: string;
  data: SchemeImfMapperGetData;
}
