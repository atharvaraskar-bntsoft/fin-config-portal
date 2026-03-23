import { Action } from '@ngrx/store';

export enum ERoutersAction {
  ClearState = '[Router] Clear State',
  ClearCommitRuleSucess = '[ClearCommitRuleSucess] Clear State',
  GetRuters = '[GetRuters] Get  RouterList',
  GetRutersSucess = '[GetRutersSucess] Get  RutersSucess',
  GetServiceType = '[GetServiceType] Get  ServiceType',
  GetServiceTypeSucess = '[GetServiceTypeSucess] Get  ServiceTypeSucess',
  GetRuleList = '[GetRuleList] Get  RouterList',
  GetRuleSucess = '[GetRuleSucess] Get  RuleList Sucess',
  SaveRuleList = '[SaveRuleList] Get  RouterList',
  SaveRuleSucess = '[SaveRuleSucess] Get  RuleList Sucess',
  UpdateRuleList = '[UpdateRuleList] Update RouterList',
  UpdateRuleSucess = '[UpdateRuleSucess] Update RuleList Sucess',
  GetRuleById = '[GetRuleById] GetRuleById RuleList Sucess',
  GetRuleByIdSuccess = '[GetRuleByIdSuccess] GetRuleByIdSuccess RuleList Sucess',
  CommitRuleList = '[CommitRuleList] Get  RouterList',
  CommitRuleSucess = '[CommitRuleSucess] Get  RuleList Sucess',
  DeleteRouteByIdSuccess = '[DeleteRouteByIdSuccess] Delete route Success',
  DeleteRouteById = '[DeleteRouteById] Delete route ',
  UpdRouter = '[UpdRoute] Update Router',
  UpdRouterSuccess = '[UpdRouterSuccess] Update Router Success',
  AddRuleList = '[AddRuleList] Add RuleList',
  AddRuleListSucess = '[AddRuleListSucess] Add  RuleList Sucess',
  GetRuleCondition = '[GetRuleCondition] Get  Rule Condition',
  GetRuleConditionSucess = '[GetRuleConditionSucess] Get  Rule Condition Sucess',
}

export class ClearState implements Action {
  public readonly type = ERoutersAction.ClearState;
}

export class GetRuters implements Action {
  public readonly type = ERoutersAction.GetRuters;
  constructor(public payload?: any) {}
}
export class GetRutersSucess implements Action {
  public readonly type = ERoutersAction.GetRutersSucess;
  constructor(public payload: any) {}
}

export class GetServiceType implements Action {
  public readonly type = ERoutersAction.GetServiceType;
  constructor(public payload: any) {}
}

export class GetServiceTypeSucess implements Action {
  public readonly type = ERoutersAction.GetServiceTypeSucess;
  constructor(public payload: any) {}
}

export class GetRuleList implements Action {
  public readonly type = ERoutersAction.GetRuleList;
  constructor(public payload: any) {}
}

export class SaveRuleList implements Action {
  public readonly type = ERoutersAction.SaveRuleList;
  constructor(public payload: any) {}
}

export class GetRuleSucess implements Action {
  public readonly type = ERoutersAction.GetRuleSucess;
  constructor(public payload: any) {}
}
export class SaveRuleSucess implements Action {
  public readonly type = ERoutersAction.SaveRuleSucess;
  constructor(public payload: any) {}
}

export class UpdateRuleList implements Action {
  public readonly type = ERoutersAction.UpdateRuleList;
  constructor(public payload: any) {}
}

export class UpdateRuleSucess implements Action {
  public readonly type = ERoutersAction.UpdateRuleSucess;
  constructor(public payload: any) {}
}

export class GetRuleById implements Action {
  public readonly type = ERoutersAction.GetRuleById;
  constructor(public payload: any) {}
}

export class GetRuleByIdSuccess implements Action {
  public readonly type = ERoutersAction.GetRuleByIdSuccess;
  constructor(public payload: any) {}
}

export class CommitRuleList implements Action {
  public readonly type = ERoutersAction.CommitRuleList;
  constructor(public payload: any) {}
}

export class CommitRuleSucess implements Action {
  public readonly type = ERoutersAction.CommitRuleSucess;
  constructor(public payload: any) {}
}
export class DeleteRouteById implements Action {
  public readonly type = ERoutersAction.DeleteRouteById;
  constructor(public payload: any) {}
}

export class DeleteRouteByIdSuccess implements Action {
  public readonly type = ERoutersAction.DeleteRouteByIdSuccess;
  constructor(public payload: any) {}
}
export class UpdRouter implements Action {
  public readonly type = ERoutersAction.UpdRouter;
  constructor(public payload: any) {}
}

export class UpdRouterSuccess implements Action {
  public readonly type = ERoutersAction.UpdRouterSuccess;
  constructor(public payload: any) {}
}
export class AddRuleList implements Action {
  public readonly type = ERoutersAction.AddRuleList;
  constructor(public payload: any) {}
}
export class AddRuleListSucess implements Action {
  public readonly type = ERoutersAction.AddRuleListSucess;
  constructor(public payload: any) {}
}
export class GetRuleCondition implements Action {
  public readonly type = ERoutersAction.GetRuleCondition;
  constructor(public payload?: any) {}
}
export class GetRuleConditionSucess implements Action {
  public readonly type = ERoutersAction.GetRuleConditionSucess;
  constructor(public payload?: any) {}
}
export class ClearCommitRuleSucess implements Action {
  public readonly type = ERoutersAction.ClearCommitRuleSucess;
}
export type RouterActions =
  | SaveRuleSucess
  | SaveRuleList
  | ClearState
  | GetRuters
  | GetRutersSucess
  | GetServiceType
  | GetServiceTypeSucess
  | GetRuleList
  | GetRuleSucess
  | UpdateRuleList
  | UpdateRuleSucess
  | GetRuleById
  | GetRuleByIdSuccess
  | CommitRuleList
  | CommitRuleSucess
  | DeleteRouteByIdSuccess
  | DeleteRouteById
  | UpdRouter
  | UpdRouterSuccess
  | AddRuleList
  | AddRuleListSucess
  | ClearCommitRuleSucess
  | GetRuleCondition
  | GetRuleConditionSucess;
