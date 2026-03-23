import { Action } from '@ngrx/store';
import { GetEntitySchemaObject, GetEntityListObject } from '@app/models/export-entities.interface';

export enum EExportEntitiesActions {
  GetExportEntitiesList = '[ExportEntities] Get Export Entity List',
  GetExportSchema = '[ExportEntities] Get Export Schema',
  GetExportEntitiesSuccess = '[ExportEntities] Get Export Entity Success',
  GetExportSchemaSuccess = '[ExportEntities] Get Export Entity Schema Success',
  PostExportSchema = '[ExportEntities] Post Export Entity Schema',
  PostExportSchemaSuccess = '[ExportEntities] Post Export Entity Schema Success',
  PostImportSchema = '[ExportEntities] Post Import Entity Schema',
  PostImportSchemaSuccess = '[ExportEntities] Post Import Entity Schema Success',
  FETCH_IMPORT_EXPORT_DATA = '[IMPORT_EXPORT] Fetch Import Export Data',
  FETCH_IMPORT_EXPORT_DATA_SUCCESS = '[IMPORT_EXPORT] Fetch Import Export Data SUCCESS',
  CREATE_EXPORT_SNAPSHOT = '[IMPORT_EXPORT] Create Snaphot Schema',
  CREATE_EXPORT_SNAPSHOT_SUCCESS = '[IMPORT_EXPORT] Create Snaphot Schema Success',
  GET_SNAPSHOT_LIST_BY_ID = '[IMPORT_EXPORT] Get Snapshot List By Id',
  GET_SNAPSHOT_LIST_TO_BE_CREATED = '[IMPORT_EXPORT] Get Snapshot To Be Created',
  GET_SNAPSHOT_SUCCESS = '[IMPORT_EXPORT] Get Snapshot List Success',
  POSTIMPORTDATA = '[IMPORT_EXPORT] POST IMPORT DATA',
  POSTIMPORTDATASUCCESS = '[IMPORT_EXPORT] POST IMPORT DATA SUCCESS',
  GetImportEntitiesList = '[IMPORT_EXPORT] Get Import Entity List',
  GetImportEntitiesListSuccess = '[IMPORT_EXPORT] Get Import Entity List Success',
  DownloadSnapshot = '[IMPORT_EXPORT] Download Snapshot',
  DownloadSnapshotSuccess = '[IMPORT_EXPORT] Download Snapshot Success',
}

export class DownloadSnapshot implements Action {
  public readonly type = EExportEntitiesActions.DownloadSnapshot;
  constructor(public payload?: any) {}
}

export class DownloadSnapshotSuccess implements Action {
  public readonly type = EExportEntitiesActions.DownloadSnapshotSuccess;
  constructor(public payload: any) {}
}

export class GetExportEntitiesList implements Action {
  public readonly type = EExportEntitiesActions.GetExportEntitiesList;
  public constructor(public payload?: any) {}
}

export class GetImportEntitiesList implements Action {
  public readonly type = EExportEntitiesActions.GetImportEntitiesList;
  public constructor(public payload?: any) {}
}

export class GetImportEntitiesListSuccess implements Action {
  public readonly type = EExportEntitiesActions.GetImportEntitiesListSuccess;
  public constructor(public payload?: any) {}
}

export class GetExportSchema implements Action {
  public readonly type = EExportEntitiesActions.GetExportSchema;
  public constructor(public payload?: any) {}
}

export class GetExportEntitiesSuccess implements Action {
  public readonly type = EExportEntitiesActions.GetExportEntitiesSuccess;
  public constructor(public payload: GetEntityListObject) {}
}

export class GetExportSchemaSuccess implements Action {
  public readonly type = EExportEntitiesActions.GetExportSchemaSuccess;
  public constructor(public payload: GetEntitySchemaObject) {}
}

export class PostExportSchema implements Action {
  public readonly type = EExportEntitiesActions.PostExportSchema;
  public constructor(public payload: any) {}
}

export class PostExportSchemaSuccess implements Action {
  public readonly type = EExportEntitiesActions.PostExportSchemaSuccess;
  public constructor(public payload: any) {}
}

export class PostImportSchema implements Action {
  public readonly type = EExportEntitiesActions.PostImportSchema;
  public constructor(public payload: any) {}
}

export class PostImportSchemaSuccess implements Action {
  public readonly type = EExportEntitiesActions.PostImportSchemaSuccess;
  public constructor(public payload: any) {}
}

export class FetchImportExportAction implements Action {
  public readonly type = EExportEntitiesActions.FETCH_IMPORT_EXPORT_DATA;
  public constructor(public payload: any) {}
}

export class FetchImportExportActionSuccess implements Action {
  public readonly type = EExportEntitiesActions.FETCH_IMPORT_EXPORT_DATA_SUCCESS;
  public constructor(public payload: any) {}
}

export class CreateSnapshotDetails implements Action {
  public readonly type = EExportEntitiesActions.CREATE_EXPORT_SNAPSHOT;
  public constructor(public payload: any) {}
}

export class CreateSnapshotDetailsSuccess implements Action {
  public readonly type = EExportEntitiesActions.CREATE_EXPORT_SNAPSHOT_SUCCESS;
  public constructor(public payload: any) {}
}

export class GetSnapshotListToBeCreated implements Action {
  public readonly type = EExportEntitiesActions.GET_SNAPSHOT_LIST_TO_BE_CREATED;
  constructor(public payload?: any) {}
}

export class GetSnapshotById implements Action {
  public readonly type = EExportEntitiesActions.GET_SNAPSHOT_LIST_BY_ID;
  constructor(public payload?: any) {}
}

export class GetSnapshotListSuccess implements Action {
  public readonly type = EExportEntitiesActions.GET_SNAPSHOT_SUCCESS;
  constructor(public payload?: any) {}
}

export class POSTIMPORTDATA implements Action {
  public readonly type = EExportEntitiesActions.POSTIMPORTDATA;
  constructor(public payload?: any) {}
}

export class POSTIMPORTDATASUCCESS implements Action {
  public readonly type = EExportEntitiesActions.POSTIMPORTDATASUCCESS;
  constructor(public payload?: any) {}
}

export type ExportEntitiesAction =
  | GetExportEntitiesList
  | GetExportSchema
  | GetExportEntitiesSuccess
  | GetExportSchemaSuccess
  | PostExportSchema
  | PostExportSchemaSuccess
  | PostImportSchema
  | FetchImportExportActionSuccess
  | FetchImportExportAction
  | PostImportSchemaSuccess
  | CreateSnapshotDetailsSuccess
  | CreateSnapshotDetails
  | GetSnapshotListSuccess
  | GetSnapshotListToBeCreated
  | GetSnapshotById
  | POSTIMPORTDATA
  | POSTIMPORTDATASUCCESS
  | GetImportEntitiesList
  | DownloadSnapshot
  | DownloadSnapshotSuccess
  | GetImportEntitiesListSuccess;
