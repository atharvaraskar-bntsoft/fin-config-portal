import { EImfJsonActions, ImfJsonActions } from './../actions/imf-json.action';
import { initialImfJsonState, IImfJsonState } from '../state/imf-json.state';

export function ImfJsonReducers(
  state = initialImfJsonState,
  action: ImfJsonActions,
): IImfJsonState {
  switch (action.type) {
    case EImfJsonActions.GetImfJsonSuccess: {
      return {
        ...state,
        getVersions: action.payload,
      };
    }
    case EImfJsonActions.CreateImfJsonSuccess: {
      return {
        ...state,
        postJson: action.payload,
      };
    }
    case EImfJsonActions.GetImfTypeListJsonSuccess: {
      return {
        ...state,
        typeList: action.payload.data,
      };
    }
    case EImfJsonActions.UpdateImfJsonSuccess: {
      return {
        ...state,
        putJson: action.payload,
      };
    }
    case EImfJsonActions.DeleteImfJsonSuccess: {
      return {
        ...state,
        response: action.payload,
      };
    }
    case EImfJsonActions.GetImfJsonViewSuccess: {
      return {
        ...state,
        getImf: action.payload,
      };
    }
    case EImfJsonActions.LatestImfJsonSuccess: {
      return {
        ...state,
        latestJson: action.payload,
      };
    }
    case EImfJsonActions.GetTemplateJsonSuccess: {
      return {
        ...state,
        getTemplateJson: action.payload,
      };
    }
    case EImfJsonActions.GetTemplateDetailsJsonSuccess: {
      return {
        ...state,
        getTemplateDetailsJson: action.payload,
      };
    }
    case EImfJsonActions.UserViewSuccess: {
      return {
        ...state,
        normalViewJson: action.payload,
      };
    }
    case EImfJsonActions.GetImfJsonByIdSuccess: {
      return {
        ...state,
        getImfById: action.payload,
      };
    }
    case EImfJsonActions.ClearState: {
      return {
        ...state,
        getImf: null,
        getImfById: null,
        getTemplateDetailsJson: null,
        getTemplateJson: null,
        getVersions: null,
        latestJson: null,
        normalViewJson: null,
        postJson: null,
        putJson: null,
      };
    }
    default:
      return state;
  }
}
