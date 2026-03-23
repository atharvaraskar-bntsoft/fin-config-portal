import {
  DeleteMultiple,
  DeleteMultipleSuccess,
  DeleteSAFQueue,
  DeleteSAFQueueSuccess,
  GetException,
  GetExceptionSuccess,
  GetSAFQueueDDL,
  GetSAFQueueDDLSuccess,
  GetSAFQueueSuccess,
  MoveToSAFQueue,
  MoveToSAFQueueSuccess,
  GetSAFProcessorList,
  GetSAFProcessorListSuccess,
} from './../actions/invalid-log.action';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  EInvalidLogActions,
  GetInvalidLogs,
  GetInvalidLogsSuccess,
} from '../actions/invalid-log.action';

import { InvalidLogService } from '@app/services/invalid-log.service';
import { AlertService } from '@app/services/alert.service';

/*
  This Effect will  work for the below screens:
  1. SAF Screen
  2. Exceptional Screen and
  3. Invalid Logs
*/
@Injectable()
export class InvalidLogsLogEffects {
  
  GetInvalidLogs$ = createEffect(() => this._actions$.pipe(
    ofType<GetInvalidLogs>(EInvalidLogActions.GetInvalidLogs),
    switchMap(payload => this._invalidtLogService.getInvalidLogs(payload)),
    switchMap((data: any) => {
      return of(new GetInvalidLogsSuccess(data.data));
    }),
  ));

  
  GetSAFQueue$ = createEffect(() => this._actions$.pipe(
    ofType<GetInvalidLogs>(EInvalidLogActions.GetSAFQueue),
    switchMap(payload => this._invalidtLogService.getSAFQueue(payload.payload)),
    switchMap((data: any) => {
      return of(new GetSAFQueueSuccess(data.data));
    }),
  ));

  
  MoveToExceptionalQueue$ = createEffect(() => this._actions$.pipe(
    ofType<MoveToSAFQueue>(EInvalidLogActions.MoveToSAFQueue),
    switchMap(action => this._invalidtLogService.moveToSafQueue(action.payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new MoveToSAFQueueSuccess(data));
    }),
  ));

  
  DeleteMultiple$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteMultiple>(EInvalidLogActions.DeleteMultiple),
    switchMap(data => this._invalidtLogService.deleteMultiple(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DeleteMultipleSuccess(response));
    }),
  ));

  
  DeleteExceptionalQueue$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteSAFQueue>(EInvalidLogActions.DeleteSAFQueue),
    switchMap(action => this._invalidtLogService.deleteExceptionalQueue(action.payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new DeleteSAFQueueSuccess(data));
    }),
  ));

  
  GetExceptionQueue$ = createEffect(() => this._actions$.pipe(
    ofType<GetException>(EInvalidLogActions.GetException),
    switchMap(action => this._invalidtLogService.getExceptionQueueList(action.payload)),
    switchMap((data: any) => {
      return of(new GetExceptionSuccess(data.data));
    }),
  ));

  
  GetSFADDL$ = createEffect(() => this._actions$.pipe(
    ofType<GetSAFQueueDDL>(EInvalidLogActions.GetSAFQueueDDL),
    switchMap(_ => this._invalidtLogService.getSafStatusDDL()),
    switchMap((data: any) => {
      return of(new GetSAFQueueDDLSuccess(data));
    }),
  ));

  
  GetSAFProcessorList$ = createEffect(() => this._actions$.pipe(
    ofType<GetSAFProcessorList>(EInvalidLogActions.GetSAFProcessorList),
    switchMap(_ => this._invalidtLogService.getSafProcessorList()),
    switchMap((data: any) => {
      return of(new GetSAFProcessorListSuccess(data.data));
    }),
  ));

  constructor(
    private _invalidtLogService: InvalidLogService,
    private alertService: AlertService,
    private _actions$: Actions,
  ) {}
}
