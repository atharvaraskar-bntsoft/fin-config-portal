import {
  initialDestinationRulesState,
  IDestinationRulesState,
} from '../state/destination-rules.state';
import {
  EDestinationRulesActions,
  DestinationRulesActions,
} from '../actions/destination-rules.action';

export function DestinationRulesReducers(
  state = initialDestinationRulesState,
  action: DestinationRulesActions,
): IDestinationRulesState {
  switch (action.type) {
    case EDestinationRulesActions.GetDestinationSuccess: {
      return {
        ...state,
        destination: action.payload,
      };
    }
    case EDestinationRulesActions.GetDestinationRulesSuccess: {
      return {
        ...state,
        destinationRules: action.payload,
      };
    }
    case EDestinationRulesActions.GetConditionSuccess: {
      return {
        ...state,
        destinationRules: action.payload,
      };
    }
    case EDestinationRulesActions.GetRuleTypeSuccess: {
      return {
        ...state,
        destinationRules: action.payload,
      };
    }

    case EDestinationRulesActions.UpdRuleSuccess: {
      return {
        ...state,
        updRule: action.payload,
      };
    }
    case EDestinationRulesActions.ConfrimRuleUpdateRuleSuccess: {
      return {
        ...state,
        confrimUpdateRuleResponse: action.payload,
      };
    }
    case EDestinationRulesActions.ConfrimRuleSuccess: {
      return {
        ...state,
        confrimRuleResponse: action.payload,
      };
    }
    case EDestinationRulesActions.ClearDestinationRulesSuccess: {
      return {
        ...state,
        confrimRuleResponse: null,
        destinationRules: null,
        updRule: null,
      };
    }
    default:
      return state;
  }
}
