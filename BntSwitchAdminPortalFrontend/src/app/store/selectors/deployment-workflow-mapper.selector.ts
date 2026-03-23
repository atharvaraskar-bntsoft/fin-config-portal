import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IDeploymentWorkflowState } from '../state/deployment-workflow-mapper.state';

export const selectDeploymentWorkflow = (state: IAppState) => state.deploymentWorkflow;

export const selectGetDeploymentWorkflow = createSelector(
  selectDeploymentWorkflow,
  (state: IDeploymentWorkflowState) => state.getDeploymentWorkflow,
);

export const selectGetByIdDeploymentWorkflow = createSelector(
  selectDeploymentWorkflow,
  (state: IDeploymentWorkflowState) => state.getByIdDeploymentWorkflow,
);
