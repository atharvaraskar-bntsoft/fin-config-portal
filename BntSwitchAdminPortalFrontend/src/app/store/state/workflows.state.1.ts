import { IWorkflows } from '../../models/workflows.interface';

export interface IWorkflowsState {
  deleteWorkflowGroup: IWorkflows;
  paymentMethod: IWorkflows;
  postPaymentMethod: IWorkflows;
  serviceList: IWorkflows;
  workflows: IWorkflows;
}

export const initialWorkflowsState: IWorkflowsState = {
  deleteWorkflowGroup: null,
  paymentMethod: null,
  postPaymentMethod: null,
  serviceList: null,
  workflows: null,
};
