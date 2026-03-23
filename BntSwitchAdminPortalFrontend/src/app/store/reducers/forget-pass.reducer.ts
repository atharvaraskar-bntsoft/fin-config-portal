import { EforgetPass, PostTokenSuccess, forgetPass } from './../actions/forget-pass.action';
import { initialforgetPassState, IforgetPass } from '../state/forget-pass.state';

export function ForgetPassReducers(
  state = initialforgetPassState,
  action: forgetPass,
): IforgetPass {
  switch (action.type) {
    case EforgetPass.PostTokenSuccess: {
      return {
        ...state,
        forgetPass: action.payload,
      };
    }

    default:
      return state;
  }
}
