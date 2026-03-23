import {
  EInstitutionActions,
  GetInstitutionDetailSuccess,
  InstitutionAction,
} from './../actions/institution.action';
import { initialInstitutionState, IInstitutionState } from '../state/institution.state';

export function InstitutionReducers(
  state = initialInstitutionState,
  action: InstitutionAction,
): IInstitutionState {
  switch (action.type) {
    case EInstitutionActions.GetInstitutionSuccess: {
      return {
        ...state,
        Institution: action.payload,
      };
    }
    case EInstitutionActions.GetInstitutionDetailSuccess: {
      return {
        ...state,
        InstitutionDetail: action.payload,
      };
    }

    case EInstitutionActions.GetInstitutionServiceSuccess: {
      return {
        ...state,
        InstitutionService: action.payload,
      };
    }
    case EInstitutionActions.GetCategoryCodeSuccess: {
      return {
        ...state,
        CategoryCode: action.payload,
      };
    }
    case EInstitutionActions.GetCurrencySuccess: {
      return {
        ...state,
        Currency: action.payload,
      };
    }
    case EInstitutionActions.GetInstitutionAdditionalServiceSuccess: {
      return {
        ...state,
        InstitutionAdditionalService: action.payload,
      };
    }
    case EInstitutionActions.GetCountryListSuccess: {
      return {
        ...state,
        countryList: action.payload,
      };
    }
    case EInstitutionActions.GetStateListSuccess: {
      return {
        ...state,
        stateList: action.payload,
      };
    }
    case EInstitutionActions.GetInstitutionGroupListSuccess: {
      return {
        ...state,
        institutionGroupList: action.payload,
      };
    }
    case EInstitutionActions.GetInstitutionRowDataSuccess: {
      return {
        ...state,
        institutionRowData: action.payload,
      };
    }
    case EInstitutionActions.ClearState: {
      return {
        ...state,
        Institution: null,
        InstitutionDetail: null,
        InstitutionService: null,
        institutionResponse: null,
        institutionRowData: null,
      };
    }
    default:
      return state;
  }
}
