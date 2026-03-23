import { ELoginActions, LoginActions } from './../actions/auth.action';
import { initialLoginState, ILoginState } from '../state/auth.state';

export function authReducers(state = initialLoginState, action: LoginActions): ILoginState {
  switch (action.type) {
    case ELoginActions.LoginSucess: {
      return {
        ...state,
        authdata: action.payload,
      };
    }
    case ELoginActions.LoginReset: {
      return {
        ...state,
        authdata: null,
      };
    }
    case ELoginActions.ResetPasswordSuccess: {
      return {
        ...state,
        resetData: action.payload,
      };
    }
    default:
      return state;
  }
}
