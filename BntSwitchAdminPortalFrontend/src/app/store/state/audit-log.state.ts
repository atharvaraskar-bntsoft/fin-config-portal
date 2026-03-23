import { AuditLogGetObject } from '@app/models/audit-log.interface';

export interface IAuditLogState {
  auditlogs: AuditLogGetObject;
  selectedAuditLog: any;
  filters: any;
}

export const initialAuditLogState: IAuditLogState = {
  auditlogs: null,
  selectedAuditLog: null,
  filters: null,
};
