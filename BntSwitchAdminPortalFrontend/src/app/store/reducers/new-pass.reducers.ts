import { initialNewPassState, INewPassState } from '../state/new-pass.state';
import { ENewPass, newPass } from '../actions/new-pass.action';

export function NewPassReducers(state = initialNewPassState, action: newPass): INewPassState {
  switch (action.type) {
    case ENewPass.PostNewPassSuccess: {
      return {
        ...state,
        newPass: action.payload,
      };
    }

    default:
      return state;
  }
}
