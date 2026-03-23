import { Action } from '@ngrx/store';

export enum EApprovalsActions {
  GetApprovals = '[Approvals] Get Approvals List',
  GetApprovalsSuccess = '[Approvals] Get Approvals List Success',
  GetApprovalCount = '[Approvals] Get Approvals Count',
  GetApprovalCountSuccess = '[Approvals] Get Approvals Count Success',
  PostApprovals = '[Approvals] Post Approvals',
  PostApprovalsSuccess = '[Approvals] Post Approvals Success',
  ClearState = '[Clear Approvals] Clear State Countries Success',
}
export class GetApprovals implements Action {
  public readonly type = EApprovalsActions.GetApprovals;
  constructor(public payload?: any) {}
}
export class GetApprovalsSuccess implements Action {
  public readonly type = EApprovalsActions.GetApprovalsSuccess;
  constructor(public payload: any) {}
}

export class GetApprovalCount implements Action {
  public readonly type = EApprovalsActions.GetApprovalCount;
  constructor(public payload?: any) {}
}
export class GetApprovalCountSuccess implements Action {
  public readonly type = EApprovalsActions.GetApprovalCountSuccess;
  constructor(public payload: any) {}
}
export class PostApprovals implements Action {
  public readonly type = EApprovalsActions.PostApprovals;
  constructor(public payload: any) {}
}

export class PostApprovalsSuccess implements Action {
  public readonly type = EApprovalsActions.PostApprovalsSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EApprovalsActions.ClearState;
}

export type ApprovalsActions =
  | GetApprovals
  | GetApprovalsSuccess
  | GetApprovalCount
  | GetApprovalCountSuccess
  | PostApprovals
  | PostApprovalsSuccess
  | ClearState;
