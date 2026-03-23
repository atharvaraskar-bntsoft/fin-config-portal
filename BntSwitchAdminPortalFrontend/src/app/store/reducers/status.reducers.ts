import { initialStatusState, IStatusState } from '../state/status.state';
import { StatusActions, EStatusActions } from '../actions/status.action';

export function StatusReducers(state = initialStatusState, action: StatusActions): IStatusState {
  switch (action.type) {
    case EStatusActions.GetStatusSuccess: {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
}
