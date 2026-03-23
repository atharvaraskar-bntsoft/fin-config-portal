import { DekActions, EDekActions } from '../actions/dek.action';
import { IDekState, initialDekState } from '../state/dek.state';

export function DekReducers(state = initialDekState, action: DekActions): IDekState {
  switch (action.type) {
    case EDekActions.GetDekSuccess: {
      return {
        ...state,
        getDek: action.payload,
      };
    }

    case EDekActions.PostDekSuccess: {
      return {
        ...state,
        postDek: action.payload,
      };
    }

    case EDekActions.ClearState: {
      return {
        ...state,
        getDek: null,
        postDek: null,
      };
    }
    default:
      return state;
  }
}
