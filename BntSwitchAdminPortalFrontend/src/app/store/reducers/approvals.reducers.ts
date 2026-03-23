import { initialApprovalsState, IApprovalsState } from '../state/approvals.state';
import { ApprovalsActions, EApprovalsActions } from '../actions/approvals.actions';

export function ApprovalsReducers(
  state = initialApprovalsState,
  action: ApprovalsActions,
): IApprovalsState {
  switch (action.type) {
    case EApprovalsActions.GetApprovalsSuccess: {
      return {
        ...state,
        approvals: action.payload,
      };
    }

    case EApprovalsActions.GetApprovalCountSuccess: {
      return {
        ...state,
        count: action.payload,
      };
    }

    case EApprovalsActions.PostApprovalsSuccess: {
      return {
        ...state,
        approvalsResponse: action.payload,
      };
    }

    case EApprovalsActions.ClearState: {
      return {
        ...state,
        approvals: null,
        approvalsResponse: null,
        count: null,
      };
    }
    default:
      return state;
  }
}
