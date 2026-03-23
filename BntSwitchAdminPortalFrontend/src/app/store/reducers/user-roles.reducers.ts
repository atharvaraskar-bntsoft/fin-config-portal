import {
  EUserRolesActions,
  GetUserRolesDetailsSuccess,
  GetUserRolesFunctionListSuccess,
  PostUserRolesSuccess,
  PutUserRolesSuccess,
  UserRolesActions,
} from '../actions/user-roles.actions';
import { initialUserRolesState, IUserRolesState } from '../state/user-roles.state';

export function userRolesReducers(
  state = initialUserRolesState,
  action: UserRolesActions,
): IUserRolesState {
  switch (action.type) {
    case EUserRolesActions.GetUserRolesSuccess: {
      return {
        ...state,
        userRoles: action.payload,
      };
    }
    case EUserRolesActions.DeleteUserRolesSuccess: {
      return {
        ...state,
        userRolesDelete: action.payload,
      };
    }
    case EUserRolesActions.GetUserRolesDetailsSuccess: {
      return {
        ...state,
        userRolesDetails: action.payload,
      };
    }
    case EUserRolesActions.GetUserRolesFunctionListSuccess: {
      return {
        ...state,
        userRolesFunction: action.payload,
      };
    }
    case EUserRolesActions.GetAdminRoleCheckSuccess: {
      return {
        ...state,
        getAdminRoleCheck: action.payload,
      };
    }
    case EUserRolesActions.PostUserRolesSuccess: {
      return {
        ...state,
        userRolesCreate: action.payload,
      };
    }
    case EUserRolesActions.PutUserRolesSuccess: {
      return {
        ...state,
        userRolesEdit: action.payload,
      };
    }
    case EUserRolesActions.PutUserRolesStatusSuccess: {
      return {
        ...state,
        userRolesStatus: action.payload,
      };
    }
    case EUserRolesActions.ClearState: {
      return {
        ...state,
        userRolesCreate: null,
        userRolesDelete: null,
        userRolesEdit: null,
        userRolesStatus: null,
        getAdminRoleCheck: null,
      };
    }
    default:
      return state;
  }
}
