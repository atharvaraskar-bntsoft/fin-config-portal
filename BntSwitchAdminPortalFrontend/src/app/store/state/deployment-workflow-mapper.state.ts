export interface IDeploymentWorkflowState {
  getDeploymentWorkflow: any;
  getByIdDeploymentWorkflow: any;
}

export const initialDeploymentWorkflowState: IDeploymentWorkflowState = {
  getByIdDeploymentWorkflow: null,
  getDeploymentWorkflow: null,
};
