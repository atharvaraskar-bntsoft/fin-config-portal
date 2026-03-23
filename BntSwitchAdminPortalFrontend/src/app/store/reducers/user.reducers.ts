import {
  DeleteUsersSuccess,
  EUserActions,
  GetUsersDetailsSuccess,
  GetUsersRoleListSuccess,
  PostUsersSuccess,
  PutUsersSuccess,
} from './../actions/user.actions';
import { UserActions } from '../actions/user.actions';
import { initialUserState, IUserState } from '../state/user.state';

export function userReducers(state = initialUserState, action: UserActions): IUserState {
  switch (action.type) {
    case EUserActions.GetUsersSuccess: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }
    case EUserActions.DeleteUsersSuccess: {
      return {
        ...state,
        usersDelete: action.payload,
      };
    }
    case EUserActions.PostUsersSuccess: {
      return {
        ...state,
        usersCreate: action.payload,
      };
    }
    case EUserActions.PutUsersSuccess: {
      return {
        ...state,
        usersEdit: action.payload,
      };
    }
    case EUserActions.GetUsersDetailsSuccess: {
      return {
        ...state,
        usersDetails: action.payload,
      };
    }
    case EUserActions.GetUsersRoleListSuccess: {
      return {
        ...state,
        usersRoleList: action.payload,
      };
    }
    case EUserActions.PutUsersStatusSuccess: {
      return {
        ...state,
        usersStatus: action.payload,
      };
    }
    case EUserActions.ClearState: {
      return {
        ...state,
        usersCreate: null,
        usersDelete: null,
        usersEdit: null,
        usersStatus: null,
      };
    }
    default:
      return state;
  }
}
