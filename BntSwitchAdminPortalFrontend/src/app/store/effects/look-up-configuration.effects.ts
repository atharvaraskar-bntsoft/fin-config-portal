import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  ELookUpConfigurationActions,
  GetLookUpType,
  GetLookUpTypeSuccess,
  DeleteLookUpType,
  DeleteLookUpTypeSuccess,
  PostLookUpType,
  PostLookUpTypeSuccess,
  UpdateLookUpType,
  UpdateLookUpTypeSuccess,
  GetLookUpValue,
  GetLookUpValueSuccess,
  UpdateLookUpValue,
  UpdateLookUpValueSuccess,
} from '../actions/look-up-configuration.action';
import { LookUpConfigurationService } from '@app/services/look-up-configuration.service';

@Injectable()
export class LookUpConfigurationsEffects {
  
  GetLookUpType$ = createEffect(() => this._actions$.pipe(
    ofType<GetLookUpType>(ELookUpConfigurationActions.GetLookUpType),
    switchMap(payload => this._LookUpService.getLookUpType(payload)),
    switchMap((response: any) => {
      return of(new GetLookUpTypeSuccess(response));
    }),
  ));
  
  DeleteLookUpType$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteLookUpType>(ELookUpConfigurationActions.DeleteLookUpType),
    switchMap(data => this._LookUpService.deleteLookUpType(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DeleteLookUpTypeSuccess(response));
    }),
  ));

  
  PostLookUpType$ = createEffect(() => this._actions$.pipe(
    ofType<PostLookUpType>(ELookUpConfigurationActions.PostLookUpType),
    switchMap(data => this._LookUpService.postLookUpType(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PostLookUpTypeSuccess(response));
    }),
  ));

  
  UpdateLookUpType$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateLookUpType>(ELookUpConfigurationActions.UpdateLookUpType),
    switchMap(data => this._LookUpService.updateLookUpType(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new UpdateLookUpTypeSuccess(response));
    }),
  ));

  
  GetLookUpValue$ = createEffect(() => this._actions$.pipe(
    ofType<GetLookUpValue>(ELookUpConfigurationActions.GetLookUpValue),
    switchMap(payload => this._LookUpService.getLookUpValue(payload)),
    switchMap((response: any) => {
      return of(new GetLookUpValueSuccess(response));
    }),
  ));

  
  UpdateLookUpValue$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateLookUpValue>(ELookUpConfigurationActions.UpdateLookUpValue),
    switchMap(data => this._LookUpService.updateLookUpValue(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new UpdateLookUpValueSuccess(response));
    }),
  ));

  constructor(
    private _LookUpService: LookUpConfigurationService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
