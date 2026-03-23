import { EL3AdapterActions, L3AdapterActions } from '../actions/l3-adapter.action';
import { initialL3AdapterState, IL3AdapterState } from '../state/l3-adapter.state';

export function L3AdapterReducers(
  state = initialL3AdapterState,
  action: L3AdapterActions,
): IL3AdapterState {
  switch (action.type) {
    case EL3AdapterActions.GetL3AdapterListSuccess: {
      return {
        ...state,
        l3Adapter: action.payload,
      };
    }

    case EL3AdapterActions.GetL3AdapterSuccess: {
      return {
        ...state,
        l3AdapterData: action.payload,
      };
    }

    case EL3AdapterActions.GetL3AdapterByIdSuccess: {
      return {
        ...state,
        l3AdapterById: action.payload,
      };
    }

    case EL3AdapterActions.GetL3NetworkSuccess: {
      return {
        ...state,
        networkList: action.payload,
      };
    }

    case EL3AdapterActions.GetPostActionMethodSuccess: {
      return {
        ...state,
        postAction: action.payload,
      };
    }
     
    case EL3AdapterActions.GetPreActionMethodSuccess: {
      return {
        ...state,
        preAction: action.payload,
      };
    }

    case EL3AdapterActions.GetStepListMethodSuccess: {
      return {
        ...state,
        stepList: action.payload,
      };
    }

    case EL3AdapterActions.ClearState: {
      return {
        ...state,
        l3Adapter: null,
        l3AdapterData: null,
        l3AdapterById: null,
        postAction: null,
      };
    }

    default:
      return state;
  }
}
