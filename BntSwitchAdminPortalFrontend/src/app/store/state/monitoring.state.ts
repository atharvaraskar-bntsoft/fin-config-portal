import { GetMonitoringRootObject } from '@app/models/monitoring.interface';

export interface IMonitoringState {
  ChangeLoggerLevel: GetMonitoringRootObject;
  LoggerLevel: GetMonitoringRootObject;
  Monitoring: GetMonitoringRootObject;
  NetworkDumpStatus: GetMonitoringRootObject;
  killMonitoringInstance: GetMonitoringRootObject;
  selectedMonitoring: GetMonitoringRootObject;
  startMonitoringInstance: GetMonitoringRootObject;
  stopMonitoringInstance: GetMonitoringRootObject;
  ExecuteOperation: GetMonitoringRootObject;
}

export const initialMonitoringState: IMonitoringState = {
  ChangeLoggerLevel: null,
  LoggerLevel: null,
  Monitoring: null,
  NetworkDumpStatus: null,
  killMonitoringInstance: null,
  selectedMonitoring: null,
  startMonitoringInstance: null,
  stopMonitoringInstance: null,
  ExecuteOperation: null,
};
