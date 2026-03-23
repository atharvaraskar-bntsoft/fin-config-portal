import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import {
  ECurrenciesActions,
  GetCurrencies,
  GetCurrenciesSuccess,
} from '../../store/actions/currencies.action';
import { CurrenciesService } from '../../services/currencies.service';
import { CurrencyGetObject } from '@app/models/currencies.interface';

@Injectable()
export class CurrenciesEffects {
  
  GetCurrencies$ = createEffect(() => this._actions$.pipe(
    ofType<GetCurrencies>(ECurrenciesActions.GetCurrencies),
    switchMap(payload => this._currenciesService.getCurrencies(payload)),
    switchMap((currenciesData: CurrencyGetObject) => {
      return of(new GetCurrenciesSuccess(currenciesData));
    }),
  ));

  constructor(
    private _currenciesService: CurrenciesService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
