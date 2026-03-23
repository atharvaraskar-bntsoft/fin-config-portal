import { EVelocityLimitsActions, VelocityLimitsActions } from './../actions/velocity-limits.action';
import { initialVelocityLimitsState } from '../state/velocity-limits.state';

export function VelocityLimitsReducers(
  state = initialVelocityLimitsState,
  action: VelocityLimitsActions,
): any {
  switch (action.type) {
    case EVelocityLimitsActions.GetVelocityLimitsSuccess: {
      return {
        ...state,
        Velocitylimits: action.payload,
      };
    }
    case EVelocityLimitsActions.GetVelocityLimitsEditTransactionSuccess: {
      return {
        ...state,
        Velocitylimitsedittransaction: action.payload,
      };
    }
    case EVelocityLimitsActions.GetVelocityLimitsEditCurrencySuccess: {
      return {
        ...state,
        Velocitylimitseditcurrency: action.payload,
      };
    }
    case EVelocityLimitsActions.GetVelocityLimitsEditRowSuccess: {
      return {
        ...state,
        Velocitylimitseditrow: action.payload,
      };
    }
    case EVelocityLimitsActions.GetVelocityLimitsEditInstitutionSuccess: {
      return {
        ...state,
        Velocitylimitseditinstitution: action.payload,
      };
    }
    case EVelocityLimitsActions.DeleteVelocityLimitsSuccess: {
      return {
        ...state,
        Velocitylimitsdelete: action.payload,
      };
    }
    case EVelocityLimitsActions.UpdateVelocityLimitsSuccess: {
      return {
        ...state,
        velocityLimitsResponseSuccess: action.payload,
      };
    }
    case EVelocityLimitsActions.CreateVelocityLimitsSuccess: {
      return {
        ...state,
        velocityLimitsResponseSuccess: action.payload,
      };
    }
    case EVelocityLimitsActions.ClearState: {
      return {
        ...state,
        Velocitylimits: null,
        Velocitylimitsdelete: null,
        Velocitylimitseditcurrency: null,
        Velocitylimitseditinstitution: null,
        Velocitylimitseditrow: null,
        Velocitylimitsedittransaction: null,
        velocityLimitsResponseSuccess: null,
      };
    }
    default:
      return state;
  }
}
