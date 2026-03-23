import { IWorkflows } from '../../models/workflows.interface';

export interface IWorkflowsState {
  addworkflows: IWorkflows;
  publishworkflows: IWorkflows;
  deleteWorkflow: IWorkflows;
  deleteWorkflowGroup: IWorkflows;
  paymentMethod: IWorkflows;
  postPaymentMethod: IWorkflows;
  serviceList: IWorkflows;
  workflows: IWorkflows;
  workflowEnableDisable: IWorkflows;
  makeAsDefaultWorkflow: any;
  workflowsL: any;
  workflowServices: any;
  workflow: any;
  reversalDropDown: any;
  isNameValid: any;
}

export const initialWorkflowsState: IWorkflowsState = {
  addworkflows: null,
  deleteWorkflow: null,
  deleteWorkflowGroup: null,
  makeAsDefaultWorkflow: null,
  paymentMethod: null,
  postPaymentMethod: null,
  publishworkflows: null,
  serviceList: null,
  workflowEnableDisable: null,
  workflows: null,
  workflowsL: null,
  workflowServices: null,
  workflow: null,
  reversalDropDown: null,
  isNameValid: null,
};
