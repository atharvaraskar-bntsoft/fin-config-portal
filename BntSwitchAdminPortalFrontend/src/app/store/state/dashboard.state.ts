import { IDashboard } from '../../models/dashboard.interface';

export interface IDashboardState {
  dashboard: IDashboard[];
  selectedDashboard: IDashboard;
}

export const initialDashboardState: IDashboardState = {
  dashboard: null,
  selectedDashboard: null,
};
