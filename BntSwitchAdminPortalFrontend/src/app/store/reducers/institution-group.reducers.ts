import {
  EInstitutionGroupActions,
  InstitutiongoupActions,
} from './../actions/institution-group.action';
import {
  initialInstitutionGroupState,
  IInstitutionGroupState,
} from '../state/institution-group.state';

export function InstitutionGroupReducers(
  state = initialInstitutionGroupState,
  action: InstitutiongoupActions,
): IInstitutionGroupState {
  switch (action.type) {
    case EInstitutionGroupActions.GetInstitutionGroupsSuccess: {
      return {
        ...state,
        institutionGroups: action.payload,
      };
    }

    case EInstitutionGroupActions.GetInstitutionGroupListSuccess: {
      return {
        ...state,
        institutionList: action.payload,
      };
    }

    case EInstitutionGroupActions.GetRowDataInstitutionGroupSuccess: {
      return {
        ...state,
        institutionGroupResponse: action.payload,
      };
    }
    case EInstitutionGroupActions.ClearState: {
      return {
        ...state,
        institutionGroupResponse: null,
        institutionGroupResponseSucess: null,
      };
    }
    default:
      return state;
  }
}

export function InstitutionGroupDetailsReducers(
  state = initialInstitutionGroupState,
  action: InstitutiongoupActions,
): IInstitutionGroupState {
  switch (action.type) {
    case EInstitutionGroupActions.GetInstitutionGroupDetailsSuccess: {
      return {
        ...state,
        institutionGroupDetails: action.payload,
      };
    }
    case EInstitutionGroupActions.ClearState: {
      return {
        ...state,
        institutionGroupDetails: null,
      };
    }
    default:
      return state;
  }
}
