import { Action } from '@ngrx/store';

export enum ImportFileTypes {
  UPLOAD_REQUEST = '[File Upload Form] Request',
  UPLOAD_CANCEL = '[File Upload Form] Cancel',
  UPLOAD_RESET = '[File Upload Form] Reset',
  UPLOAD_STARTED = '[File Upload API] Started',
  UPLOAD_PROGRESS = '[File Upload API] Progress',
  UPLOAD_FAILURE = '[File Upload API] Failure',
  UPLOAD_COMPLETED = '[File Upload API] Success',
  UPLOAD_SUCCESS = '[File Upload API] Upload Success',
  UPLOAD_CLEAR = '[File Upload API] Clear State Success',
  IMPORT_FILE = '[File Upload API] Import File',
}

export class ImportFile implements Action {
  readonly type = ImportFileTypes.IMPORT_FILE;
  constructor(public payload) {}
}

export class UploadRequestAction implements Action {
  readonly type = ImportFileTypes.UPLOAD_REQUEST;
  constructor(public payload) {}
}

export class UploadCancelAction implements Action {
  readonly type = ImportFileTypes.UPLOAD_CANCEL;
}

export class UploadResetAction implements Action {
  readonly type = ImportFileTypes.UPLOAD_RESET;
}

export class UploadStartedAction implements Action {
  readonly type = ImportFileTypes.UPLOAD_STARTED;
}

export class UploadProgressAction implements Action {
  readonly type = ImportFileTypes.UPLOAD_PROGRESS;
  constructor(public payload: { progress: number }) {}
}

export class UploadFailureAction implements Action {
  readonly type = ImportFileTypes.UPLOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UploadCompletedAction implements Action {
  readonly type = ImportFileTypes.UPLOAD_COMPLETED;
}

export class UploadSuccessAction implements Action {
  readonly type = ImportFileTypes.UPLOAD_SUCCESS;
  constructor(public payload: any) {}
}

export class ClearStateAction implements Action {
  readonly type = ImportFileTypes.UPLOAD_CLEAR;
}

export type ImportFileAction =
  | UploadRequestAction
  | UploadCancelAction
  | UploadResetAction
  | UploadStartedAction
  | UploadProgressAction
  | UploadFailureAction
  | UploadCompletedAction
  | UploadSuccessAction
  | ClearStateAction
  | ImportFile;
