import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IAuditLogState } from '../state/audit-log.state';

const selectLogs = (state: IAppState) => state.auditLogs;

export const selectAuditLogs = createSelector(
  selectLogs,
  (state: IAuditLogState) => state.auditlogs,
);

export const getCurrentFilter = createSelector(
  selectLogs,
  (state: IAuditLogState) => state.filters,
);
