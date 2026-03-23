import { IApprovals, IApprovalsResponse, ICountResponse } from '@app/models/approvals.interface';

export interface IApprovalsState {
  approvals: IApprovals;
  approvalsResponse: IApprovalsResponse;
  count: ICountResponse;
}

export const initialApprovalsState: IApprovalsState = {
  approvals: null,
  approvalsResponse: null,
  count: null,
};
