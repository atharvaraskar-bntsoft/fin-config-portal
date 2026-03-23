import { IInvalidLogState, initialInvalidLogState } from '../state/invalid-log.state';
import { EInvalidLogActions, InvalidlogActions } from '../actions/invalid-log.action';

/*
  This Reducer will  work for the below screens:
  1. SAF Screen
  2. Exceptional Screen and
  3. Invalid Logs
*/
export function InvalidLogReducers(
  state = initialInvalidLogState,
  action: InvalidlogActions,
): IInvalidLogState {
  switch (action.type) {
    case EInvalidLogActions.GetInvalidLogsSuccess: {
      return {
        ...state,
        invalidlogs: action.payload,
      };
    }
    case EInvalidLogActions.GetSAFQueueSuccess: {
      return {
        ...state,
        safQueueList: action.payload,
      };
    }
    case EInvalidLogActions.DeleteMultipleSuccess: {
      return {
        ...state,
        deleteMultiple: action.payload,
      };
    }
    case EInvalidLogActions.MoveToSAFQueueSuccess: {
      return {
        ...state,
        moveToSafQueueFromExceptional: action.payload,
      };
    }
    case EInvalidLogActions.GetExceptionSuccess: {
      return {
        ...state,
        exceptionalQueueList: action.payload,
      };
    }
    case EInvalidLogActions.GetSAFQueueDDLSuccess: {
      return {
        ...state,
        safStatusDDL: action.payload,
      };
    }

    case EInvalidLogActions.GetSAFProcessorListSuccess: {
      return {
        ...state,
        safProcessorList: action.payload,
      };
    }

    case EInvalidLogActions.DeleteSAFQueueSuccess: {
      return {
        ...state,
        deleteSAFQueue: action.payload,
      };
    }
    case EInvalidLogActions.ClearState: {
      return {
        ...state,
        invalidlogs: null,
        selectedInvalidLog: null,
        safQueueList: null,
        safProcessorList: null,
        moveToSafQueueFromExceptional: null,
        exceptionalQueueList: null,
        deleteMultiple: null,
        deleteSAFQueue: null,
        safStatusDDL: null,
      };
    }
    default:
      return state;
  }
}
