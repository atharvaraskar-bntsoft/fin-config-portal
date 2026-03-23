import { HistoryActions, EHistoryActions } from '../actions/history.action';
import { initialIHistoryState, IHistoryState } from '../state/history.state';

export function HistoryReducers(
  state = initialIHistoryState,
  action: HistoryActions,
): IHistoryState {
  switch (action.type) {
    case EHistoryActions.GetHistorySuccess: {
      return {
        ...state,
        getHistory: action.payload,
      };
    }

    case EHistoryActions.GetByIdHistorySuccess: {
      return {
        ...state,
        getByIdHistory: action.payload,
      };
    }

    case EHistoryActions.ClearState: {
      return {
        ...state,
        getByIdHistory: null,
        getHistory: null,
      };
    }
    default:
      return state;
  }
}
