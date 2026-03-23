import { Action } from '@ngrx/store';
import { GetMonitoringRootObject } from '@app/models/monitoring.interface';

export enum EMonitoringActions {
  ChangeLoggerLogLevel = '[Monitoring] Change Logger Log Level',
  ChangeLoggerLogLevelSuccess = '[Monitoring] Change Logger Log Level Success',
  GetMonitoring = '[Monitoring] Get Monitoring',
  GetMonitoringSuccess = '[Monitoring] Get Monitoring Success',
  GetLoggerLogLevel = '[Monitoring] Get Logger Log Level',
  GetLoggerLogLevelSuccess = '[Monitoring] Get Logger Log Level Success',
  KillMonitoringInstance = '[Monitoring] Kill Monitoring Instance',
  KillMonitoringInstanceSuccess = '[Monitoring] Kill Monitoring Instance Success',
  NetworkDumpStatus = '[Monitoring] Network Dump Status',
  NetworkDumpStatusSuccess = '[Monitoring] Network Dump Status Success',
  StartMonitoringInstance = '[Monitoring] Start Monitoring Instance',
  StartMonitoringInstanceSuccess = '[Monitoring] Start Monitoring Instance Success',
  StopMonitoringInstance = '[Monitoring] Stop Monitoring Instance',
  StopMonitoringInstanceSuccess = '[Monitoring] Stop Monitoring Instance Success',
  ExecuteMonitoringOperation = '[Monitoring] Execute Monitoring Operation ',
  ExecuteMonitoringOperationSuccess = '[Monitoring] Execute Monitoring Operation Success',
}

export class ChangeLoggerLogLevel implements Action {
  public readonly type = EMonitoringActions.ChangeLoggerLogLevel;

  constructor(public payload: any) {}
}

export class ChangeLoggerLogLevelSuccess implements Action {
  public readonly type = EMonitoringActions.ChangeLoggerLogLevelSuccess;

  constructor(public payload: any) {}
}

export class GetMonitoring implements Action {
  public readonly type = EMonitoringActions.GetMonitoring;
}

export class GetMonitoringSuccess implements Action {
  public readonly type = EMonitoringActions.GetMonitoringSuccess;

  constructor(public payload: GetMonitoringRootObject) {}
}

export class GetLoggerLogLevel implements Action {
  public readonly type = EMonitoringActions.GetLoggerLogLevel;

  constructor(public payload: any) {}
}

export class GetLoggerLogLevelSuccess implements Action {
  public readonly type = EMonitoringActions.GetLoggerLogLevelSuccess;

  constructor(public payload: GetMonitoringRootObject) {}
}

export class KillMonitoringInstance implements Action {
  public readonly type = EMonitoringActions.KillMonitoringInstance;

  constructor(public payload: any) {}
}

export class KillMonitoringInstanceSuccess implements Action {
  public readonly type = EMonitoringActions.KillMonitoringInstanceSuccess;

  constructor(public payload: GetMonitoringRootObject) {}
}

export class NetworkDumpStatus implements Action {
  public readonly type = EMonitoringActions.NetworkDumpStatus;

  constructor(public payload: any) {}
}

export class NetworkDumpStatusSuccess implements Action {
  public readonly type = EMonitoringActions.NetworkDumpStatusSuccess;

  constructor(public payload: GetMonitoringRootObject) {}
}

export class StartMonitoringInstance implements Action {
  public readonly type = EMonitoringActions.StartMonitoringInstance;

  constructor(public payload: any) {}
}

export class StartMonitoringInstanceSuccess implements Action {
  public readonly type = EMonitoringActions.StartMonitoringInstanceSuccess;

  constructor(public payload: GetMonitoringRootObject) {}
}

export class StopMonitoringInstance implements Action {
  public readonly type = EMonitoringActions.StopMonitoringInstance;

  constructor(public payload: any) {}
}

export class StopMonitoringInstanceSuccess implements Action {
  public readonly type = EMonitoringActions.StopMonitoringInstanceSuccess;

  constructor(public payload: GetMonitoringRootObject) {}
}
// tslint:disable-next-line: max-classes-per-file
export class ExecuteMonitoringOperation implements Action {
  public readonly type = EMonitoringActions.ExecuteMonitoringOperation;
  constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ExecuteMonitoringOperationSuccess implements Action {
  public readonly type = EMonitoringActions.ExecuteMonitoringOperationSuccess;
  constructor(public payload: GetMonitoringRootObject) {}
}
export type MonitoringActions =
  | ChangeLoggerLogLevel
  | ChangeLoggerLogLevelSuccess
  | GetMonitoring
  | GetMonitoringSuccess
  | GetLoggerLogLevel
  | GetLoggerLogLevelSuccess
  | KillMonitoringInstance
  | KillMonitoringInstanceSuccess
  | NetworkDumpStatus
  | NetworkDumpStatusSuccess
  | StartMonitoringInstance
  | StartMonitoringInstanceSuccess
  | StopMonitoringInstance
  | StopMonitoringInstanceSuccess
  | ExecuteMonitoringOperation
  | ExecuteMonitoringOperationSuccess;
