import { EL1AdapterActions, L1AdapterActions } from '../actions/l1-adapter.action';
import { IL1AdapterState, initialIL1AdapterState } from '../state/l1-adapter.state';

export function L1AdapterReducers(
  state = initialIL1AdapterState,
  action: L1AdapterActions,
): IL1AdapterState {
  switch (action.type) {
    case EL1AdapterActions.GetL1AdapterSuccess: {
      return {
        ...state,
        l1AdapterData: action.payload,
      };
    }
    case EL1AdapterActions.DownloadTempleDataSuccess: {
      return {
        ...state,
        download: action.payload,
      };
    }
    case EL1AdapterActions.DownloadTempleByIDSuccess: {
      return {
        ...state,
        downloadByID: action.payload,
      };
    }

    case EL1AdapterActions.UploadTemplateSuccess: {
      return {
        ...state,
        upload: action.payload,
      };
    }

    case EL1AdapterActions.DeleteL1AdapterSuccess: {
      return {
        ...state,
        l1AdapterDeleteResponse: action.payload,
      };
    }

     case EL1AdapterActions.DraftTransformSuccess: {
      return {
        ...state,
        saveDraft: action.payload,
      };
    }

    case EL1AdapterActions.PostL1AdapterSuccess: {
      return {
        ...state,
        l1AdapterPostResponse: action.payload,
      };
    }
    case EL1AdapterActions.UpdateL1AdapterSuccess: {
      return {
        ...state,
        l1AdapterPostResponse: action.payload,
      };
    }
    case EL1AdapterActions.GetTemplatesSuccess: {
      return {
        ...state,
        templateList: action.payload,
      };
    }
    case EL1AdapterActions.GetFormatSuccess: {
      return {
        ...state,
        formatList: action.payload,
      };
    }
    case EL1AdapterActions.GetSchemaSuccess: {
      return {
        ...state,
        schemaList: action.payload,
      };
    }
    case EL1AdapterActions.GetL1AdapterByIdSuccess: {
      return {
        ...state,
        l1AdapterGetById: action.payload,
      };
    }
    case EL1AdapterActions.GetL1AdapterEntityMappingSuccess: {
      return {
        ...state,
        l1AdapterEntityMappingList: action.payload,
      };
    }
    case EL1AdapterActions.GetL1AdapterEntityIMFSuccess: {
      return {
        ...state,
        l1AdapterEntityIMFList: action.payload,
      };
    }
    case EL1AdapterActions.GetL1AdapterTransactionTypeSuccess: {
      return {
        ...state,
        l1AdapterTransactionType: action.payload,
      };
    }
    case EL1AdapterActions.GetL1AdapterRuleListSuccess: {
      return {
        ...state,
        l1AdapterRuleList: action.payload,
      };
    }
    case EL1AdapterActions.PostL1AdapterSuccess: {
      return {
        ...state,
        l1AdapterPostResponse: action.payload,
      };
    }
    case EL1AdapterActions.UpdateL1AdapterSuccess: {
      return {
        ...state,
        l1AdapterPostResponse: action.payload,
      };
    }
    case EL1AdapterActions.GetTemplatesSuccess: {
      return {
        ...state,
        templateList: action.payload,
      };
    }
    case EL1AdapterActions.GetFormatSuccess: {
      return {
        ...state,
        formatList: action.payload,
      };
    }
    case EL1AdapterActions.GetSchemaSuccess: {
      return {
        ...state,
        schemaList: action.payload,
      };
    }
    case EL1AdapterActions.GetNetworkSuccess: {
      return {
        ...state,
        networkList: action.payload,
      };
    }
    case EL1AdapterActions.DraftSchemaSuccess: {
      return {
        ...state,
        schemaDraft: action.payload,
      };
    }
    case EL1AdapterActions.GetAdapterByIdSuccess: {
      return {
        ...state,
        adapterById: action.payload,
      };
    }
    case EL1AdapterActions.GetMenuSuccess: {
      return {
        ...state,
        menu: action.payload,
      };
    }
    case EL1AdapterActions.GetSchemeImfMapperSuccess: {
      return {
        ...state,
        SchemeImfMapper: action.payload,
      };
    }
    case EL1AdapterActions.GetAdapterDataMapSuccess: {
      return {
        ...state,
        AdapterDataMap: action.payload,
      };
    }
    case EL1AdapterActions.GetAdapterDataMapSuccess: {
      return {
        ...state,
        AdapterDataMap: action.payload,
      };
    }
    case EL1AdapterActions.VersionDataSuccess: {
      return {
        ...state,
        versionData: action.payload,
      };
    }
    case EL1AdapterActions.GetInternalCodeSuccess: {
      return {
        ...state,
        internalCode: action.payload,
      };
    }
    case EL1AdapterActions.DeleteRowSuccess: {
      return {
        ...state,
        DeleteRow: action.payload,
      };
    }
    case EL1AdapterActions.GetLookUpListSuccess: {
      return {
        ...state,
        lookuplist: action.payload,
      };
    }
    case EL1AdapterActions.GetMessageContextListSuccess: {
      return {
        ...state,
        MessageContextList: action.payload,
      };
    }

    case EL1AdapterActions.GetNameValidationSuccess: {
      return {
        ...state,
        getNameValidation: action.payload,
      };
    }

    case EL1AdapterActions.GetPaymentMethodSuccess: {
      return {
        ...state,
        getPaymentlist: action.payload,
      };
    }
    case EL1AdapterActions.GetPostActionMethodSuccess: {
      return {
        ...state,
        postAction: action.payload,
      };
    }
    case EL1AdapterActions.GetPreActionMethodSuccess: {
        return {
          ...state,
          preAction: action.payload,
        };
      }
    case EL1AdapterActions.GetStepListMethodSuccess: {
      return {
        ...state,
        stepList: action.payload,
      };
    }
    case EL1AdapterActions.ClearState: {
      return {
        ...state,
        l1AdapterData: null,
        formatList: null,
        internalCode: null,
        l1Adapter: null,
        l1AdapterDeleteResponse: null,
        l1AdapterGetById: null,
        l1AdapterPostResponse: null,
        networkList: null,
        schemaDraft: null,
        schemaList: null,
        templateList: null,
        versionData: null,
        l1AdapterEntityMappingList: null,
        l1AdapterEntityIMFList: null,
        l1AdapterTransactionType: null,
        l1AdapterRuleList: null,
        adapterById: null,
        SchemeImfMapper: null,
        AdapterDataMap: null,
        MessageContextList: null,
        getNameValidation: null,
        getPaymentlist: null,
        upload: null,
        postAction: null,
        preAction:null,
        stepList: null,
        saveDraft: null
      };
    }

    default:
      return state;
  }
}
