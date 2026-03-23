import { ETransactionLogActions, TransactionlogActions } from './../actions/transaction-log.action';
import { initialTransactionLogState, ITransactionLogState } from '../state/transaction-log.state';

export function TransactionLogReducers(
  state = initialTransactionLogState,
  action: TransactionlogActions,
): ITransactionLogState {
  switch (action.type) {
    case ETransactionLogActions.GetTransactionLogsSuccess: {
      return {
        ...state,
        transactionlogs: action.payload,
      };
    }
    case ETransactionLogActions.GetJsonSuccess: {
      return {
        ...state,
        json: action.payload,
      };
    }
    case ETransactionLogActions.GetRequestMatrixSuccess: {
      return {
        ...state,
        requestMatrix: action.payload,
      };
    }
    case ETransactionLogActions.GetResponseMatrixSuccess: {
      return {
        ...state,
        responseMatrix: action.payload,
      };
    }
    case ETransactionLogActions.GetTransactionByIdSuccess: {
      return {
        ...state,
        transactionById: action.payload,
      };
    }
    case ETransactionLogActions.PostTransactionLogReviewSuccess: {
      return {
        ...state,
        postTransactionLogreview: action.payload,
      };
    }
    case ETransactionLogActions.GetFilterTransactionLogs: {
      return {
        ...state,
        selectedFilterTxnData: action.payload,
      };
    }
    case ETransactionLogActions.ClearState: {
      return {
        ...state,
        postTransactionLogreview: null,
        transactionById: null,
      };
    }
    default:
      return state;
  }
}
