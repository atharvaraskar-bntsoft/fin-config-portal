import { CurrencyGetObject } from '@app/models/currencies.interface';

export interface ICurrencies {
  currencies: CurrencyGetObject;
}

export const initialCurrenciesState: ICurrencies = {
  currencies: null,
};
