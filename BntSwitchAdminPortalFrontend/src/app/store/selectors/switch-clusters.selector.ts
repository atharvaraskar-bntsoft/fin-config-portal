import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ISwitchClustersState } from '../state/switch-clusters.state';

export const selectSwitchClusters = (state: IAppState) => state.switchClusters;

export const selectGetSwitchClusters = createSelector(
  selectSwitchClusters,
  (state: ISwitchClustersState) => state.getSwitchClusters,
);

export const selectPostSwitchClusters = createSelector(
  selectSwitchClusters,
  (state: ISwitchClustersState) => state.postSwitchClusters,
);

export const selectPutSwitchClusters = createSelector(
  selectSwitchClusters,
  (state: ISwitchClustersState) => state.putSwitchClusters,
);

export const selectGetByIdSwitchClusters = createSelector(
  selectSwitchClusters,
  (state: ISwitchClustersState) => state.getByIdSwitchClusters,
);
