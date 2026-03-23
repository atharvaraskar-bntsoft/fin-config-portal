export interface OutputList {
  status: string;
  message: string;
  data: List[];
}

export interface List {
  Integer: any;
  String: any;
  Boolean: any;
  Float: any;
  Double: any;
}

export interface FunctionList {
  id: number;
  name: string;
  expression: string;
  outputtype: string;
  active: boolean;
}

export interface ElFunctionGetObject {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  'total-record': number;
  'page-no': number;
  elfunctionList: FunctionList[];
  'total-filtered-record': number;
}

export interface ValidationObject {
  status: string;
  message: any;
  data: any;
}

export interface PostcallObject {
  status: string;
  message: string;
  data: PostCallData;
}
export interface PostCallData {
  active: boolean;
  name: string;
  id?: any;
  expression: string;
  outputtype: any;
}
