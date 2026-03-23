import { Action } from '@ngrx/store';

export enum EDestinationRulesActions {
  ConfrimRule = '[ConfrimRule] Confrim Rule',
  ConfrimRuleSuccess = '[ConfrimRuleSuccess] Confrim Rule Success Rule Success',
  ConfrimRuleUpdateRule = '[ConfrimRuleUpdateRule] Confrim Rule Update Rule',
  ConfrimRuleUpdateRuleSuccess = '[ConfrimRuleUpdateRuleSuccess] Confrim Rule Update Rule Success',
  GetDestinationRules = '[DestinationRules] Get Destination Rules',
  GetDestinationRulesSuccess = '[DestinationRules] Get Destination Rules Success',
  GetDestination = '[Destination] Get Destination Rules',
  GetDestinationSuccess = '[DestinationRules] Get Destination Success',
  GetCondition = '[DestinationRulesCondition] Get Destination Conditions',
  GetConditionSuccess = '[DestinationRulesCondition] Get Destination Conditions Success',
  GetRuleType = '[DestinationRuleType] Get Destination Rule Types',
  GetRuleTypeSuccess = '[DestinationRuleType] Get Destination Rule Types Success',
  UpdRule = '[UpdRule] Update Rule',
  UpdRuleSuccess = '[UpdRuleSuccess] Update Rule Success',
  ClearDestinationRulesSuccess = '[Clear DestinationRules]',
}
export class GetDestinationRules implements Action {
  public readonly type = EDestinationRulesActions.GetDestinationRules;
  constructor(public payload: any) {}
}
export class GetDestinationRulesSuccess implements Action {
  public readonly type = EDestinationRulesActions.GetDestinationRulesSuccess;
  constructor(public payload: any) {}
}
export class GetDestination implements Action {
  public readonly type = EDestinationRulesActions.GetDestination;
  constructor(public payload?: any) {}
}
export class GetDestinationSuccess implements Action {
  public readonly type = EDestinationRulesActions.GetDestinationSuccess;
  constructor(public payload: any) {}
}
export class GetCondition implements Action {
  public readonly type = EDestinationRulesActions.GetCondition;
}
export class GetConditionSuccess implements Action {
  public readonly type = EDestinationRulesActions.GetConditionSuccess;
  constructor(public payload: any) {}
}
export class GetRuleType implements Action {
  public readonly type = EDestinationRulesActions.GetRuleType;
}
export class GetRuleTypeSuccess implements Action {
  public readonly type = EDestinationRulesActions.GetRuleTypeSuccess;
  constructor(public payload: any) {}
}

export class UpdRule implements Action {
  public readonly type = EDestinationRulesActions.UpdRule;
  constructor(public payload: any) {}
}
export class UpdRuleSuccess implements Action {
  public readonly type = EDestinationRulesActions.UpdRuleSuccess;
  constructor(public payload: any) {}
}

export class ConfrimRule implements Action {
  public readonly type = EDestinationRulesActions.ConfrimRule;
  constructor(public payload: any) {}
}
export class ConfrimRuleSuccess implements Action {
  public readonly type = EDestinationRulesActions.ConfrimRuleSuccess;
  constructor(public payload: any) {}
}

export class ConfrimRuleUpdateRule implements Action {
  public readonly type = EDestinationRulesActions.ConfrimRuleUpdateRule;
  constructor(public payload: any) {}
}
export class ConfrimRuleUpdateRuleSuccess implements Action {
  public readonly type = EDestinationRulesActions.ConfrimRuleUpdateRuleSuccess;
  constructor(public payload: any) {}
}

export class ClearDestinationRulesSuccess implements Action {
  public readonly type = EDestinationRulesActions.ClearDestinationRulesSuccess;
}
export type DestinationRulesActions =
  | GetDestinationRules
  | GetDestinationRulesSuccess
  | GetDestination
  | GetDestinationSuccess
  | GetCondition
  | GetConditionSuccess
  | GetRuleType
  | GetRuleTypeSuccess
  | UpdRuleSuccess
  | UpdRule
  | ConfrimRuleUpdateRuleSuccess
  | ConfrimRuleUpdateRule
  | ConfrimRuleSuccess
  | ConfrimRule
  | ClearDestinationRulesSuccess;
