import { ICountryState, initialCountryStatesState } from '../state/country-states.state';
import { CountryStatesAction, ECountryStateActions } from '../actions/country-states.action';

export function countryStatesReducers(
  state = initialCountryStatesState,
  action: CountryStatesAction,
): ICountryState {
  switch (action.type) {
    case ECountryStateActions.GetCountryStateSuccess: {
      return {
        ...state,
        countryStates: action.payload,
      };
    }

    case ECountryStateActions.ClearState: {
      return {
        ...state,
        countryStatesStatus: null,
      };
    }

    default:
      return state;
  }
}
