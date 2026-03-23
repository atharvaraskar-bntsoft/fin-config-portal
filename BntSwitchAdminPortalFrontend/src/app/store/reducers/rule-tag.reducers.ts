import { initialIRuleTagState, IRuleTagState } from '../state/rule-tag.state';
import { ERuleTagActions, RuleTagActions } from '../actions/rule-tag.action';

export function RuleTagcReducers(
  state = initialIRuleTagState,
  action: RuleTagActions,
): IRuleTagState {
  switch (action.type) {
    case ERuleTagActions.GetRuleTagSuccess: {
      return {
        ...state,
        ruleTag: action.payload,
      };
    }
    case ERuleTagActions.GetRuleTagByIdSuccess: {
      return {
        ...state,
        ruleTagGetById: action.payload,
      };
    }
    case ERuleTagActions.DeleteRuleTagSuccess: {
      return {
        ...state,
        ruleTagDeleteResponse: action.payload,
      };
    }
    case ERuleTagActions.PostRuleTagSuccess: {
      return {
        ...state,
        ruleTagPostResponse: action.payload,
      };
    }

    case ERuleTagActions.UpdateRuleTagSuccess: {
      return {
        ...state,
        ruleTagPutResponse: action.payload,
      };
    }
    case ERuleTagActions.GetTagsSuccess: {
      return {
        ...state,
        tags: action.payload,
      };
    }
    case ERuleTagActions.GetConditionsSuccess: {
      return {
        ...state,
        conditions: action.payload,
      };
    }

    case ERuleTagActions.GetOperatorTypeListSuccess: {
      return {
        ...state,
        operator: action.payload,
      };
    }

    case ERuleTagActions.GetImfMessageListSuccess: {
      return {
        ...state,
        imfList: action.payload,
      };
    }

    case ERuleTagActions.GetNewTagSuccess: {
      return {
        ...state,
        newRuleTags: action.payload,
      };
    }
    case ERuleTagActions.CreateTagsSuccess: {
      return {
        ...state,
        createTag: action.payload,
      };
    }

    case ERuleTagActions.EditTagsSuccess: {
      return {
        ...state,
        editTag: action.payload,
      };
    }
    case ERuleTagActions.UpdateTagsSuccess: {
      return {
        ...state,
        updateTag: action.payload,
      };
    }
    case ERuleTagActions.ClearState: {
      return {
        ...state,
        conditions: null,
        ruleTag: null,
        ruleTagDeleteResponse: null,
        ruleTagGetById: null,
        ruleTagPostResponse: null,
        ruleTagPutResponse: null,
        tags: null,
        imfList: null,
        createTag: null,
        updateTag: null,
        editTag: null,
      };
    }
    default:
      return state;
  }
}
