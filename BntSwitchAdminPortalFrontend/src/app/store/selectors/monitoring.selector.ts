import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IMonitoringState } from '../state/monitoring.state';

const selectMonitoring = (state: IAppState) => state.Monitoring;

export const selectMonitoringScreen = createSelector(
  selectMonitoring,
  (state: IMonitoringState) => state.Monitoring,
);

export const startMonitoringInstance = createSelector(
  selectMonitoring,
  (state: IMonitoringState) => state.startMonitoringInstance,
);
export const stopMonitoringInstance = createSelector(
  selectMonitoring,
  (state: IMonitoringState) => state.stopMonitoringInstance,
);
export const killMonitoringInstance = createSelector(
  selectMonitoring,
  (state: IMonitoringState) => state.killMonitoringInstance,
);
export const LoggerLevel = createSelector(
  selectMonitoring,
  (state: IMonitoringState) => state.LoggerLevel,
);
export const changeLoggerLevel = createSelector(
  selectMonitoring,
  (state: IMonitoringState) => state.ChangeLoggerLevel,
);
export const networkDumpStatus = createSelector(
  selectMonitoring,
  (state: IMonitoringState) => state.NetworkDumpStatus,
);
export const selectMonitoringOperation = createSelector(
  selectMonitoring,
  (state: IMonitoringState) => state.ExecuteOperation,
);
