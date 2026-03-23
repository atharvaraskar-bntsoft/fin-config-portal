import {
  initialAcquirerIdConfigState,
  IAcquirerIdConfigState,
} from '../state/aquirer-id-config.state';
import {
  AcquirerIdConfigActions,
  EAcquirerIdConfigActions,
} from '../actions/acquirer-id-config-mapping.action';

export function AcquirerIdConfigReducers(
  state = initialAcquirerIdConfigState,
  action: AcquirerIdConfigActions,
): IAcquirerIdConfigState {
  switch (action.type) {
    case EAcquirerIdConfigActions.GetAcquirerIdConfigSuccess: {
      return {
        ...state,
        acquirerIdConfig: action.payload,
      };
    }
    case EAcquirerIdConfigActions.GetAcquirerIdConfigDetailsSuccess: {
      return {
        ...state,
        acquirerIdConfigDetails: action.payload,
      };
    }

    case EAcquirerIdConfigActions.ClearState: {
      return {
        ...state,
        acquirerIdConfig: null,
        acquirerIdConfigDetails: null,
        acquireIdFlag: null,
      };
    }
    case EAcquirerIdConfigActions.GetAcquirerIdFlagSuccess: {
      return {
        ...state,
        acquireIdFlag: action.payload,
      };
    }

    default:
      return state;
  }
}
