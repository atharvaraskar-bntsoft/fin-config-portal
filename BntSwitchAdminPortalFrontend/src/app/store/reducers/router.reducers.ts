import { initialWorkflowsState, IWorkflowsState } from '../state/workflows.state';
import { initialRouterState, IRouterState } from '../state/router.state';
import { RouterActions, ERoutersAction } from '../actions/router.actions';

export function RouterReducers(state = initialRouterState, action: RouterActions): IRouterState {
  switch (action.type) {
    case ERoutersAction.GetRutersSucess: {
      return {
        ...state,
        routerList: action.payload,
      };
    }
    case ERoutersAction.GetServiceTypeSucess: {
      return {
        ...state,
        serviceTypeList: action.payload,
      };
    }
    case ERoutersAction.GetRuleSucess: {
      return {
        ...state,
        ruleList: action.payload,
      };
    }
    case ERoutersAction.SaveRuleSucess: {
      return {
        ...state,
        routerResponse: action.payload,
      };
    }
    case ERoutersAction.GetRuleByIdSuccess: {
      return {
        ...state,
        getById: action.payload,
      };
    }
    case ERoutersAction.UpdateRuleSucess: {
      return {
        ...state,
        updatbyId: action.payload,
      };
    }
    case ERoutersAction.CommitRuleSucess: {
      return {
        ...state,
        routerResponse: action.payload,
      };
    }

    case ERoutersAction.DeleteRouteByIdSuccess: {
      return {
        ...state,
        routerResponse: action.payload,
      };
    }
    case ERoutersAction.UpdRouterSuccess: {
      return {
        ...state,
        updRouter: action.payload,
      };
    }
    case ERoutersAction.AddRuleListSucess: {
      return {
        ...state,
        routerResponse: action.payload,
      };
    }
    case ERoutersAction.GetRuleConditionSucess: {
      return {
        ...state,
        ruleConditionList: action.payload,
      };
    }

    case ERoutersAction.ClearCommitRuleSucess: {
      return {
        ...state,
        getById: null,
        routerList: null,
        routerResponse: null,
        updRouter: null,
      };
    }
    default:
      return state;
  }
}
