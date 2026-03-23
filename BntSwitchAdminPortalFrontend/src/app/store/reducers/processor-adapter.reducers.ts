import {
  EProcessorAdapterActions,
  ProcessorAdapterAction,
} from '../actions/processor-adapter.action';
import {
  initialProcessorAdapterState,
  IProcessorAdapterState,
} from '../state/processor-adapter.state';

export function ProcessorAdapterReducers(
  state = initialProcessorAdapterState,
  action: ProcessorAdapterAction,
): IProcessorAdapterState {
  switch (action.type) {
    case EProcessorAdapterActions.GetProcessorAdapterSuccess: {
      return {
        ...state,
        processorAdapterData: action.payload,
      };
    }
    case EProcessorAdapterActions.GetServiceListSuccess: {
      return {
        ...state,
        getServiceList: action.payload,
      };
    }
    case EProcessorAdapterActions.Get13ListSuccess: {
      return {
        ...state,
        get13List: action.payload,
      };
    }
    case EProcessorAdapterActions.GetProcessorAdapterDetailsSuccess: {
      return {
        ...state,
        processorAdapterDetails: action.payload,
      };
    }
    case EProcessorAdapterActions.PutProcessorAdapterSuccess: {
      return {
        ...state,
        processorAdapterEdit: action.payload,
      };
    }
    case EProcessorAdapterActions.PostProcessorAdapterSuccess: {
      return {
        ...state,
        processorAdapterCreate: action.payload,
      };
    }

    case EProcessorAdapterActions.ClearState: {
      return {
        ...state,
        processorAdapterCreate: null,
        processorAdapterData: null,
        processorAdapterDetails: null,
        processorAdapterEdit: null,
      };
    }

    default:
      return state;
  }
}
