import { initialProfileState, IProfileState } from '../state/profile.state';
import { ProfileActions, EProfileActions } from '../actions/profile.action';

export function ProfileReducers(
  state = initialProfileState,
  action: ProfileActions,
): IProfileState {
  switch (action.type) {
    case EProfileActions.GetProfileSuccess: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case EProfileActions.PostChangePasswordSuccess: {
      return {
        ...state,
        profileResponse: action.payload,
      };
    }
    case EProfileActions.UpdateProfileSuccess: {
      return {
        ...state,
        profileUpdateResponse: action.payload,
      };
    }
    case EProfileActions.ClearState: {
      return {
        ...state,
        profileResponse: null,
        profileUpdateResponse: null,
      };
    }
    default:
      return state;
  }
}
