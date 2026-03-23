import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';

import {
  EHistoryActions,
  GetHistory,
  GetHistorySuccess,
  GetByIdHistory,
  GetByIdHistorySuccess,
} from '../actions/history.action';
import { HistoryService } from '@app/services/history.service';

@Injectable()
export class HistorysEffects {
  
  GetHistorys$ = createEffect(() => this._actions$.pipe(
    ofType<GetHistory>(EHistoryActions.GetHistory),
    switchMap(payload => this._HistoryService.getHistoryUrl(payload)),
    switchMap((response: any) => {
      return of(new GetHistorySuccess(response));
    }),
  ));

  
  GetByIdHistory$ = createEffect(() => this._actions$.pipe(
    ofType<GetByIdHistory>(EHistoryActions.GetByIdHistory),
    switchMap(data => this._HistoryService.getByIdHistoryUrl(data.payload)),
    switchMap((response: any) => {
      return of(new GetByIdHistorySuccess(response));
    }),
  ));
  constructor(
    private _HistoryService: HistoryService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
