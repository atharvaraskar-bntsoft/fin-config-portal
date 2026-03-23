import { TransactionLogGetObject } from '@app/models/transaction-log.interface';

export interface ITransactionLogState {
  transactionlogs: TransactionLogGetObject;
  selectedTransactionLog: any;
  json: [];
  selectedJson: any;
  requestMatrix: [];
  selectedRequestMatrix: any;
  responseMatrix: [];
  selectedResponseMatrix: any;
  transactionById: [];
  selectedLogsById: any;
  postTransactionLogreview: any;
  selectedPostTransactionReview: any;
  selectedFilterTxnData: any;
}

export const initialTransactionLogState: ITransactionLogState = {
  json: null,
  postTransactionLogreview: null,
  requestMatrix: null,
  responseMatrix: null,
  selectedFilterTxnData: null,
  selectedJson: null,
  selectedLogsById: null,
  selectedPostTransactionReview: null,
  selectedRequestMatrix: null,
  selectedResponseMatrix: null,
  selectedTransactionLog: null,
  transactionById: null,
  transactionlogs: null,
};
