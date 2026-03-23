import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IDeploymentStatusState } from '../state/deployment-status.state';

export const selectDeploymentStatus = (state: IAppState) => state.deploymentStatus;

export const selectGetDeploymentStatus = createSelector(
  selectDeploymentStatus,
  (state: IDeploymentStatusState) => state.getDeploymentStatus,
);
