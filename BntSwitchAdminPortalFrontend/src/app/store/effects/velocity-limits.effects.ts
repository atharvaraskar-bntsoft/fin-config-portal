import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';

import {
  EVelocityLimitsActions,
  GetVelocityLimits,
  GetVelocityLimitsSuccess,
  GetVelocityLimitsEditTransaction,
  GetVelocityLimitsEditTransactionSuccess,
  GetVelocityLimitsEditInstitution,
  GetVelocityLimitsEditInstitutionSuccess,
  DeleteVelocityLimits,
  DeleteVelocityLimitsSuccess,
  GetVelocityLimitsEditCurrency,
  GetVelocityLimitsEditCurrencySuccess,
  GetVelocityLimitsEditRow,
  GetVelocityLimitsEditRowSuccess,
  UpdateVelocityLimits,
  UpdateVelocityLimitsSuccess,
  CreateVelocityLimits,
  CreateVelocityLimitsSuccess,
} from '../actions/velocity-limits.action';

import { VelocityLimitsService } from '../../services/velocity-limits.service';

@Injectable()
export class VelocityLimitsEffects {
  
  GetVelocityLimits$ = createEffect(() => this._actions$.pipe(
    ofType<GetVelocityLimits>(EVelocityLimitsActions.GetVelocityLimits),
    switchMap((payload: any) => this._velocityLimitsService.getLimits(payload)),
    switchMap((data: any) => {
      return of(new GetVelocityLimitsSuccess(data.data));
    }),
  ));
  
  GetVelocityLimitsEditTransaction$ = createEffect(() => this._actions$.pipe(
    ofType<GetVelocityLimitsEditTransaction>(
      EVelocityLimitsActions.GetVelocityLimitsEditTransaction,
    ),
    switchMap(() => this._velocityLimitsService.getTransactionTypeList()),
    switchMap((data: any) => {
      return of(new GetVelocityLimitsEditTransactionSuccess(data.data));
    }),
  ));
  
  GetVelocityLimitsEditInstitution$ = createEffect(() => this._actions$.pipe(
    ofType<GetVelocityLimitsEditInstitution>(
      EVelocityLimitsActions.GetVelocityLimitsEditInstitution,
    ),
    switchMap(() => this._velocityLimitsService.getInstitutionTreeList()),
    switchMap((data: any) => {
      return of(new GetVelocityLimitsEditInstitutionSuccess(data.data));
    }),
  ));
  
  GetVelocityLimitsEditCurrency$ = createEffect(() => this._actions$.pipe(
    ofType<GetVelocityLimitsEditCurrency>(EVelocityLimitsActions.GetVelocityLimitsEditCurrency),
    switchMap(() => this._velocityLimitsService.getCurrency()),
    switchMap((data: any) => {
      return of(new GetVelocityLimitsEditCurrencySuccess(data.data));
    }),
  ));
  
  GetVelocityLimitsEditRow$ = createEffect(() => this._actions$.pipe(
    ofType<GetVelocityLimitsEditRow>(EVelocityLimitsActions.GetVelocityLimitsEditRow),
    switchMap((payload: any) => this._velocityLimitsService.getRowLimits(payload)),
    switchMap((data: any) => {
      return of(new GetVelocityLimitsEditRowSuccess(data.data));
    }),
  ));
  
  DeleteVelocityLimits$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteVelocityLimits>(EVelocityLimitsActions.DeleteVelocityLimits),
    switchMap((payload: any) => this._velocityLimitsService.deleteLimits(payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DeleteVelocityLimitsSuccess(response));
    }),
  ));
  
  UpdateVelocityLimits$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateVelocityLimits>(EVelocityLimitsActions.UpdateVelocityLimits),
    switchMap((payload: any) => this._velocityLimitsService.updateLimits(payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new CreateVelocityLimitsSuccess(response));
    }),
  ));
  
  CreateVelocityLimits$ = createEffect(() => this._actions$.pipe(
    ofType<CreateVelocityLimits>(EVelocityLimitsActions.CreateVelocityLimits),
    switchMap((payload: any) => this._velocityLimitsService.createLimits(payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new CreateVelocityLimitsSuccess(response));
    }),
  ));

  constructor(
    private _velocityLimitsService: VelocityLimitsService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
