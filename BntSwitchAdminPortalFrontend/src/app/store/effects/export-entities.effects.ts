import {
  DownloadSnapshot,
  DownloadSnapshotSuccess,
  FetchImportExportActionSuccess,
  GetImportEntitiesList,
  GetImportEntitiesListSuccess,
  GetSnapshotById,
  GetSnapshotListSuccess,
  GetSnapshotListToBeCreated,
  POSTIMPORTDATA,
  POSTIMPORTDATASUCCESS,
} from './../actions/export-entities.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExportEntitiesService } from '../../services/export-entities.service';
import {
  EExportEntitiesActions,
  FetchImportExportAction,
  GetExportEntitiesList,
  GetExportEntitiesSuccess,
  GetExportSchema,
  GetExportSchemaSuccess,
  PostExportSchema,
  PostExportSchemaSuccess,
  PostImportSchema,
  PostImportSchemaSuccess,
  CreateSnapshotDetails,
  CreateSnapshotDetailsSuccess,
} from '../actions/export-entities.action';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { GetEntityListObject, GetEntitySchemaObject } from '@app/models/export-entities.interface';

@Injectable()
export class ExportEntitiesEffects {
  constructor(
    private _exportentitiesService: ExportEntitiesService,
    private alertService: AlertService,
    private _actions$: Actions,
  ) {}

  
  GetExportEntities$ = createEffect(() => this._actions$.pipe(
    ofType<GetExportEntitiesList>(EExportEntitiesActions.GetExportEntitiesList),
    switchMap(payload => this._exportentitiesService.getExportEntities(payload)),
    switchMap((response: GetEntityListObject) => {
      return of(new GetExportEntitiesSuccess(response));
    }),
  ));

  
  GetImportEntitiesList$ = createEffect(() => this._actions$.pipe(
    ofType<GetImportEntitiesList>(EExportEntitiesActions.GetImportEntitiesList),
    switchMap(payload => this._exportentitiesService.getImportList(payload)),
    switchMap((response: any) => {
      return of(new GetImportEntitiesListSuccess(response));
    }),
  ));

  
  GetExportSchema$ = createEffect(() => this._actions$.pipe(
    ofType<GetExportSchema>(EExportEntitiesActions.GetExportSchema),
    switchMap(payload => this._exportentitiesService.getExportSchema(payload)),
    switchMap((response: GetEntitySchemaObject) => {
      return of(new GetExportSchemaSuccess(response));
    }),
  ));

  
  PostExportSchema$ = createEffect(() => this._actions$.pipe(
    ofType<PostExportSchema>(EExportEntitiesActions.PostExportSchema),
    switchMap(payload => this._exportentitiesService.postExportSchema(payload)),
    switchMap(response => {
      this.alertService.responseMessage(response);
      return of(new PostExportSchemaSuccess(response));
    }),
  ));

  
  PostImportSchema$ = createEffect(() => this._actions$.pipe(
    ofType<PostImportSchema>(EExportEntitiesActions.PostImportSchema),
    switchMap(payload => this._exportentitiesService.PostImportSchema(payload)),
    switchMap(response => {
      this.alertService.responseMessage(response);
      return of(new PostImportSchemaSuccess(response));
    }),
  ));

  
  FetchImportExport$ = createEffect(() => this._actions$.pipe(
    ofType<FetchImportExportAction>(EExportEntitiesActions.FETCH_IMPORT_EXPORT_DATA),
    switchMap(payload => this._exportentitiesService.fetchExportList({ payload })),
    switchMap(response => of(new FetchImportExportActionSuccess(response.data))),
  ));

  
  CreateExportSnapshot$ = createEffect(() => this._actions$.pipe(
    ofType<CreateSnapshotDetails>(EExportEntitiesActions.CREATE_EXPORT_SNAPSHOT),
    switchMap(payload => this._exportentitiesService.createExportSnapshot(payload)),
    switchMap(response => {
      this.alertService.responseMessage(response);
      return of(new CreateSnapshotDetailsSuccess(response));
    }),
  ));

  
  GetSnapshotListById$ = createEffect(() => this._actions$.pipe(
    ofType<GetSnapshotById>(EExportEntitiesActions.GET_SNAPSHOT_LIST_BY_ID),
    switchMap(payload => this._exportentitiesService.getSnapshotListById(payload.payload)),
    switchMap(response => of(new GetSnapshotListSuccess(response))),
  ));

  
  GetSnapshotToBeAdded$ = createEffect(() => this._actions$.pipe(
    ofType<GetSnapshotListToBeCreated>(EExportEntitiesActions.GET_SNAPSHOT_LIST_TO_BE_CREATED),
    switchMap(payload => this._exportentitiesService.getSnapshotListToBeAdded(payload)),
    switchMap(response => of(new GetSnapshotListSuccess(response))),
  ));

  
  POSTIMPORTDATA$ = createEffect(() => this._actions$.pipe(
    ofType<POSTIMPORTDATA>(EExportEntitiesActions.POSTIMPORTDATA),
    switchMap(payload => this._exportentitiesService.postImportData(payload)),
    switchMap(response => {
      this.alertService.responseMessage(response);
      return of(new POSTIMPORTDATASUCCESS(response));
    }),
  ));
}
