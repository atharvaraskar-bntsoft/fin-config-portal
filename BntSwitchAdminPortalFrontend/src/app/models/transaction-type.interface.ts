export interface PaymentMethod {
  id: number;
  name: string;
}

export interface TxnList {
  id: number;
  code: string;
  paymentMethod: PaymentMethod;
  active: string;
  description: string;
}

export interface Data {
  'total-record': number;
  txnList: TxnList[];
  'page-no': number;
  'total-filtered-record': number;
}

export interface TransactionTypeGetObject {
  status: string;
  message?: any;
  data: Data;
}

export interface UpdatePaymentMethod {
  id: number;
  name: string;
}

export interface UpdateData {
  id: number;
  code: string;
  paymentMethod: UpdatePaymentMethod;
  active: string;
  description: string;
}

export interface UpdateObject {
  status: string;
  message: string;
  data: UpdateData;
}

export interface GetByIdPaymentMethod {
  id: number;
  name: string;
}

export interface GetByIdData {
  id: number;
  code: string;
  paymentMethod: GetByIdPaymentMethod;
  active: string;
  description: string;
}

export interface GetByIdObject {
  status: string;
  message?: any;
  data: GetByIdData;
}
