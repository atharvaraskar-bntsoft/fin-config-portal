import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IWorkflowsState } from '../state/workflows.state';

const selectWorkflows = (state: IAppState) => state.workflows;
export const selectWorkflow = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.workflows,
);

export const selectLatestWorkflow = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.workflowsL,
);

export const selectLatestWorkflowService = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.workflowServices,
);

export const selectPaymentMethod = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.paymentMethod,
);

export const selectPaymentMethodPost = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.postPaymentMethod,
);

export const selectWorkflowGroupDelete = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.deleteWorkflowGroup,
);

export const selectWorkflowServiceList = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.serviceList,
);

export const selectWorkflowDelete = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.deleteWorkflow,
);
export const selectWorkflowAdd = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.addworkflows,
);

export const selectWorkflowPublish = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.publishworkflows,
);

export const selectSingkeWorkflow = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.workflow,
);

export const selectWorkflowEnableDisable = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.workflowEnableDisable,
);
export const selectWorkflowMakeAsDefault = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.makeAsDefaultWorkflow,
);

export const selectWorkFlowDropDown = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.reversalDropDown,
);

export const isValidWorklowName = createSelector(
  selectWorkflows,
  (state: IWorkflowsState) => state.isNameValid,
);
