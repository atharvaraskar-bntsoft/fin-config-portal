import { Action } from '@ngrx/store';

export enum ESwitchClustersActions {
  GetSwitchClusters = '[SwitchClusters] Get Switch CLusters',
  GetSwitchClustersSuccess = '[SwitchClusters] Get Switch CLusters Success',
  PostSwitchClusters = '[SwitchClusters] Post Switch CLusters',
  PostSwitchClustersSuccess = '[SwitchClusters] Post Switch CLusters Success',
  PutSwitchClusters = '[SwitchClusters] Put Switch CLusters',
  PutSwitchClustersSuccess = '[SwitchClusters] Put Switch CLusters Success',
  GetByIdSwitchClusters = '[SwitchClusters] GetById Switch CLusters',
  GetByIdSwitchClustersSuccess = '[SwitchClusters] GetById Switch CLusters Success',
  ClearState = '[SwitchClusters] Clear state',
}
export class GetSwitchClusters implements Action {
  public readonly type = ESwitchClustersActions.GetSwitchClusters;
  constructor(public payload?: any) {}
}

export class GetSwitchClustersSuccess implements Action {
  public readonly type = ESwitchClustersActions.GetSwitchClustersSuccess;
  constructor(public payload: any) {}
}

export class PostSwitchClusters implements Action {
  public readonly type = ESwitchClustersActions.PostSwitchClusters;
  constructor(public payload: any) {}
}

export class PostSwitchClustersSuccess implements Action {
  public readonly type = ESwitchClustersActions.PostSwitchClustersSuccess;
  constructor(public payload: any) {}
}
export class PutSwitchClusters implements Action {
  public readonly type = ESwitchClustersActions.PutSwitchClusters;
  constructor(public payload: any) {}
}

export class PutSwitchClustersSuccess implements Action {
  public readonly type = ESwitchClustersActions.PutSwitchClustersSuccess;
  constructor(public payload: any) {}
}

export class GetByIdSwitchClusters implements Action {
  public readonly type = ESwitchClustersActions.GetByIdSwitchClusters;
  constructor(public payload: any) {}
}
export class GetByIdSwitchClustersSuccess implements Action {
  public readonly type = ESwitchClustersActions.GetByIdSwitchClustersSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = ESwitchClustersActions.ClearState;
}

export type SwitchClustersActions =
  | GetSwitchClusters
  | GetSwitchClustersSuccess
  | PostSwitchClusters
  | PostSwitchClustersSuccess
  | PutSwitchClusters
  | PutSwitchClustersSuccess
  | GetByIdSwitchClusters
  | GetByIdSwitchClustersSuccess
  | ClearState;
