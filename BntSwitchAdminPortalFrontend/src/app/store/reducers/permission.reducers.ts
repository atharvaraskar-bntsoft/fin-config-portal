import { initialPermissionState, IPermissionState } from '../state/permission.state';
import { EPermissionsActions, PermissionsActions } from '../actions/permissions.action';

export function PermissionReducers(
  state = initialPermissionState,
  action: PermissionsActions,
): IPermissionState {
  switch (action.type) {
    case EPermissionsActions.GetPermissionSuccess: {
      return {
        ...state,
        permissions: action.payload,
      };
    }

    default:
      return state;
  }
}
