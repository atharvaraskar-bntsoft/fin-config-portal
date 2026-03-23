import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  EImfJsonActions,
  GetImfJson,
  GetImfJsonSuccess,
  LatestImfJson,
  LatestImfJsonSuccess,
  CreateImfJson,
  CreateImfJsonSuccess,
  UpdateImfJsonSuccess,
  SingleImfJsonSuccess,
  GetImfJsonView,
  GetImfJsonViewSuccess,
  GetTemplateJson,
  GetTemplateJsonSuccess,
  GetImfTypeListJsonSuccess,
  GetTemplateDetailsJson,
  GetTemplateDetailsJsonSuccess,
  UserViewJson,
  UserViewSuccess,
  GetImfTypeListJson,
  DeleteImfJson,
  DeleteImfJsonSuccess,
  GetImfJsonById,
  GetImfJsonByIdSuccess,
} from '../actions/imf-json.action';
import { ImfJsonService } from '../../services/imf-json.service';
import { AlertService } from '@app/services/alert.service';

@Injectable()
export class ImfJsonEffects {
  
  GetImfJson$ = createEffect(() => this._actions$.pipe(
    ofType<GetImfJson>(EImfJsonActions.GetImfJson),
    switchMap(payload => this._imfjsonService.getAllVersion()),
    switchMap((data: any) => {
      return of(new GetImfJsonSuccess(data));
    }),
  ));

  
  DeleteImfJson$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteImfJson>(EImfJsonActions.DeleteImfJson),
    switchMap(payload => this._imfjsonService.deleteImf(payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new DeleteImfJsonSuccess(data));
    }),
  ));

  
  GetImfTypeListJson$ = createEffect(() => this._actions$.pipe(
    ofType<GetImfTypeListJson>(EImfJsonActions.GetImfTypeListJson),
    switchMap(payload => this._imfjsonService.getTypeList()),
    switchMap((data: any) => {
      return of(new GetImfTypeListJsonSuccess(data));
    }),
  ));

  
  LatestImfJson$ = createEffect(() => this._actions$.pipe(
    ofType<LatestImfJson>(EImfJsonActions.LatestImfJson),
    switchMap(payload => this._imfjsonService.getLatestVersion()),
    switchMap((data: any) => {
      return of(new LatestImfJsonSuccess(data));
    }),
  ));

  
  CreateImfJson$ = createEffect(() => this._actions$.pipe(
    ofType<CreateImfJson>(EImfJsonActions.CreateImfJson),
    switchMap(payload => this._imfjsonService.postImfJson(payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new CreateImfJsonSuccess(data));
    }),
  ));
  
  UserViewJson$ = createEffect(() => this._actions$.pipe(
    ofType<UserViewJson>(EImfJsonActions.UserViewJson),
    switchMap(payload => this._imfjsonService.userViewJson(payload)),
    switchMap((data: any) => {
      return of(new UserViewSuccess(data));
    }),
  ));
  
  GetImfJsonView$ = createEffect(() => this._actions$.pipe(
    ofType<GetImfJsonView>(EImfJsonActions.GetImfJsonView),
    switchMap(payload => this._imfjsonService.getImfList(payload)),
    switchMap((data: any) => {
      return of(new GetImfJsonViewSuccess(data));
    }),
  ));

  
  UpdateImfJson$ = createEffect(() => this._actions$.pipe(
    ofType<CreateImfJson>(EImfJsonActions.UpdateImfJson),
    switchMap(payload => this._imfjsonService.putImfJson(payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new UpdateImfJsonSuccess(data));
    }),
  ));
  
  SingleImfJson$ = createEffect(() => this._actions$.pipe(
    ofType<CreateImfJson>(EImfJsonActions.SingleImfJson),
    switchMap(payload => this._imfjsonService.singleImfJson(payload)),
    switchMap((data: any) => {
      return of(new SingleImfJsonSuccess(data));
    }),
  ));
  
  GetTemplateJson$ = createEffect(() => this._actions$.pipe(
    ofType<GetTemplateJson>(EImfJsonActions.GetTemplateJson),
    switchMap(() => this._imfjsonService.GetTemplateJson()),
    switchMap((data: any) => {
      return of(new GetTemplateJsonSuccess(data));
    }),
  ));
  
  GetTemplateDetailsJson$ = createEffect(() => this._actions$.pipe(
    ofType<GetTemplateDetailsJson>(EImfJsonActions.GetTemplateDetailsJson),
    switchMap(payload => this._imfjsonService.singleTemplateJson(payload)),
    switchMap((data: any) => {
      return of(new GetTemplateDetailsJsonSuccess(data));
    }),
  ));
  
  GetImfJsonById$ = createEffect(() => this._actions$.pipe(
    ofType<GetImfJsonById>(EImfJsonActions.GetImfJsonById),
    switchMap(payload => this._imfjsonService.imfJsonById(payload)),
    switchMap((data: any) => {
      return of(new GetImfJsonByIdSuccess(data));
    }),
  ));
  constructor(
    private _imfjsonService: ImfJsonService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
