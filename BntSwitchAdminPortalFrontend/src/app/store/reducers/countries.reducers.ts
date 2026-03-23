import { CountriesActions, ECountriesActions } from '../actions/countries.actions';
import { ICountriesState, initialCountriesState } from '../state/countries.state';

export function countriesReducers(
  state = initialCountriesState,
  action: CountriesActions,
): ICountriesState {
  switch (action.type) {
    case ECountriesActions.GetCountriesSuccess: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case ECountriesActions.GetCountryListSuccess: {
      return {
        ...state,
        countryListResponse: action.payload,
      };
    }
    case ECountriesActions.GetStateByCountrySuccess: {
      return {
        ...state,
        stateListResponse: action.payload,
      };
    }
    case ECountriesActions.ClearState: {
      return {
        ...state,
        countriesResponse: null,
        countriesStatus: null,
      };
    }
    default:
      return state;
  }
}
