import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AcquirerService } from '@app/services/acquirer.service';
import {
  GetAcquirer,
  EAcquirerActions,
  GetAcquirerSuccess,
  GetInstitutionAcquirerProcessorList,
  GetInstitutionAcquirerProcessorListSuccess,
  PostAcquirerSuccess,
  PostAcquirer,
  PutAcquirer,
  GetAcquirerRowDataSuccess,
  GetAcquirerRowData,
} from '../actions/acquirer.action';
import { AlertService } from '@app/services/alert.service';
import { InstitutionAcquirerGetObject } from '@app/models/acquirer.interface';

@Injectable()
export class AcquirerEffects {
  
  GetAcquirer$ = createEffect(() => this._actions$.pipe(
    ofType<GetAcquirer>(EAcquirerActions.GetAcquirer),
    switchMap(payload => this._acquirer.getLogs(payload)),
    switchMap((response: InstitutionAcquirerGetObject) => {
      return of(new GetAcquirerSuccess(response));
    }),
  ));

  
  GetInstitutionAcquirerProcessorList$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionAcquirerProcessorList>(
      EAcquirerActions.GetInstitutionAcquirerProcessorList,
    ),
    switchMap(() => this._acquirer.getInstitutionAcquirerProcessorList()),
    switchMap((response: any) => {
      return of(new GetInstitutionAcquirerProcessorListSuccess(response.data));
    }),
  ));

  
  PostAcquirer$ = createEffect(() => this._actions$.pipe(
    ofType<PostAcquirer>(EAcquirerActions.PostAcquirer),
    switchMap((data: any) => this._acquirer.postAcquirer(data.payload)),
    switchMap((institutionData: any) => {
      this._alertService.responseMessage(institutionData);
      return of(new PostAcquirerSuccess(institutionData));
    }),
  ));

  
  GetAcquirerRowData$ = createEffect(() => this._actions$.pipe(
    ofType<GetAcquirerRowData>(EAcquirerActions.GetAcquirerRowData),
    switchMap(data => this._acquirer.getAcquirerRowData(data.payload)),
    switchMap((response: any) => {
      return of(new GetAcquirerRowDataSuccess(response.data));
    }),
  ));

  
  PutAcquirer$ = createEffect(() => this._actions$.pipe(
    ofType<PutAcquirer>(EAcquirerActions.PutAcquirer),
    switchMap(data => this._acquirer.putAcquirer(data.payload)),
    switchMap((response: any) => {
      this._alertService.responseMessage(response);
      return of(new PostAcquirerSuccess(response));
    }),
  ));

  constructor(
    private _acquirer: AcquirerService,
    private _actions$: Actions,
    private _alertService: AlertService,
  ) {}
}
