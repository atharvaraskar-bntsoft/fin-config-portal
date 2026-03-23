import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MerchantCodeMappingService } from '../../services/merchant-code-mapping.service';
import {
  GetMerchantCodeMappingSuccess,
  DeleteMerchantCodeMapping,
} from '../actions/merchant-code-mapping.action';
import {
  EMerchantCodeMappingActions,
  GetMerchantCodeMapping,
} from '../actions/merchant-code-mapping.action';
import {
  GetRowMerchantCodeMapping,
  GetRowMerchantCodeMappingSuccess,
} from '../actions/merchant-code-mapping.action';
import {
  DeleteMerchantCodeMappingSuccess,
  PostMerchantCodeMapping,
  GetMerchantConfigureData,
  GetMerchantConfigureDataSuccess,
} from '../actions/merchant-code-mapping.action';
import {
  PostMerchantCodeMappingSuccess,
  UpdateMerchantCodeMapping,
} from '../actions/merchant-code-mapping.action';
import { AlertService } from '@app/services/alert.service';
import { MerchantGetObject } from '@app/models/merchant-code-mapping.interface';

@Injectable()
export class MerchantCodeMappingEffects {
  
  MerchantCodeMapping$ = createEffect(() => this._actions$.pipe(
    ofType<GetMerchantCodeMapping>(EMerchantCodeMappingActions.GetMerchantCodeMapping),
    switchMap(payload => this._merchantcodemappingService.getMerchantCodeMapping(payload)),
    switchMap((response: MerchantGetObject) => {
      return of(new GetMerchantCodeMappingSuccess(response));
    }),
  ));

  
  DeleteMerchantCodeMapping$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteMerchantCodeMapping>(EMerchantCodeMappingActions.DeleteMerchantCodeMapping),
    switchMap(data => this._merchantcodemappingService.deleteMechantCodeMapping(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DeleteMerchantCodeMappingSuccess(response));
    }),
  ));

  
  GetRowMerchantCodeMapping$ = createEffect(() => this._actions$.pipe(
    ofType<GetRowMerchantCodeMapping>(EMerchantCodeMappingActions.GetRowMerchantCodeMapping),
    switchMap(data => this._merchantcodemappingService.getRowErrorCodeMapping(data)),
    switchMap((response: any) => {
      return of(new GetRowMerchantCodeMappingSuccess(response.data));
    }),
  ));

  
  PostMerchantCodeMapping$ = createEffect(() => this._actions$.pipe(
    ofType<PostMerchantCodeMapping>(EMerchantCodeMappingActions.PostMerchantCodeMapping),
    switchMap(data => this._merchantcodemappingService.postErrorCodeMapping(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PostMerchantCodeMappingSuccess(response));
    }),
  ));

  
  UpdateMerchantCodeMapping$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateMerchantCodeMapping>(EMerchantCodeMappingActions.UpdateMerchantCodeMapping),
    switchMap(data => this._merchantcodemappingService.updateErrorCodeMapping(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PostMerchantCodeMappingSuccess(response));
    }),
  ));
  
  GetMerchantConfigureData$ = createEffect(() => this._actions$.pipe(
    ofType<GetMerchantConfigureData>(EMerchantCodeMappingActions.GetMerchantConfigureData),
    switchMap(data => this._merchantcodemappingService.getMerchantConfigueData()),
    switchMap((response: any) => {
      return of(new GetMerchantConfigureDataSuccess(response.data));
    }),
  ));

  constructor(
    private _merchantcodemappingService: MerchantCodeMappingService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
