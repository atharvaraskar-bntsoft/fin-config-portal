import { Action } from '@ngrx/store';
import { TransactionLogGetObject } from '@app/models/transaction-log.interface';

export enum ETransactionLogActions {
  GetTransactionLogs = '[LogsTransaction] Get Transaction Logs',
  GetTransactionLogsSuccess = '[LogsTransaction] Get Transaction Logs Success',
  GetFilterTransactionLogs = '[LogsTransaction] Get Filter Transaction Logs',
  GetJson = '[GetTxnJson] Get Transaction Logs Json',
  GetJsonSuccess = '[GetTxnJsonSuccess] Get Transaction Logs Json Success',
  GetRequestMatrix = '[GetRequest] Get Request Matrix',
  GetRequestMatrixSuccess = '[GetRequestSuccess] Get Request Matrix Success',
  GetResponseMatrix = '[GetResponse] Get Response Matrix',
  GetResponseMatrixSuccess = '[GetResponseSuccess] Get Response Matrix Success',
  GetTransactionById = '[GetTransactionLogsById] Get Transaction Logs by Id',
  GetTransactionByIdSuccess = '[GetTransactionLogsByIdSuccess] Get Transaction Logs by Id Success',
  PostTransactionLogReview = '[PostForReview] Post Transaction Log For Review',
  PostTransactionLogReviewSuccess = '[PostForReviewSuccess] Post Transaction Log For Review',
  ClearState = '[ClearState] Clear State Transaction Log',
}
export class GetTransactionLogs implements Action {
  public readonly type = ETransactionLogActions.GetTransactionLogs;
  constructor(public payload: any) {}
}
export class GetTransactionLogsSuccess implements Action {
  public readonly type = ETransactionLogActions.GetTransactionLogsSuccess;
  constructor(public payload: TransactionLogGetObject) {}
}

export class GetFilterTransactionLogs implements Action {
  public readonly type = ETransactionLogActions.GetFilterTransactionLogs;
  constructor(public payload?: any) {}
}

export class GetJson implements Action {
  public readonly type = ETransactionLogActions.GetJson;
  constructor(public payload: any) {}
}
export class GetJsonSuccess implements Action {
  public readonly type = ETransactionLogActions.GetJsonSuccess;
  constructor(public payload: any) {}
}

export class GetRequestMatrix implements Action {
  public readonly type = ETransactionLogActions.GetRequestMatrix;
  constructor(public payload: any) {}
}
export class GetRequestMatrixSuccess implements Action {
  public readonly type = ETransactionLogActions.GetRequestMatrixSuccess;
  constructor(public payload: any) {}
}

export class GetResponseMatrix implements Action {
  public readonly type = ETransactionLogActions.GetResponseMatrix;
  constructor(public payload: any) {}
}
export class GetResponseMatrixSuccess implements Action {
  public readonly type = ETransactionLogActions.GetResponseMatrixSuccess;
  constructor(public payload: any) {}
}
export class GetTransactionById implements Action {
  public readonly type = ETransactionLogActions.GetTransactionById;
  constructor(public payload: any) {}
}
export class GetTransactionByIdSuccess implements Action {
  public readonly type = ETransactionLogActions.GetTransactionByIdSuccess;
  constructor(public payload: any) {}
}
export class PostTransactionLogReview implements Action {
  public readonly type = ETransactionLogActions.PostTransactionLogReview;
  constructor(public payload: any) {}
}
export class PostTransactionLogReviewSuccess implements Action {
  public readonly type = ETransactionLogActions.PostTransactionLogReviewSuccess;
  constructor(public payload: any) {}
}
export class ClearState implements Action {
  public readonly type = ETransactionLogActions.ClearState;
}
export type TransactionlogActions =
  | GetTransactionLogs
  | GetFilterTransactionLogs
  | GetTransactionLogsSuccess
  | GetJson
  | GetJsonSuccess
  | GetRequestMatrix
  | GetRequestMatrixSuccess
  | GetResponseMatrix
  | GetResponseMatrixSuccess
  | GetTransactionById
  | GetTransactionByIdSuccess
  | PostTransactionLogReview
  | PostTransactionLogReviewSuccess
  | ClearState;
