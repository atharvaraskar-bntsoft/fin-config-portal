import { SwitchClustersActions, ESwitchClustersActions } from '../actions/switch-clusters.action';
import { initialISwitchClustersState, ISwitchClustersState } from '../state/switch-clusters.state';

export function SwitchClustersReducers(
  state = initialISwitchClustersState,
  action: SwitchClustersActions,
): ISwitchClustersState {
  switch (action.type) {
    case ESwitchClustersActions.GetSwitchClustersSuccess: {
      return {
        ...state,
        getSwitchClusters: action.payload,
      };
    }

    case ESwitchClustersActions.PostSwitchClustersSuccess: {
      return {
        ...state,
        postSwitchClusters: action.payload,
      };
    }
    case ESwitchClustersActions.PutSwitchClustersSuccess: {
      return {
        ...state,
        putSwitchClusters: action.payload,
      };
    }
    case ESwitchClustersActions.GetByIdSwitchClustersSuccess: {
      return {
        ...state,
        getByIdSwitchClusters: action.payload,
      };
    }

    case ESwitchClustersActions.ClearState: {
      return {
        ...state,
        getByIdSwitchClusters: null,
        getSwitchClusters: null,
        postSwitchClusters: null,
        putSwitchClusters: null,
      };
    }
    default:
      return state;
  }
}
