import { initialDeviceState, IDeviceState } from '../state/device.state';
import { DeviceAction, EDeviceActions } from '../actions/device.action';

export function DeviceReducers(state = initialDeviceState, action: DeviceAction): IDeviceState {
  switch (action.type) {
    case EDeviceActions.GetDeviceSuccess: {
      return {
        ...state,
        Device: action.payload,
      };
    }
    case EDeviceActions.GetTreeDeepDeviceSuccess: {
      return {
        ...state,
        TreeDeepDevice: action.payload,
      };
    }
    case EDeviceActions.GetDeviceDetailSuccess: {
      return {
        ...state,
        DeviceDetail: action.payload,
      };
    }

    case EDeviceActions.GetDeviceTypesSuccess: {
      return {
        ...state,
        DeviceTypes: action.payload,
      };
    }
    case EDeviceActions.GetInstitutionListSuccess: {
      return {
        ...state,
        Institutiion: action.payload,
      };
    }
    case EDeviceActions.GetInstitutionGroupListSuccess: {
      return {
        ...state,
        InstitutionGroup: action.payload,
      };
    }
    case EDeviceActions.GetLocationListSuccess: {
      return {
        ...state,
        Location: action.payload,
      };
    }
    case EDeviceActions.ClearState: {
      return {
        ...state,
        Device: null,
        DeviceDetail: null,
        DeviceResponseSuccess: null,
      };
    }

    case EDeviceActions.GetDeviceModelMappingSuccess: {
      return {
        ...state,
        deviceModelMappedData: action.payload,
      };
    }
    default:
      return state;
  }
}
