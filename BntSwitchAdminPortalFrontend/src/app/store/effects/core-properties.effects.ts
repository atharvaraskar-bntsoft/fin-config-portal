import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  ECorePropertiesActions,
  GetCoreProperties,
  GetCorePropertiesSuccess,
  GetDefaultCoreProperties,
  GetDefaultCorePropertiesSuccess,
  GetByIdCoreProperties,
  GetByIdCorePropertiesSuccess,
  PostCoreProperties,
  PostCorePropertiesSuccess,
  UpdateCoreProperties,
  UpdateCorePropertiesSuccess,
} from '../actions/core-properties.action';
import { CorePropertiesService } from '@app/services/core-properties.service';

@Injectable()
export class CorePropertiesEffects {
  
  GetCoreProperties$ = createEffect(() => this._actions$.pipe(
    ofType<GetCoreProperties>(ECorePropertiesActions.GetCoreProperties),
    switchMap(payload => this._coreProperrtiesService.getCorePropetiesList(payload)),
    switchMap((response: any) => {
      return of(new GetCorePropertiesSuccess(response));
    }),
  ));

  
  GetDefaultCoreProperties$ = createEffect(() => this._actions$.pipe(
    ofType<GetDefaultCoreProperties>(ECorePropertiesActions.GetDefaultCoreProperties),
    switchMap(payload => this._coreProperrtiesService.getDefaultProperties()),
    switchMap((response: any) => {
      return of(new GetDefaultCorePropertiesSuccess(response));
    }),
  ));

//   @Effect()
//   GetByIdCoreProperties$ = this._actions$.pipe(
//     ofType<GetByIdCoreProperties>(ETxnKeyLableActions.GetByIdCoreProperties),
//     switchMap(payload => this._TxnKeyLableService.getbyidCoreProperties(payload)),
//     switchMap((response: any) => {
//       return of(new GetByIdCorePropertiesSuccess(response));
//     }),
//   );

//   @Effect()
//   PostCoreProperties$ = this._actions$.pipe(
//     ofType<PostCoreProperties>(ETxnKeyLableActions.PostCoreProperties),
//     switchMap(data => this._TxnKeyLableService.postCoreProperties(data.payload)),
//     switchMap((response: any) => {
//       this.alertService.responseMessage(response);
//       return of(new PostCorePropertiesSuccess(response));
//     }),
//   );

//   @Effect()
//   UpdateCoreProperties$ = this._actions$.pipe(
//     ofType<UpdateCoreProperties>(ETxnKeyLableActions.UpdateCoreProperties),
//     switchMap(data => this._TxnKeyLableService.updateCoreProperties(data.payload)),
//     switchMap((response: any) => {
//       this.alertService.responseMessage(response);
//       return of(new UpdateCorePropertiesSuccess(response));
//     }),
//   );

  constructor(
    private _coreProperrtiesService: CorePropertiesService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
