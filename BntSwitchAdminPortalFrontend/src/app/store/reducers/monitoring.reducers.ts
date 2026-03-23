import { EMonitoringActions, MonitoringActions } from './../actions/monitoring.action';
import { initialMonitoringState, IMonitoringState } from '../state/monitoring.state';

export function MonitoringReducers(
  state = initialMonitoringState,
  action: MonitoringActions,
): IMonitoringState {
  switch (action.type) {
    case EMonitoringActions.GetMonitoringSuccess: {
      return {
        ...state,
        Monitoring: action.payload,
      };
    }
    case EMonitoringActions.StartMonitoringInstanceSuccess: {
      return {
        ...state,
        startMonitoringInstance: action.payload,
      };
    }
    case EMonitoringActions.StopMonitoringInstanceSuccess: {
      return {
        ...state,
        stopMonitoringInstance: action.payload,
      };
    }
    case EMonitoringActions.KillMonitoringInstanceSuccess: {
      return {
        ...state,
        killMonitoringInstance: action.payload,
      };
    }
    case EMonitoringActions.GetLoggerLogLevelSuccess: {
      return {
        ...state,
        LoggerLevel: action.payload,
      };
    }
    case EMonitoringActions.ChangeLoggerLogLevelSuccess: {
      return {
        ...state,
        ChangeLoggerLevel: action.payload,
      };
    }
    case EMonitoringActions.NetworkDumpStatusSuccess: {
      return {
        ...state,
        NetworkDumpStatus: action.payload,
      };
    }
    case EMonitoringActions.ExecuteMonitoringOperationSuccess: {
      return {
        ...state,
        ExecuteOperation: action.payload,
      };
    }
    default:
      return state;
  }
}
