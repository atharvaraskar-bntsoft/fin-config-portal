import {
  EDeploymentWorkflowActions,
  DeploymentWorkflowActions,
} from '../actions/deployment-workflow-mapper.action';
import {
  initialDeploymentWorkflowState,
  IDeploymentWorkflowState,
} from '../state/deployment-workflow-mapper.state';

export function DeploymentWorkflowReducers(
  state = initialDeploymentWorkflowState,
  action: DeploymentWorkflowActions,
): IDeploymentWorkflowState {
  switch (action.type) {
    case EDeploymentWorkflowActions.GetDeploymentWorkflowSuccess: {
      return {
        ...state,
        getDeploymentWorkflow: action.payload,
      };
    }

    case EDeploymentWorkflowActions.GetByIdDeploymentWorkflowSuccess: {
      return {
        ...state,
        getByIdDeploymentWorkflow: action.payload,
      };
    }

    case EDeploymentWorkflowActions.ClearState: {
      return {
        ...state,
        getByIdDeploymentWorkflow: null,
        getDeploymentWorkflow: null,
      };
    }
    default:
      return state;
  }
}
