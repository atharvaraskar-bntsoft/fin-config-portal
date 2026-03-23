import { DeviceTypesActions, EDeviceTypesActions } from '@app/store/actions/device-types.action';
import { IDeviceTypesState, initialDeviceTypesState } from '@app/store/state/device-types.state';

export function DeviceTypesReducers(
  state = initialDeviceTypesState,
  action: DeviceTypesActions,
): IDeviceTypesState {
  switch (action.type) {
    case EDeviceTypesActions.GetDeviceTypesSuccess: {
      return {
        ...state,
        deviceTypes: action.payload,
      };
    }
    case EDeviceTypesActions.ClearState: {
      return {
        ...state,
        deviceTypes: null,
      };
    }
    default:
      return state;
  }
}
