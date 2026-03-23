import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  ECountriesActions,
  GetCountries,
  GetCountriesSuccess,
  GetCountryList,
  GetCountryListSuccess,
  GetStateByCountry,
  GetStateByCountrySuccess,
} from '../actions/countries.actions';
import { CountriesService } from '../../services/countries.service';
import { AlertService } from '../../services/alert.service';
import { CountriesGetObject } from '@app/models/countries.interface';

@Injectable()
export class CountriesEffects {
  
  GetCountries$ = createEffect(() => this._actions$.pipe(
    ofType<GetCountries>(ECountriesActions.GetCountries),
    switchMap(payload => this._countriesService.getCountries(payload)),
    switchMap((countriesData: CountriesGetObject) => {
      return of(new GetCountriesSuccess(countriesData));
    }),
  ));
  
  GetCountryList$ = createEffect(() => this._actions$.pipe(
    ofType<GetCountryList>(ECountriesActions.GetCountryList),
    switchMap(() => this._countriesService.getCountryList()),
    switchMap((response: any) => {
      return of(new GetCountryListSuccess(response.data));
    }),
  ));
  
  GetStateByCountryList$ = createEffect(() => this._actions$.pipe(
    ofType<GetStateByCountry>(ECountriesActions.GetStateByCountry),
    switchMap(payload => this._countriesService.getStateList(payload)),
    switchMap((response: any) => {
      return of(new GetStateByCountrySuccess(response.data.countryStateList));
    }),
  ));

  constructor(
    private _countriesService: CountriesService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
