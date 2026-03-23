import {
  TransactionTypeActions,
  ETransactionTypeActions,
} from '../actions/transaction-type.action';
import {
  initialITransactionTypeState,
  ITransactionTypeState,
} from '../state/transaction-type.state';

export function TransactionTypeReducers(
  state = initialITransactionTypeState,
  action: TransactionTypeActions,
): ITransactionTypeState {
  switch (action.type) {
    case ETransactionTypeActions.GetTransactionTypeSuccess: {
      return {
        ...state,
        transactionType: action.payload,
      };
    }
    case ETransactionTypeActions.GetByIdTransactionTypeSuccess: {
      return {
        ...state,
        getByIdTransactionType: action.payload,
      };
    }

    case ETransactionTypeActions.PostTransactionTypeSuccess: {
      return {
        ...state,
        postTransactionType: action.payload,
      };
    }
    case ETransactionTypeActions.UpdateTransactionTypeSuccess: {
      return {
        ...state,
        postTransactionType: action.payload,
      };
    }
    case ETransactionTypeActions.ClearState: {
      return {
        ...state,
        getByIdTransactionType: null,
        postTransactionType: null,
        transactionType: null,
      };
    }
    default:
      return state;
  }
}
