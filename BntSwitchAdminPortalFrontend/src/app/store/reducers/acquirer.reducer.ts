/*import {
  ENetworkResponseActions,
  NetworkResponseActions,
} from './../actions/network-response.action';
import { initialAuditLogState, IAuditLogState } from '../state/audit-log.state';
import {
  INetworkResponseState,
  initialNetworkResponseState,
} from '@app/store/state/network-response.state';
*/
import { AcquirerActions, EAcquirerActions } from '../actions/acquirer.action';
import { initialAcquirerState, IAcquirerState } from '../state/aquirer.state';

export function AcquirerReducers(
  state = initialAcquirerState,
  action: AcquirerActions,
): IAcquirerState {
  switch (action.type) {
    case EAcquirerActions.GetAcquirerSuccess: {
      return {
        ...state,
        acquirer: action.payload,
      };
    }
    case EAcquirerActions.GetInstitutionAcquirerProcessorListSuccess: {
      return {
        ...state,
        InstitutionAcquirerProcessorList: action.payload,
      };
    }
    case EAcquirerActions.PostAcquirerSuccess: {
      return {
        ...state,
        acquirerResponse: action.payload,
      };
    }
    case EAcquirerActions.GetAcquirerRowDataSuccess: {
      return {
        ...state,
        acquirerRowData: action.payload,
      };
    }
    case EAcquirerActions.ClearState: {
      return {
        ...state,
        acquirer: null,
        acquirerResponse: null,
        acquirerRowData: null,
      };
    }
    default:
      return state;
  }
}
