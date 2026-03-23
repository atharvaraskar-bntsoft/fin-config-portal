import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  GetL3AdapterList,
  EL3AdapterActions,
  GetL3AdapterListSuccess,
  GetL3Adapter,
  GetL3AdapterSuccess,
  GetL3AdapterById,
  GetL3AdapterByIdSuccess,
  GetL3Network,
  GetL3NetworkSuccess,
  GetPostActionMethod,
  GetPreActionMethod,
  GetPostActionMethodSuccess,
  GetPreActionMethodSuccess,
  GetStepListMethod,
  GetStepListMethodSuccess,
} from '../actions/l3-adapter.action';
import { L3AdapterService } from '@app/services/l3-adapter.service';

@Injectable()
export class L3AdapterEffects {
  
  GetL3AdapterList$ = createEffect(() => this._actions$.pipe(
    ofType<GetL3AdapterList>(EL3AdapterActions.GetL3AdapterList),
    switchMap(data => this._l3AdapterService.getL3AdapterList(data.payload)),
    switchMap((data: any) => {
      return of(new GetL3AdapterListSuccess(data));
    }),
  ));

  
  GetL3Adapter$ = createEffect(() => this._actions$.pipe(
    ofType<GetL3Adapter>(EL3AdapterActions.GetL3Adapter),
    switchMap(data => this._l3AdapterService.getL3Adapter(data.payload)),
    switchMap((data: any) => {
      return of(new GetL3AdapterSuccess(data.data));
    }),
  ));

  
  GetL3AdapterById$ = createEffect(() => this._actions$.pipe(
    ofType<GetL3AdapterById>(EL3AdapterActions.GetL3AdapterById),
    switchMap(data => this._l3AdapterService.getL3AdapterById(data.payload)),
    switchMap((response: any) => {
      return of(new GetL3AdapterByIdSuccess(response));
    }),
  ));

  
  GetL3Network$ = createEffect(() => this._actions$.pipe(
    ofType<GetL3Network>(EL3AdapterActions.GetL3Network),
    switchMap(data => this._l3AdapterService.getL3Network(data.payload)),
    switchMap((data: any) => {
      return of(new GetL3NetworkSuccess(data.data));
    }),
  ));

  
  public GetPostActionMethod$ = createEffect(() => this._actions$.pipe(
    ofType<GetPostActionMethod>(EL3AdapterActions.GetPostActionMethod),
    switchMap(() => this._l3AdapterService.getPostActionMethod()),
    switchMap((response: any) => {
      return of(new GetPostActionMethodSuccess(response));
    }),
  ));

  
  public GetPerActionMethod$ = createEffect(() => this._actions$.pipe(
    ofType<GetPreActionMethod>(EL3AdapterActions.GetPreActionMethod),
    switchMap(() => this._l3AdapterService.getPreActionMethod()),
    switchMap((response: any) => {
      return of(new GetPreActionMethodSuccess(response));
    }),
  ));
  
  public GetStepListMethod$ = createEffect(() => this._actions$.pipe(
    ofType<GetPostActionMethod>(EL3AdapterActions.GetStepListMethod),
    switchMap(() => this._l3AdapterService.GetStepListMethod()),
    switchMap((response: any) => {
      return of(new GetStepListMethodSuccess(response));
    }),
  ));

  constructor(
    private _l3AdapterService: L3AdapterService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
