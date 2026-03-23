import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IApprovalsState } from '../state/approvals.state';
import { ICountResponse } from '@app/models/approvals.interface';

const selectApprovals = (state: IAppState) => state.approvals;

export const selectApprovalsList = createSelector(
  selectApprovals,
  (state: IApprovalsState) => state.approvals,
);

export const selectApprovalsSuccess = createSelector(
  selectApprovals,
  (state: any) => state.approvalsResponse,
);

export const selectApprovalCount = createSelector(
  selectApprovals,
  (state: IApprovalsState) => state.count,
);
