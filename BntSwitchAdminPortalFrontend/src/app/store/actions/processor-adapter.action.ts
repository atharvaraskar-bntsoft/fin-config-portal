import { Action } from '@ngrx/store';

export enum EProcessorAdapterActions {
  GetProcessorAdapter = '[Processor Adapter] Get ProcessorAdapter',
  GetProcessorAdapterSuccess = '[Processor Adapter] Get ProcessorAdapter Success',
  GetServiceList = '[Processor Adapter] Get Service List',
  GetServiceListSuccess = '[Processor Adapter] Get Service List Success',
  Get13List = '[Processor Adapter] Get 13 List',
  Get13ListSuccess = '[Processor Adapter] Get 13 List Success',
  GetProcessorAdapterDetails = '[Processor Adapter] Get ProcessorAdapter Details',
  GetProcessorAdapterDetailsSuccess = '[Processor Adapter] Get ProcessorAdapter Details Success',
  PutProcessorAdapter = '[Processor Adapter] Put ProcessorAdapter',
  PutProcessorAdapterSuccess = '[Processor Adapter] Put ProcessorAdapter Success',
  PostProcessorAdapter = '[Processor Adapter] Post ProcessorAdapter',
  PostProcessorAdapterSuccess = '[Processor Adapter] Post ProcessorAdapter Success',
  ClearState = '[Clear Processor Adapter] Clear State ProcessorAdapter',
}

export class GetProcessorAdapter implements Action {
  public readonly type = EProcessorAdapterActions.GetProcessorAdapter;
  constructor(public payload: any) {}
}

export class GetProcessorAdapterSuccess implements Action {
  public readonly type = EProcessorAdapterActions.GetProcessorAdapterSuccess;

  constructor(public payload: any) {}
}

export class GetServiceList implements Action {
  public readonly type = EProcessorAdapterActions.GetServiceList;
  constructor(public payload?: any) {}
}

export class GetServiceListSuccess implements Action {
  public readonly type = EProcessorAdapterActions.GetServiceListSuccess;

  constructor(public payload: any) {}
}

export class Get13List implements Action {
  public readonly type = EProcessorAdapterActions.Get13List;
  constructor(public payload?: any) {}
}

export class Get13ListSuccess implements Action {
  public readonly type = EProcessorAdapterActions.Get13ListSuccess;

  constructor(public payload: any) {}
}

export class GetProcessorAdapterDetails implements Action {
  public readonly type = EProcessorAdapterActions.GetProcessorAdapterDetails;

  constructor(public payload?: any) {}
}

export class GetProcessorAdapterDetailsSuccess implements Action {
  public readonly type = EProcessorAdapterActions.GetProcessorAdapterDetailsSuccess;

  constructor(public payload: any) {}
}

export class PutProcessorAdapter implements Action {
  public readonly type = EProcessorAdapterActions.PutProcessorAdapter;

  constructor(public payload?: any) {}
}

export class PutProcessorAdapterSuccess implements Action {
  public readonly type = EProcessorAdapterActions.PutProcessorAdapterSuccess;

  constructor(public payload: any) {}
}

export class PostProcessorAdapter implements Action {
  public readonly type = EProcessorAdapterActions.PostProcessorAdapter;

  constructor(public payload?: any) {}
}

export class PostProcessorAdapterSuccess implements Action {
  public readonly type = EProcessorAdapterActions.PostProcessorAdapterSuccess;

  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EProcessorAdapterActions.ClearState;
}

export type ProcessorAdapterAction =
  | GetProcessorAdapter
  | GetProcessorAdapterSuccess
  | GetProcessorAdapterDetails
  | GetProcessorAdapterDetailsSuccess
  | PutProcessorAdapter
  | PutProcessorAdapterSuccess
  | PostProcessorAdapter
  | PostProcessorAdapterSuccess
  | GetServiceList
  | GetServiceListSuccess
  | Get13List
  | Get13ListSuccess
  | ClearState;
