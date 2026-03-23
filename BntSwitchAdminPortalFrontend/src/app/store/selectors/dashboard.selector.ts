import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IDashboardState } from '../state/dashboard.state';

const selectDashboard = (state: IAppState) => state.dashboard;

export const selectDashboardList = createSelector(
  selectDashboard,
  (state: IDashboardState) => state,
);

export const selectSelectedDashboard = createSelector(
  selectDashboard,
  (state: IDashboardState) => state.selectedDashboard,
);
