import {
  initialMerchantCodeMappingState,
  IMerchantCodeMappingState,
} from '../state/merchant-code-mapping.state';
import {
  EMerchantCodeMappingActions,
  MerchantCodeMappingActions,
} from '../actions/merchant-code-mapping.action';

export function MerchantCodeMappingReducers(
  state = initialMerchantCodeMappingState,
  action: MerchantCodeMappingActions,
): IMerchantCodeMappingState {
  switch (action.type) {
    case EMerchantCodeMappingActions.GetMerchantCodeMappingSuccess: {
      return {
        ...state,
        merchantCodeMapping: action.payload,
      };
    }
    case EMerchantCodeMappingActions.DeleteMerchantCodeMappingSuccess: {
      return {
        ...state,
        deleteMerchantCodeMapping: action.payload,
      };
    }
    case EMerchantCodeMappingActions.GetRowMerchantCodeMappingSuccess: {
      return {
        ...state,
        merchantCodeMappingRow: action.payload,
      };
    }
    case EMerchantCodeMappingActions.PostMerchantCodeMappingSuccess: {
      return {
        ...state,
        merchantCodeMappingPostResponse: action.payload,
      };
    }
    case EMerchantCodeMappingActions.GetMerchantConfigureDataSuccess: {
      return {
        ...state,
        merchantConfigueData: action.payload,
      };
    }

    case EMerchantCodeMappingActions.ClearState: {
      return {
        ...state,
        merchantCodeMappingPostResponse: null,
      };
    }
    default:
      return state;
  }
}
