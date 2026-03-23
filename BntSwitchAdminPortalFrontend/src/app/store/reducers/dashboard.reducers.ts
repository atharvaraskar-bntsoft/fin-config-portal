import { IDashboardState, initialDashboardState } from '../state/dashboard.state';
import { DashboardActions, EDashboardActions } from '../actions/dashboard.actions';

export function dashboardReducers(
  state = initialDashboardState,
  action: DashboardActions,
): IDashboardState {
  switch (action.type) {
    case EDashboardActions.GetDashboardSuccess: {
      return {
        ...state,
        dashboard: action.payload,
      };
    }
    default:
      return state;
  }
}
