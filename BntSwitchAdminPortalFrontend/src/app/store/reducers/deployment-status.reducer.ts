import {
  initialDeploymentStatusState,
  IDeploymentStatusState,
} from '../state/deployment-status.state';
import {
  DeploymentStatusActions,
  EDeploymentStatusActions,
} from '../actions/deployment-status.action';

export function DeploymentStatusReducers(
  state = initialDeploymentStatusState,
  action: DeploymentStatusActions,
): IDeploymentStatusState {
  switch (action.type) {
    case EDeploymentStatusActions.GetDeploymentStatusSuccess: {
      return {
        ...state,
        getDeploymentStatus: action.payload,
      };
    }

    case EDeploymentStatusActions.ClearState: {
      return {
        ...state,
        getDeploymentStatus: null,
      };
    }
    default:
      return state;
  }
}
