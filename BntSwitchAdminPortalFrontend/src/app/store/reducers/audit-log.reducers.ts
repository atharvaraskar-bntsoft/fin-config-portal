import { EAuditLogActions, AuditlogActions } from './../actions/audit-log.action';
import { initialAuditLogState, IAuditLogState } from '../state/audit-log.state';

export function AuditLogReducers(
  state = initialAuditLogState,
  action: AuditlogActions,
): IAuditLogState {
  switch (action.type) {
    case EAuditLogActions.GetAuditLogsSuccess: {
      return {
        ...state,
        auditlogs: action.payload,
      };
    }
    case EAuditLogActions.GetCurrentFilter: {
      return {
        ...state,
        filters: action.payload,
      };
    }
    default:
      return state;
  }
}
