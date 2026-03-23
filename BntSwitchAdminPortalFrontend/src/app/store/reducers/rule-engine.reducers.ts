import { initialRuleEngine, IRuleEngineState } from '../state/rule-engine.state';
import { RuleEngineActions, ERuleEngineActions } from '../actions/rule-engine.actions';

export function RuleEngineReducers(
  state = initialRuleEngine,
  action: RuleEngineActions,
): IRuleEngineState {
  switch (action.type) {
    case ERuleEngineActions.getRuleItemSuccess: {
      return {
        ...state,
        getRuleItem: action.payload,
      };
    }
    case ERuleEngineActions.postRuleSuccess: {
      return {
        ...state,
        postRule: action.payload,
      };
    }
    case ERuleEngineActions.ClearState: {
      return {
        ...state,
        getRuleItem: null,
        postRule: null,
        putRule: null,
      };
    }
    case ERuleEngineActions.PutRuleSuccess: {
      return {
        ...state,
        putRule: action.payload,
      };
    }
    case ERuleEngineActions.getRuleConditionSuccess: {
      return {
        ...state,
        getRuleCondition: action.payload,
      };
    }
    case ERuleEngineActions.GetRuleItem: {
      return {
        ...state,
        getRuleItem: null,
      };
    }
    default:
      return state;
  }
}
