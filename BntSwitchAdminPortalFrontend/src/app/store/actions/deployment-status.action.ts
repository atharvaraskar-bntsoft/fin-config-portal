import { Action } from '@ngrx/store';

export enum EDeploymentStatusActions {
  GetDeploymentStatus = '[DeploymentStatus] Get Deployment Status',
  GetDeploymentStatusSuccess = '[DeploymentStatus] Get Deployment Status Success',

  ClearState = '[DeploymentStatus] Clear state',
}
export class GetDeploymentStatus implements Action {
  public readonly type = EDeploymentStatusActions.GetDeploymentStatus;
  constructor(public payload?: any) {}
}

export class GetDeploymentStatusSuccess implements Action {
  public readonly type = EDeploymentStatusActions.GetDeploymentStatusSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EDeploymentStatusActions.ClearState;
}

export type DeploymentStatusActions = GetDeploymentStatus | GetDeploymentStatusSuccess | ClearState;
