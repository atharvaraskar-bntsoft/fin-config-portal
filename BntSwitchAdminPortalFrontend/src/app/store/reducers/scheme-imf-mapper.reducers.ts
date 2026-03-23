import {
  initialSchemeImfMapperState,
  ISchemeImfMapperState,
} from '../state/scheme-imf-mapper.state';
import {
  SchemeImfMapperActions,
  ESchemeImfMapperActions,
} from '../actions/scheme-imf-mapper.action';

export function SchemeImfMapperReducers(
  state = initialSchemeImfMapperState,
  action: SchemeImfMapperActions,
): ISchemeImfMapperState {
  switch (action.type) {
    case ESchemeImfMapperActions.GetSchemeImfMapperSuccess: {
      return {
        ...state,
        schemeImfMapper: action.payload,
      };
    }
    case ESchemeImfMapperActions.GetSchemeSuccess: {
      return {
        ...state,
        schemeList: action.payload,
      };
    }
    case ESchemeImfMapperActions.GetFieldSuccess: {
      return {
        ...state,
        fieldList: action.payload,
      };
    }
    case ESchemeImfMapperActions.GetIMFSuccess: {
      return {
        ...state,
        imfList: action.payload,
      };
    }
    case ESchemeImfMapperActions.GetIPCSuccess: {
      return {
        ...state,
        ipcList: action.payload,
      };
    }
    case ESchemeImfMapperActions.GetMapSuccess: {
      return {
        ...state,
        mapList: action.payload,
      };
    }
    case ESchemeImfMapperActions.SchemeImfMapperSaveSuccess: {
      return {
        ...state,
        schemeImfMapperSave: action.payload,
      };
    }
    case ESchemeImfMapperActions.GetElFunctionSuccess: {
      return {
        ...state,
        elFunctionList: action.payload,
      };
    }
    case ESchemeImfMapperActions.GetServiceTypeSuccess: {
      return {
        ...state,
        serviceType: action.payload,
      };
    }
    case ESchemeImfMapperActions.GetInBuiltMapperSuccess: {
      return {
        ...state,
        builtMapper: action.payload,
      };
    }
    // case ESchemeImfMapperActions.GetIMFVersionSuccess: {
    //   return {
    //     ...state,
    //     imfVersionList: action.payload
    //   };
    // }
    case ESchemeImfMapperActions.ClearState: {
      return {
        ...state,
        schemeImfMapper: null,
        schemeList: null,
        fieldList: null,
        schemeImfMapperSave: null,
        elFunctionList: null,
        l1AdapterDeleteResponse: null,
        l1AdapterPostResponse: null,
      };
    }

    default:
      return state;
  }
}
