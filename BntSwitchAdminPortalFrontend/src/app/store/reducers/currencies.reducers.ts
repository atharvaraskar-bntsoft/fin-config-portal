import { ICurrencies, initialCurrenciesState } from '../state/currencies.state';
import { CurrenciesAction, ECurrenciesActions } from '../actions/currencies.action';

export function currenciesReducers(
  state = initialCurrenciesState,
  action: CurrenciesAction,
): ICurrencies {
  switch (action.type) {
    case ECurrenciesActions.GetCurrenciesSuccess: {
      return {
        ...state,
        currencies: action.payload,
      };
    }
    case ECurrenciesActions.ClearState: {
      return {
        ...state,
        currencies: null,
      };
    }

    default:
      return state;
  }
}
