import {
  IMasterConfiguration,
  initialMasterConfigurationState,
} from '../state/master-configuration.state';
import {
  MasterConfigurationActions,
  EMasterConfigurationActions,
} from './../actions/master-configuration.action';
export function masterConfigurationReducers(
  state = initialMasterConfigurationState,
  action: MasterConfigurationActions,
): IMasterConfiguration {
  switch (action.type) {
    case EMasterConfigurationActions.MODIFY_CURRENT_MASTER_CONFIGURATION_SUCCESS: {
      return {
        ...state,
        masterUpdated: action.payload,
      };
    }
    case EMasterConfigurationActions.GET_ALL_MASTER_CONFIGUERATION_SUCCESS: {
      console.log('Response', action.type);
      return {
        ...state,
        masterConfigurationList: action.payload,
      };
    }
  }
}
