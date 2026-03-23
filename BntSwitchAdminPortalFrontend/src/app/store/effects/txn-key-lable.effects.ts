import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  ETxnKeyLableActions,
  GetTxnKeyLableType,
  GetTxnKeyLableTypeSuccess,
  GetByIdTxnKeyLableType,
  GetByIdTxnKeyLableTypeSuccess,
  DeleteTxnKeyLableType,
  DeleteTxnKeyLableTypeSuccess,
  PostTxnKeyLableType,
  PostTxnKeyLableTypeSuccess,
  UpdateTxnKeyLableType,
  UpdateTxnKeyLableTypeSuccess,
} from '../actions/txn-key-lable.action';
import { TxnKeyLableService } from '@app/services/txn-key-lable.service';

@Injectable()
export class TxnKeyLableEffects {
  
  GetTxnKeyLableType$ = createEffect(() => this._actions$.pipe(
    ofType<GetTxnKeyLableType>(ETxnKeyLableActions.GetTxnKeyLableType),
    switchMap(payload => this._TxnKeyLableService.getTxnKeyLableType(payload)),
    switchMap((response: any) => {
      return of(new GetTxnKeyLableTypeSuccess(response));
    }),
  ));

  
  GetByIdTxnKeyLableType$ = createEffect(() => this._actions$.pipe(
    ofType<GetByIdTxnKeyLableType>(ETxnKeyLableActions.GetByIdTxnKeyLableType),
    switchMap(payload => this._TxnKeyLableService.getbyidTxnKeyLableType(payload)),
    switchMap((response: any) => {
      return of(new GetByIdTxnKeyLableTypeSuccess(response));
    }),
  ));

  
  DeleteTxnKeyLableType$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteTxnKeyLableType>(ETxnKeyLableActions.DeleteTxnKeyLableType),
    switchMap(data => this._TxnKeyLableService.deleteTxnKeyLableType(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DeleteTxnKeyLableTypeSuccess(response));
    }),
  ));

  
  PostTxnKeyLableType$ = createEffect(() => this._actions$.pipe(
    ofType<PostTxnKeyLableType>(ETxnKeyLableActions.PostTxnKeyLableType),
    switchMap(data => this._TxnKeyLableService.postTxnKeyLableType(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PostTxnKeyLableTypeSuccess(response));
    }),
  ));

  
  UpdateTxnKeyLableType$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateTxnKeyLableType>(ETxnKeyLableActions.UpdateTxnKeyLableType),
    switchMap(data => this._TxnKeyLableService.updateTxnKeyLableType(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new UpdateTxnKeyLableTypeSuccess(response));
    }),
  ));

  constructor(
    private _TxnKeyLableService: TxnKeyLableService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
