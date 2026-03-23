import { UpdateCurrentEMV, UpdateCurrentEMVSuccess } from './../actions/emv-data.action';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  CheckUniqueName,
  CheckUniqueNameSuccess,
  CreateEMVData,
  CreateEMVDataSuccess,
  EEMVDataActions,
  GetEMVData,
  GetEMVDataSuccess,
} from '../actions/emv-data.action';
import { EmvDataService } from '@app/services/emv-data.service';

@Injectable()
export class EMVDataEffects {
  
  GetELFunction$ = createEffect(() => this._actions$.pipe(
    ofType<GetEMVData>(EEMVDataActions.GetEMVTable),
    switchMap(payload => this.emvDataService.getEMVData(payload)),
    switchMap((response: any) => {
      return of(new GetEMVDataSuccess(response.data));
    }),
  ));

  
  CreateEMV$ = createEffect(() => this._actions$.pipe(
    ofType<CreateEMVData>(EEMVDataActions.CreateEMVData),
    switchMap(request => this.emvDataService.createEMV(request.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new CreateEMVDataSuccess(response));
    }),
  ));

  
  UniqueEMVModel$ = createEffect(() => this._actions$.pipe(
    ofType<CheckUniqueName>(EEMVDataActions.CheckUniqueName),
    switchMap(request => this.emvDataService.uniqueModelName(request.payload)),
    switchMap((response: any) => {
      return of(new CheckUniqueNameSuccess(response));
    }),
  ));

  
  UpdateCurrentEMV$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateCurrentEMV>(EEMVDataActions.UpdateCurrentEMV),
    switchMap(request => this.emvDataService.updateEMV(request.payload)),
    switchMap(response => {
      return of(new CreateEMVDataSuccess(response));
    }),
  ));

  constructor(
    private emvDataService: EmvDataService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
