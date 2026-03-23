import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  ETransactionLogActions,
  GetTransactionLogs,
  GetTransactionLogsSuccess,
  GetJson,
  GetJsonSuccess,
  GetRequestMatrix,
  GetRequestMatrixSuccess,
  GetResponseMatrix,
  GetResponseMatrixSuccess,
  GetTransactionById,
  GetTransactionByIdSuccess,
  PostTransactionLogReview,
  PostTransactionLogReviewSuccess,
} from '../actions/transaction-log.action';

import { TransactionLogService } from '../../services/transaction-log.service';
import { AlertService } from '@app/services/alert.service';
import { TransactionLogGetObject } from '@app/models/transaction-log.interface';

@Injectable()
export class TransactionLogEffects {
  
  GetTransactionLogs$ = createEffect(() => this._actions$.pipe(
    ofType<GetTransactionLogs>(ETransactionLogActions.GetTransactionLogs),
    switchMap(payload => this._transactionLogService.getLogs(payload)),
    switchMap((data: TransactionLogGetObject) => {
      return of(new GetTransactionLogsSuccess(data));
    }),
  ));
  
  GetJson$ = createEffect(() => this._actions$.pipe(
    ofType<GetJson>(ETransactionLogActions.GetJson),
    switchMap(payload => this._transactionLogService.getJson(payload)),
    switchMap((data: any) => {
      return of(new GetJsonSuccess(data.data));
    }),
  ));
  
  GetRequestMatrix$ = createEffect(() => this._actions$.pipe(
    ofType<GetRequestMatrix>(ETransactionLogActions.GetRequestMatrix),
    switchMap(payload => this._transactionLogService.getRequestMatrix(payload)),
    switchMap((data: any) => {
      return of(new GetRequestMatrixSuccess(data.data));
    }),
  ));
  
  GetResponseMatrix$ = createEffect(() => this._actions$.pipe(
    ofType<GetResponseMatrix>(ETransactionLogActions.GetResponseMatrix),
    switchMap(payload => this._transactionLogService.getResponseMatrix(payload)),
    switchMap((data: any) => {
      return of(new GetResponseMatrixSuccess(data.data));
    }),
  ));
  
  GetTransactionById$ = createEffect(() => this._actions$.pipe(
    ofType<GetTransactionById>(ETransactionLogActions.GetTransactionById),
    switchMap(payload => this._transactionLogService.getTransactionLogsById(payload)),
    switchMap((data: any) => {
      return of(new GetTransactionByIdSuccess(data.data));
    }),
  ));
  
  PostTransactionLogReview$ = createEffect(() => this._actions$.pipe(
    ofType<PostTransactionLogReview>(ETransactionLogActions.PostTransactionLogReview),
    switchMap(payload => this._transactionLogService.postTransactionLogReview(payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new PostTransactionLogReviewSuccess(data));
    }),
  ));

  constructor(
    private _transactionLogService: TransactionLogService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
