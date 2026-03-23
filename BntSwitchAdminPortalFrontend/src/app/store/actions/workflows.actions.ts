import { Action } from '@ngrx/store';

export enum EWorkflows {
  AddWorkflow = '[AddWorkflow] Add WorkFlow ',
  AddWorkflowSuccess = '[AddWorkflowSuccess] Add WorkFlow Success',
  ClearAddWorkflowSuccess = '[ClearAddWorkflowSuccess] Clear State',
  ClearState = '[WorkFlows] Clear State',
  DeleteWorkflow = '[WorkFlow] Delete WorkFlow ',
  DeleteWorkflowSuccess = '[WorkFlow] Delete WorkFlow Success',
  DeleteWorkflowGroup = '[WorkFlows] Delete WorkFlow Group',
  DeleteWorkflowGroupSuccess = '[WorkFlows] Delete WorkFlow Group Success',
  EnableDisableWorkflow = '[EnableDisableWorkflow] EnableDisableWorkflow WorkFlow Group',
  EnableDisableWorkflowSuccess = '[EnableDisable] EnableDisable WorkFlow Group Success',
  GetWorkFlows = '[WorkFlows] Get WorkFlows',
  GetWorkFlowServices = '[WorkFlows] Get WorkFlow Services',
  GetWorkFlowServicesSuccess = '[WorkFlows] Get WorkFlow Services Success',
  GetWorkFlowsSuccess = '[WorkFlows] Get WorkFlows Success',
  GetPaymentMethod = '[WorkFlows] Get Payment Method',
  GetPaymentMethodSuccess = '[WorkFlows] Get Payment Method Success',
  PostPaymentMethod = '[WorkFlows] Post Payment Method',
  PostPaymentMethodSuccess = '[WorkFlows] Post Payment Method Success',
  MakeAsDefaultWorkflow = '[MakeAsDefaultWorkflow] put default request',
  MakeAsDefaultWorkflowsuccess = '[MakeAsDefaultWorkflowuccess] put default request Success',
  GetLatestWorkFlows = '[WorkFlows] Get Latest WorkFlows',
  GetLatestWorkFlowSuccess = '[WorkFlows] Get Latest WorkFlow Success',
  GetLatestWorkFlowService = '[WorkFlows] Get Latest WorkFlows Service',
  GetLatestWorkFlowServiceSuccess = '[WorkFlows] Get Latest WorkFlow Service Success',
  AddLatestWorkflow = '[AddWorkflow] Add Latest WorkFlow ',
  AddLatestWorkflowSuccess = '[AddWorkflowSuccess] Add WorkFlow Latest Success',
  PublishLatestWorkflow = '[PublishWorkflow] Publish Latest WorkFlow ',
  PublishLatestWorkflowSuccess = '[PublishWorkflowSuccess] Publish WorkFlow Latest Success',
  GetSingleLatestWorkflow = '[AddWorkflow] Single Latest WorkFlow ',
  GetSingleLatestWorkflowSuccess = '[AddWorkflowSuccess] Single WorkFlow Latest Success',
  GetReversalFields = '[AddWorkflow] Get Reversal List Drop Downs',
  GetReversalFieldsSuccess = '[AddWorkflow] Get Reversal List Drop Downs Success',
  IsValidWorkflowName = '[AddWorkflow] Is Entered Workflow Name Valid',
  IsValidWorkflowNameSuccess = '[AddWorkflow] Entered Workflow Name Response',
}

export class GetSingleLatestWorkflow implements Action {
  public readonly type = EWorkflows.GetSingleLatestWorkflow;
  constructor(public payload: any) {}
}

export class GetSingleLatestWorkflowSuccess implements Action {
  public readonly type = EWorkflows.GetSingleLatestWorkflowSuccess;
  constructor(public payload: any) {}
}

export class AddLatestWorkflow implements Action {
  public readonly type = EWorkflows.AddLatestWorkflow;
  constructor(public payload: any) {}
}

export class AddLatestWorkflowSuccess implements Action {
  public readonly type = EWorkflows.AddLatestWorkflowSuccess;
  constructor(public payload: any) {}
}

export class PublishLatestWorkflow implements Action {
  public readonly type = EWorkflows.PublishLatestWorkflow;
  constructor(public payload: any) {}
}

export class PublishLatestWorkflowSuccess implements Action {
  public readonly type = EWorkflows.PublishLatestWorkflowSuccess;
  constructor(public payload: any) {}
}

export class GetLatestWorkFlowService implements Action {
  public readonly type = EWorkflows.GetLatestWorkFlowService;
}

export class GetLatestWorkFlowServiceSuccess implements Action {
  public readonly type = EWorkflows.GetLatestWorkFlowServiceSuccess;
  constructor(public payload: any) {}
}

export class GetLatestWorkFlows implements Action {
  public readonly type = EWorkflows.GetLatestWorkFlows;
  constructor(public payload: any) {}
}

export class GetLatestWorkFlowSuccess implements Action {
  public readonly type = EWorkflows.GetLatestWorkFlowSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EWorkflows.ClearState;
}

export class DeleteWorkflowGroup implements Action {
  public readonly type = EWorkflows.DeleteWorkflowGroup;
  constructor(public payload: any) {}
}

export class DeleteWorkflowGroupSuccess implements Action {
  public readonly type = EWorkflows.DeleteWorkflowGroupSuccess;
  constructor(public payload: any) {}
}

export class GetWorkFlows implements Action {
  public readonly type = EWorkflows.GetWorkFlows;
  constructor(public payload?: any) {}
}

export class GetWorkFlowServices implements Action {
  public readonly type = EWorkflows.GetWorkFlowServices;
}

export class GetWorkFlowServicesSuccess implements Action {
  public readonly type = EWorkflows.GetWorkFlowServicesSuccess;
  public constructor(public payload: any) {}
}

export class GetWorkFlowsSuccess implements Action {
  public readonly type = EWorkflows.GetWorkFlowsSuccess;
  public constructor(public payload: any) {}
}

export class GetPaymentMethod implements Action {
  public readonly type = EWorkflows.GetPaymentMethod;
}

export class GetPaymentMethodSuccess implements Action {
  public readonly type = EWorkflows.GetPaymentMethodSuccess;
  public constructor(public payload: any) {}
}

export class PostPaymentMethod implements Action {
  public readonly type = EWorkflows.PostPaymentMethod;
  public constructor(public payload: any) {}
}

export class PostPaymentMethodSuccess implements Action {
  public readonly type = EWorkflows.PostPaymentMethodSuccess;
  public constructor(public payload: any) {}
}
export class DeleteWorkflow implements Action {
  public readonly type = EWorkflows.DeleteWorkflow;
  constructor(public payload: any) {}
}
export class DeleteWorkflowSuccess implements Action {
  public readonly type = EWorkflows.DeleteWorkflowSuccess;
  constructor(public payload: any) {}
}
export class AddWorkflow implements Action {
  public readonly type = EWorkflows.AddWorkflow;
  constructor(public payload: any) {}
}
export class AddWorkflowSuccess implements Action {
  public readonly type = EWorkflows.AddWorkflowSuccess;
  constructor(public payload: any) {}
}

export class EnableDisableWorkflow implements Action {
  public readonly type = EWorkflows.EnableDisableWorkflow;
  constructor(public payload: any) {}
}
export class EnableDisableWorkflowSuccess implements Action {
  public readonly type = EWorkflows.EnableDisableWorkflowSuccess;
  constructor(public payload: any) {}
}
export class MakeAsDefaultWorkflow implements Action {
  public readonly type = EWorkflows.MakeAsDefaultWorkflow;
  constructor(public payload: any) {}
}
export class MakeAsDefaultWorkflowsuccess implements Action {
  public readonly type = EWorkflows.MakeAsDefaultWorkflowsuccess;
  constructor(public payload: any) {}
}

export class ClearAddWorkflowSuccess implements Action {
  public readonly type = EWorkflows.ClearAddWorkflowSuccess;
}

export class GetReversalFields implements Action {
  public readonly type = EWorkflows.GetReversalFields;
  constructor() {}
}

export class GetReversalFieldsSuccess implements Action {
  public readonly type = EWorkflows.GetReversalFieldsSuccess;
  constructor(public payload: any) {}
}

export class IsValidWorkflowName implements Action {
  public readonly type = EWorkflows.IsValidWorkflowName;
  constructor(public payload: any) {}
}

export class IsValidWorkflowNameSuccess implements Action {
  public readonly type = EWorkflows.IsValidWorkflowNameSuccess;
  constructor(public payload: any) {}
}
export type WorkFlowsActions =
  | ClearState
  | DeleteWorkflowGroup
  | DeleteWorkflowGroupSuccess
  | AddLatestWorkflow
  | AddLatestWorkflowSuccess
  | GetSingleLatestWorkflow
  | GetSingleLatestWorkflowSuccess
  | GetWorkFlows
  | GetWorkFlowsSuccess
  | GetPaymentMethod
  | GetPaymentMethodSuccess
  | GetWorkFlowServices
  | GetWorkFlowServicesSuccess
  | GetWorkFlowServicesSuccess
  | ClearAddWorkflowSuccess
  | PostPaymentMethod
  | PostPaymentMethodSuccess
  | DeleteWorkflow
  | DeleteWorkflowSuccess
  | AddWorkflow
  | AddWorkflowSuccess
  | EnableDisableWorkflow
  | EnableDisableWorkflowSuccess
  | MakeAsDefaultWorkflow
  | GetLatestWorkFlows
  | GetLatestWorkFlowSuccess
  | GetLatestWorkFlowService
  | GetLatestWorkFlowServiceSuccess
  | MakeAsDefaultWorkflowsuccess
  | PublishLatestWorkflow
  | PublishLatestWorkflowSuccess
  | GetReversalFieldsSuccess
  | GetReversalFields
  | IsValidWorkflowNameSuccess
  | IsValidWorkflowName;
