import { Action } from '@ngrx/store';
import { ICreateDeployment } from '@app/deployment/schedule/schedulte.interface';

export enum EDeploymentScheduleActions {
  CreateComponent = '[Deployment Schedule] Create Component',
  CreateComponentSuccess = '[Deployment Schedule]  Create Component Success',
  EditComponent = '[Deployment Schedule] Edit Component',
  EditComponentSuccess = '[Deployment Schedule] Edit Component Success',
  NewDeploymentList = '[Deployment Schedule] New Deployment List',
  ScheduleDeploymentList = '[Deployment Schedule] Deployment List',
  NewDeploymentListAction = '[Deployment Schedule] New Deployment List',
  ClusterListAction = '[Deployment Schedule] Fetch Cluster List',
  FetchNonSchedule = '[Deployment Schedule] Fetch Non Schedule',
  FetchNonScheduleSuccess = '[Deployment Schedule] Fetch Non Schedule Success',
  FetchScheduled = '[Deployment Schedule] Fetch Scheduled Components',
  FetchScheduledSuccess = '[Deployment Schedule] Fetch Scheduled Components Success',
  FetchClusterList = '[Deployment Schedule] Fetch Cluster List',
  FetchClusterListSuccess = '[Deployment Schedule] Fetch CLuster List Success',
  FetchCorePropertiesList = '[Deployment Schedule] Core Properties List',
  FetchCorePropertiesListSuccess = '[Deployment Schedule] Core Properties List Success',
  ClearState = '[Deployment Schedule] Clear State',
}

export class ClearStateAction implements Action {
  readonly type = EDeploymentScheduleActions.ClearState;
}

export class ScheduledDeploymentListAction implements Action {
  readonly type = EDeploymentScheduleActions.ScheduleDeploymentList;
  constructor() { }
}

export class FetchClusterListAction implements Action {
  readonly type = EDeploymentScheduleActions.FetchClusterList;
  constructor() { }
}

export class FetchClusterListSuccessAction implements Action {
  readonly type = EDeploymentScheduleActions.FetchClusterListSuccess;
  constructor(public payload: any) { }
}

export class FetchCorePropertiesListAction implements Action {
  readonly type = EDeploymentScheduleActions.FetchCorePropertiesList;
  constructor() { }
}

export class FetchCorePropertiesListSuccessAction implements Action {
  readonly type = EDeploymentScheduleActions.FetchCorePropertiesListSuccess;
  constructor(public payload: any) { }
}

export class FetchScheduledAction implements Action {
  readonly type = EDeploymentScheduleActions.FetchScheduled;
  constructor() { }
}

export class FetchScheduledSuccessAction implements Action {
  readonly type = EDeploymentScheduleActions.FetchScheduledSuccess;
  constructor(public payload: any) { }
}

export class FetchNonScheduleAction implements Action {
  readonly type = EDeploymentScheduleActions.FetchNonSchedule;
  constructor() { }
}

export class FetchNonScheduleSuccessAction implements Action {
  readonly type = EDeploymentScheduleActions.FetchNonScheduleSuccess;
  constructor(public payload: any) { }
}

export class ClusterListAction implements Action {
  readonly type = EDeploymentScheduleActions.ClusterListAction;
  constructor() { }
}

export class NewDeploymentListAction implements Action {
  readonly type = EDeploymentScheduleActions.NewDeploymentList;
  constructor() { }
}

export class CreateComponentAction implements Action {
  readonly type = EDeploymentScheduleActions.CreateComponent;
  constructor(public payload: ICreateDeployment) { }
}

export class CreateComponentSuccessAction implements Action {
  readonly type = EDeploymentScheduleActions.CreateComponentSuccess;
  constructor(public payload: any) { }
}

export class EditComponentAction implements Action {
  readonly type = EDeploymentScheduleActions.EditComponent;
  constructor(public payload: ICreateDeployment) { }
}

export class EditComponentSuccessAction implements Action {
  readonly type = EDeploymentScheduleActions.EditComponentSuccess;
  constructor(public payload: any) { }
}

export type DeploymentScheduleActions =
  | EditComponentAction
  | CreateComponentAction
  | CreateComponentSuccessAction
  | NewDeploymentListAction
  | ScheduledDeploymentListAction
  | ClusterListAction
  | FetchNonScheduleAction
  | FetchNonScheduleSuccessAction
  | FetchScheduledSuccessAction
  | FetchScheduledAction
  | FetchClusterListAction
  | FetchClusterListSuccessAction
  | FetchCorePropertiesListAction
  | FetchCorePropertiesListSuccessAction
  | EditComponentSuccessAction
  | ClearStateAction;
