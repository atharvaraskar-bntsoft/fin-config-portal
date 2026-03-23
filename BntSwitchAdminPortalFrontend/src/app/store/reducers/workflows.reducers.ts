import { initialWorkflowsState, IWorkflowsState } from '../state/workflows.state';
import { EWorkflows, WorkFlowsActions } from '../actions/workflows.actions';

export function WorkflowReducers(
  state = initialWorkflowsState,
  action: WorkFlowsActions,
): IWorkflowsState {
  switch (action.type) {
    case EWorkflows.GetLatestWorkFlowSuccess: {
      return {
        ...state,
        workflowsL: action.payload,
      };
    }
    case EWorkflows.GetSingleLatestWorkflowSuccess: {
      return {
        ...state,
        workflow: action.payload,
      };
    }
    case EWorkflows.AddLatestWorkflowSuccess: {
      return {
        ...state,
        addworkflows: action.payload,
      };
    }
    case EWorkflows.PublishLatestWorkflowSuccess: {
      return {
        ...state,
        publishworkflows: action.payload,
      };
    }
    case EWorkflows.GetLatestWorkFlowServiceSuccess: {
      return {
        ...state,
        workflowServices: action.payload.data,
      };
    }
    case EWorkflows.GetWorkFlowsSuccess: {
      return {
        ...state,
        workflows: action.payload,
      };
    }
    case EWorkflows.GetPaymentMethodSuccess: {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    }
    case EWorkflows.PostPaymentMethodSuccess: {
      return {
        ...state,
        postPaymentMethod: action.payload,
      };
    }

    case EWorkflows.GetReversalFieldsSuccess: {
      return {
        ...state,
        reversalDropDown: action.payload,
      };
    }

    case EWorkflows.IsValidWorkflowNameSuccess: {
      return {
        ...state,
        isNameValid: action.payload,
      };
    }
    case EWorkflows.ClearState: {
      return {
        ...state,
        deleteWorkflow: null,
        deleteWorkflowGroup: null,
        postPaymentMethod: null,
        addworkflows: null,
        workflow: null,
        publishworkflows: null,
      };
    }
    case EWorkflows.DeleteWorkflowGroupSuccess: {
      return {
        ...state,
        deleteWorkflowGroup: action.payload,
      };
    }
    case EWorkflows.GetWorkFlowServicesSuccess: {
      return {
        ...state,
        serviceList: action.payload,
      };
    }
    case EWorkflows.DeleteWorkflowSuccess: {
      return {
        ...state,
        deleteWorkflow: action.payload,
      };
    }

    case EWorkflows.AddWorkflowSuccess: {
      return {
        ...state,
        addworkflows: action.payload,
      };
    }
    case EWorkflows.EnableDisableWorkflowSuccess: {
      return {
        ...state,
        workflowEnableDisable: action.payload,
      };
    }
    case EWorkflows.ClearAddWorkflowSuccess: {
      return {
        ...state,
        addworkflows: null,
      };
    }
    case EWorkflows.MakeAsDefaultWorkflowsuccess: {
      return {
        ...state,
        makeAsDefaultWorkflow: action.payload,
      };
    }
    default:
      return state;
  }
}
