import { Action } from '@ngrx/store';

export enum ERuleEngineActions {
  GetRuleItem = '[RuleItem] Get Rule Item',
  getRuleItemSuccess = '[RuleItem] Get Rule Item Success',
  PostRule = '[PostRule] Post Rule',
  postRuleSuccess = '[PostRule] Success',
  PutRule = '[PutRule] Put Rule',
  ClearState = '[Institution] Clear state',
  PutRuleSuccess = '[PutRule] Success',
  GetRuleCondition = '[RuleItem] Get Rule Condition',
  getRuleConditionSuccess = '[RuleItem] Get Rule Condition Success',
}
export class GetRuleItem implements Action {
  public readonly type = ERuleEngineActions.GetRuleItem;
  constructor(public payload?: any) {}
}
export class GetRuleItemSuccess implements Action {
  public readonly type = ERuleEngineActions.getRuleItemSuccess;
  constructor(public payload: any) {}
}

export class GetRuleCondition implements Action {
  public readonly type = ERuleEngineActions.GetRuleCondition;
  constructor(public payload?: any) {}
}
export class GetRuleConditionSuccess implements Action {
  public readonly type = ERuleEngineActions.getRuleConditionSuccess;
  constructor(public payload: any) {}
}

export class PostRule implements Action {
  public readonly type = ERuleEngineActions.PostRule;
  constructor(public payload: any) {}
}
export class PostRuleSuccess implements Action {
  public readonly type = ERuleEngineActions.postRuleSuccess;
  constructor(public payload: any) {}
}
export class PutRule implements Action {
  public readonly type = ERuleEngineActions.PutRule;
  constructor(public payload: any) {}
}
export class PutRuleSuccess implements Action {
  public readonly type = ERuleEngineActions.PutRuleSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = ERuleEngineActions.ClearState;
}
export type RuleEngineActions =
  | GetRuleItem
  | GetRuleItemSuccess
  | PostRule
  | PostRuleSuccess
  | PutRule
  | ClearState
  | PutRuleSuccess
  | GetRuleCondition
  | GetRuleConditionSuccess;
