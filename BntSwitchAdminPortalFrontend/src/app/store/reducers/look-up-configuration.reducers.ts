import {
  LookUpConfigurationActions,
  ELookUpConfigurationActions,
} from '../actions/look-up-configuration.action';
import {
  initialLookUpTypeConfigurationState,
  ILookUpTypeConfigurationState,
} from '../state/look-up-configuration.state';

export function LookUpConfigurationsReducers(
  state = initialLookUpTypeConfigurationState,
  action: LookUpConfigurationActions,
): ILookUpTypeConfigurationState {
  switch (action.type) {
    case ELookUpConfigurationActions.GetLookUpTypeSuccess: {
      return {
        ...state,
        LookUpType: action.payload,
      };
    }
    case ELookUpConfigurationActions.DeleteLookUpTypeSuccess: {
      return {
        ...state,
        deleteLookUpTypeConfiguration: action.payload,
      };
    }
    case ELookUpConfigurationActions.PostLookUpTypeSuccess: {
      return {
        ...state,
        LookUpTypePost: action.payload,
      };
    }
    case ELookUpConfigurationActions.UpdateLookUpTypeSuccess: {
      return {
        ...state,
        LookUpTypePut: action.payload,
      };
    }
    case ELookUpConfigurationActions.GetLookUpValueSuccess: {
      return {
        ...state,
        LookUpValue: action.payload,
      };
    }
    case ELookUpConfigurationActions.UpdateLookUpValueSuccess: {
      return {
        ...state,
        LookUpValueUpdate: action.payload,
      };
    }

    case ELookUpConfigurationActions.ClearState: {
      return {
        ...state,
        LookUpType: null,
        LookUpTypePost: null,
        LookUpTypePut: null,
        LookUpValue: null,
        LookUpValueUpdate: null,
        deleteLookUpTypeConfiguration: null,
      };
    }
    default:
      return state;
  }
}
