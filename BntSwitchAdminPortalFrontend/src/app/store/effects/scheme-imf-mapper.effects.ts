import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  ESchemeImfMapperActions,
  GetScheme,
  GetSchemeSuccess,
  GetField,
  GetFieldSuccess,
  GetIMF,
  GetIMFSuccess,
  GetIPC,
  GetIPCSuccess,
  GetMap,
  GetMapSuccess,
  GetSchemeImfMapper,
  GetSchemeImfMapperSuccess,
  SchemeImfMapperSave,
  SchemeImfMapperSaveSuccess,
  GetElFunctionSuccess,
  GetElFunction,
  GetIMFVersion,
  GetIMFVersionSuccess,
  GetServiceType,
  GetServiceTypeSuccess,
  GetInBuiltMapper,
  GetInBuiltMapperSuccess,
} from '../actions/scheme-imf-mapper.action';
import { SchemeImfMapperGetObject } from '@app/models/scheme-imf-mapper.interface';
import { SchemeImfMapperService } from '@app/services/scheme-imf-mapper.service';

@Injectable()
export class SchemeImfMapperEffects {
  constructor(
    private _schemeImfMapperService: SchemeImfMapperService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}

  
  GetSchemeImfMapper$ = createEffect(() => this._actions$.pipe(
    ofType<GetSchemeImfMapper>(ESchemeImfMapperActions.GetSchemeImfMapper),
    switchMap(payload => this._schemeImfMapperService.getSchemeImfMapper(payload)),
    switchMap((data: SchemeImfMapperGetObject) => {
      return of(new GetSchemeImfMapperSuccess(data));
    }),
  ));

  
  GetScheme$ = createEffect(() => this._actions$.pipe(
    ofType<GetScheme>(ESchemeImfMapperActions.GetScheme),
    switchMap(data => this._schemeImfMapperService.getScheme()),
    switchMap((data: any) => {
      return of(new GetSchemeSuccess(data.data));
    }),
  ));

  
  GetField$ = createEffect(() => this._actions$.pipe(
    ofType<GetField>(ESchemeImfMapperActions.GetField),
    switchMap(data => this._schemeImfMapperService.getField(data.payload)),
    switchMap((data: any) => {
      return of(new GetFieldSuccess(data.data));
    }),
  ));

  
  GetIMF$ = createEffect(() => this._actions$.pipe(
    ofType<GetIMF>(ESchemeImfMapperActions.GetIMF),
    switchMap(data => this._schemeImfMapperService.getIMF(data)),
    switchMap((data: any) => {
      return of(new GetIMFSuccess(data.data));
    }),
  ));

  
  GetIPC$ = createEffect(() => this._actions$.pipe(
    ofType<GetIPC>(ESchemeImfMapperActions.GetIPC),
    switchMap(data => this._schemeImfMapperService.getIPC()),
    switchMap((data: any) => {
      return of(new GetIPCSuccess(data.data));
    }),
  ));

  
  GetMap$ = createEffect(() => this._actions$.pipe(
    ofType<GetMap>(ESchemeImfMapperActions.GetMap),
    switchMap(data => this._schemeImfMapperService.getMap()),
    switchMap((data: any) => {
      return of(new GetMapSuccess(data.data));
    }),
  ));

  
  GetElFunction$ = createEffect(() => this._actions$.pipe(
    ofType<GetElFunction>(ESchemeImfMapperActions.GetElFunction),
    switchMap(data => this._schemeImfMapperService.getElFunction()),
    switchMap((data: any) => {
      return of(new GetElFunctionSuccess(data.data));
    }),
  ));

  
  DraftNetwork$ = createEffect(() => this._actions$.pipe(
    ofType<SchemeImfMapperSave>(ESchemeImfMapperActions.SchemeImfMapperSave),
    switchMap(data => this._schemeImfMapperService.postSchemeImfMapper(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new SchemeImfMapperSaveSuccess(response));
    }),
  ));

  
  GetIMFVersion$ = createEffect(() => this._actions$.pipe(
    ofType<GetIMFVersion>(ESchemeImfMapperActions.GetIMFVersion),
    switchMap(data => this._schemeImfMapperService.getIMFVersion()),
    switchMap((data: any) => {
      return of(new GetIMFVersionSuccess(data.data));
    }),
  ));

  
  GetServiceType$ = createEffect(() => this._actions$.pipe(
    ofType<GetServiceType>(ESchemeImfMapperActions.GetServiceType),
    switchMap(data => this._schemeImfMapperService.getServiceType()),
    switchMap((data: any) => {
      return of(new GetServiceTypeSuccess(data.data));
    }),
  ));
  
  GetInBuiltMapper$ = createEffect(() => this._actions$.pipe(
    ofType<GetInBuiltMapper>(ESchemeImfMapperActions.GetInBuiltMapper),
    switchMap(payload => this._schemeImfMapperService.getBuiltMapperList(payload)),
    switchMap((data: any) => {
      return of(new GetInBuiltMapperSuccess(data.data));
    }),
  ));
}
