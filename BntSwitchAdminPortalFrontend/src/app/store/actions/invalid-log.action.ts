import { Action } from '@ngrx/store';

/*
  This Action will  work for the below screens:
  1. SAF Screen
  2. Exceptional Screen and
  3. Invalid Logs
*/

export enum EInvalidLogActions {
  GetInvalidLogs = '[LogsInvalid] Get Audit Logs',
  GetInvalidLogsSuccess = '[LogsInvalid] Get Audit Logs Success',
  GetSAFQueue = '[SAFQueue] Get SAF Queue Table Data',
  GetSAFQueueSuccess = '[SAFQueue] Get SAF Queue Table Data Success',
  GetException = '[ExceptionalQueue] Get Exception Queue List',
  GetExceptionSuccess = '[ExceptionalQueue] Get Exception Queue List Success',
  MoveToSAFQueue = '[ExceptionalQueue] Move TO SAF Queue',
  MoveToSAFQueueSuccess = '[ExceptionalQueue] Move TO SAF Queue Success',
  DeleteSAFQueue = '[ExceptionalQueue] Delete SAF Queue',
  DeleteSAFQueueSuccess = '[ExceptionalQueue] Delete SAF Queue Success',
  GetSAFQueueDDL = '[SAFQueue] Get Status List DropDown',
  GetSAFQueueDDLSuccess = '[SAFQueue] Get Status List DropDown Success',
  DeleteMultipleSuccess = '[SAFQueue] Delete Multiple SAF Queue Success',
  DeleteMultiple = '[SAFQueue] Delete Multiple SAF Queue',
  ClearState = '[LogsInvalid] Clear State',
  GetSAFProcessorList = '[SAFProcessor] Get processor List DropDown',
  GetSAFProcessorListSuccess = '[SAFProcessor] Get processor List DropDown Success',
}
export class GetInvalidLogs implements Action {
  public readonly type = EInvalidLogActions.GetInvalidLogs;
  constructor(public payload?: any) {}
}
export class GetInvalidLogsSuccess implements Action {
  public readonly type = EInvalidLogActions.GetInvalidLogsSuccess;
  constructor(public payload: any) {}
}

export class GetSAFQueue implements Action {
  public readonly type = EInvalidLogActions.GetSAFQueue;
  constructor(public payload?: any) {}
}

export class GetSAFQueueSuccess implements Action {
  public readonly type = EInvalidLogActions.GetSAFQueueSuccess;
  constructor(public payload?: any) {}
}

export class MoveToSAFQueue implements Action {
  public readonly type = EInvalidLogActions.MoveToSAFQueue;
  constructor(public payload?: any) {}
}

export class MoveToSAFQueueSuccess implements Action {
  public readonly type = EInvalidLogActions.MoveToSAFQueueSuccess;
  constructor(public payload?: any) {}
}

export class DeleteMultiple implements Action {
  public readonly type = EInvalidLogActions.DeleteMultiple;
  constructor(public payload: any) {}
}

export class DeleteMultipleSuccess implements Action {
  public readonly type = EInvalidLogActions.DeleteMultipleSuccess;
  constructor(public payload: any) {}
}

export class DeleteSAFQueue implements Action {
  public readonly type = EInvalidLogActions.DeleteSAFQueue;
  constructor(public payload?: any) {}
}

export class DeleteSAFQueueSuccess implements Action {
  public readonly type = EInvalidLogActions.DeleteSAFQueueSuccess;
  constructor(public payload?: any) {}
}

export class GetException implements Action {
  public readonly type = EInvalidLogActions.GetException;
  constructor(public payload?: any) {}
}

export class GetExceptionSuccess implements Action {
  public readonly type = EInvalidLogActions.GetExceptionSuccess;
  constructor(public payload?: any) {}
}

export class GetSAFQueueDDL implements Action {
  public readonly type = EInvalidLogActions.GetSAFQueueDDL;
  constructor() {}
}

export class GetSAFQueueDDLSuccess implements Action {
  public readonly type = EInvalidLogActions.GetSAFQueueDDLSuccess;
  constructor(public payload?: any) {}
}

export class GetSAFProcessorList implements Action {
  public readonly type = EInvalidLogActions.GetSAFProcessorList;
  constructor() {}
}

export class GetSAFProcessorListSuccess implements Action {
  public readonly type = EInvalidLogActions.GetSAFProcessorListSuccess;
  constructor(public payload?: any) {}
}

export class ClearState implements Action {
  public readonly type = EInvalidLogActions.ClearState;
  constructor(public payload?: any) {}
}

export type InvalidlogActions =
  | GetInvalidLogs
  | GetInvalidLogsSuccess
  | GetSAFQueueSuccess
  | MoveToSAFQueueSuccess
  | MoveToSAFQueue
  | GetExceptionSuccess
  | GetException
  | GetSAFQueueDDL
  | GetSAFQueueDDLSuccess
  | DeleteSAFQueueSuccess
  | DeleteSAFQueue
  | DeleteMultipleSuccess
  | DeleteMultiple
  | ClearState
  | GetSAFQueue
  | GetSAFProcessorList
  | GetSAFProcessorListSuccess;
