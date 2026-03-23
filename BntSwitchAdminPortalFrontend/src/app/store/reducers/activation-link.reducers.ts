import { EActivationActions, ActivationActions } from '../actions/activation-link.action';
import { IActivationState, initialIActivationState } from '../state/activation-link.state';

export function ActivationReducers(
  state = initialIActivationState,
  action: ActivationActions,
): IActivationState {
  switch (action.type) {
    case EActivationActions.VerifyActivationSuccess: {
      return {
        ...state,
        verifyActivation: action.payload,
      };
    }
    case EActivationActions.PostActivationSuccess: {
      return {
        ...state,
        postActivation: action.payload,
      };
    }

    default:
      return state;
  }
}
