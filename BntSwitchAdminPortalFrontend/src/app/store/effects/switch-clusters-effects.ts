import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  ESwitchClustersActions,
  GetSwitchClusters,
  GetSwitchClustersSuccess,
  PostSwitchClusters,
  PostSwitchClustersSuccess,
  PutSwitchClusters,
  PutSwitchClustersSuccess,
  GetByIdSwitchClusters,
  GetByIdSwitchClustersSuccess,
} from '../actions/switch-clusters.action';
import { SwitchClustersService } from '@app/services/switch-clusters.service';

@Injectable()
export class SwitchClustersEffects {
  
  GetSwitchClusters$ = createEffect(() => this._actions$.pipe(
    ofType<GetSwitchClusters>(ESwitchClustersActions.GetSwitchClusters),
    switchMap(payload => this._SwitchClustersService.getSwitchClustersUrl(payload)),
    switchMap((response: any) => {
      return of(new GetSwitchClustersSuccess(response));
    }),
  ));

  
  PostSwitchClusters$ = createEffect(() => this._actions$.pipe(
    ofType<PostSwitchClusters>(ESwitchClustersActions.PostSwitchClusters),
    switchMap(data => this._SwitchClustersService.postSwitchClustersUrl(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PostSwitchClustersSuccess(response));
    }),
  ));

  
  PutSwitchClusters$ = createEffect(() => this._actions$.pipe(
    ofType<PutSwitchClusters>(ESwitchClustersActions.PutSwitchClusters),
    switchMap(data => this._SwitchClustersService.putSwitchClustersUrl(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PutSwitchClustersSuccess(response));
    }),
  ));
  
  GetByIdSwitchClusters$ = createEffect(() => this._actions$.pipe(
    ofType<GetByIdSwitchClusters>(ESwitchClustersActions.GetByIdSwitchClusters),
    switchMap(data => this._SwitchClustersService.getByIdSwitchClustersUrl(data.payload)),
    switchMap((response: any) => {
      return of(new GetByIdSwitchClustersSuccess(response));
    }),
  ));
  constructor(
    private _SwitchClustersService: SwitchClustersService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
