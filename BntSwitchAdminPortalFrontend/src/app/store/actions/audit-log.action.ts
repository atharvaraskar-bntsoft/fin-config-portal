import { AuditLogGetObject } from './../../models/audit-log.interface';
import { Action } from '@ngrx/store';

export enum EAuditLogActions {
  GetAuditLogs = '[LogsAudit] Get Audit Logs',
  GetAuditLogsSuccess = '[LogsAudit] Get Audit Logs Success',
  GetCurrentFilter = '[LogsAudit] Get Current Saved Filter',
}
export class GetAuditLogs implements Action {
  public readonly type = EAuditLogActions.GetAuditLogs;
  constructor(public payload?: any) {
  }
}
export class GetAuditLogsSuccess implements Action {
  public readonly type = EAuditLogActions.GetAuditLogsSuccess;
  constructor(public payload: AuditLogGetObject) {}
}

export class GetCurrentFilter implements Action {
  public readonly type = EAuditLogActions.GetCurrentFilter;
  constructor(public payload: AuditLogGetObject) {}
}

export type AuditlogActions = GetAuditLogs | GetAuditLogsSuccess | GetCurrentFilter;
