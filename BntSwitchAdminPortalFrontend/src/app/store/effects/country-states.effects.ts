import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import {
  ECountryStateActions,
  GetCountryState,
  GetCountryStateSuccess,
} from '../../store/actions/country-states.action';
import { CountryStatesService } from '../../services/country-states.service';
import { CountryStateGetObject } from '@app/models/country-states.interface';

@Injectable()
export class CountryStatesEffects {
  
  GetCountryState$ = createEffect(() => this._actions$.pipe(
    ofType<GetCountryState>(ECountryStateActions.GetCountryState),
    switchMap(payload => this._countryStatesService.getCountryStates(payload)),
    switchMap((countryStateData: CountryStateGetObject) => {
      return of(new GetCountryStateSuccess(countryStateData));
    }),
  ));

  constructor(
    private _countryStatesService: CountryStatesService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
