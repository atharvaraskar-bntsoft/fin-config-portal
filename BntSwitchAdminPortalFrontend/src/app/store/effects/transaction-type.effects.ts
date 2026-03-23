import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  ETransactionTypeActions,
  GetTransactionType,
  GetTransactionTypeSuccess,
  PostTransactionType,
  PostTransactionTypeSuccess,
  GetByIdTransactionTypeSuccess,
  GetByIdTransactionType,
  UpdateTransactionTypeSuccess,
  UpdateTransactionType,
} from '../actions/transaction-type.action';
import { TransactionTypeService } from '@app/services/transaction-type.service';
import {
  TransactionTypeGetObject,
  GetByIdObject,
  UpdateObject,
} from '@app/models/transaction-type.interface';

@Injectable()
export class TransactionTypeEffects {
  
  GetTransactionType$ = createEffect(() => this._actions$.pipe(
    ofType<GetTransactionType>(ETransactionTypeActions.GetTransactionType),
    switchMap(payload => this._TransactionTypeService.getTransactionType(payload)),
    switchMap((response: TransactionTypeGetObject) => {
      return of(new GetTransactionTypeSuccess(response));
    }),
  ));

  
  PostTransactionType$ = createEffect(() => this._actions$.pipe(
    ofType<PostTransactionType>(ETransactionTypeActions.PostTransactionType),
    switchMap(data => this._TransactionTypeService.postTransactionType(data.payload)),
    switchMap((response: UpdateObject) => {
      this.alertService.responseMessage(response);
      return of(new PostTransactionTypeSuccess(response));
    }),
  ));

  
  GetByIdTransactionType$ = createEffect(() => this._actions$.pipe(
    ofType<GetByIdTransactionType>(ETransactionTypeActions.GetByIdTransactionType),
    switchMap(data => this._TransactionTypeService.getByIdTransactionType(data.payload)),
    switchMap((response: GetByIdObject) => {
      return of(new GetByIdTransactionTypeSuccess(response));
    }),
  ));

  
  UpdateTransactionType$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateTransactionType>(ETransactionTypeActions.UpdateTransactionType),
    switchMap(data => this._TransactionTypeService.updateTransactionType(data.payload)),
    switchMap((response: UpdateObject) => {
      this.alertService.responseMessage(response);
      return of(new UpdateTransactionTypeSuccess(response));
    }),
  ));
  constructor(
    private _TransactionTypeService: TransactionTypeService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
