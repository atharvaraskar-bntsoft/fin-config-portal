import { Action } from '@ngrx/store';

export enum EDeploymentWorkflowActions {
  GetDeploymentWorkflow = '[DeploymentWorkflow] Get Deployment Workflow',
  GetDeploymentWorkflowSuccess = '[DeploymentWorkflow] Get Deployment Workflow Success',
  GetByIdDeploymentWorkflow = '[DeploymentWorkflow] GetById Deployment Workflow',
  GetByIdDeploymentWorkflowSuccess = '[DeploymentWorkflow] GetById Deployment Workflow Success',
  ClearState = '[DeploymentWorkflow] Clear state',
}
export class GetDeploymentWorkflow implements Action {
  public readonly type = EDeploymentWorkflowActions.GetDeploymentWorkflow;
  constructor(public payload?: any) {}
}

export class GetDeploymentWorkflowSuccess implements Action {
  public readonly type = EDeploymentWorkflowActions.GetDeploymentWorkflowSuccess;
  constructor(public payload: any) {}
}

export class GetByIdDeploymentWorkflow implements Action {
  public readonly type = EDeploymentWorkflowActions.GetByIdDeploymentWorkflow;
  constructor(public payload: any) {}
}
export class GetByIdDeploymentWorkflowSuccess implements Action {
  public readonly type = EDeploymentWorkflowActions.GetByIdDeploymentWorkflowSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EDeploymentWorkflowActions.ClearState;
}

export type DeploymentWorkflowActions =
  | GetDeploymentWorkflow
  | GetDeploymentWorkflowSuccess
  | GetByIdDeploymentWorkflow
  | GetByIdDeploymentWorkflowSuccess
  | ClearState;
