import { ELocationActions, LocationActions } from './../actions/location.action';
import { initialLocationState, ILocationState } from '../state/location.state';

export function LocationReducers(
  state = initialLocationState,
  action: LocationActions,
): ILocationState {
  switch (action.type) {
    case ELocationActions.GetLocationSuccess: {
      return {
        ...state,
        Location: action.payload,
      };
    }
    case ELocationActions.GetLocationDetailSuccess: {
      return {
        ...state,
        LocationDetail: action.payload,
      };
    }

    case ELocationActions.ClearState: {
      return {
        ...state,
        Location: null,
        LocationDetail: null,
        locationResponse: null,
      };
    }
    default:
      return state;
  }
}
