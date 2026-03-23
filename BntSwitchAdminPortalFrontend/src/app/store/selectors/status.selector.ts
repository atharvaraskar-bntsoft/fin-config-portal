import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IStatusState } from '../state/status.state';

const selectStatus = (state: IAppState) => state.status;
const selectStatusResponse = (state: IAppState) => state.status;

export const selectStatusList = createSelector(selectStatus, (state: IStatusState) => state.status);

export const selectStatusSuccess = createSelector(
  selectStatusResponse,
  (state: IStatusState) => state.statusResponse,
);
