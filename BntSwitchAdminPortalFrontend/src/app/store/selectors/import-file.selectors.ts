import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { IImportStatus, ImportFileState } from '../state/import-file.state';

export const getError = (state: ImportFileState) => state.error;

export const getStarted = (state: ImportFileState) => state.status === IImportStatus.Started;

export const getRequested = (state: ImportFileState) => state.status === IImportStatus.Requested;

export const getReady = (state: ImportFileState) => state.status === IImportStatus.Ready;

export const getProgress = (state: ImportFileState) => state.progress;

export const getInProgress = (state: ImportFileState) =>
  state.status === IImportStatus.Started && state.progress >= 0;

export const getFailed = (state: ImportFileState) => state.status === IImportStatus.Failed;

export const getCompleted = (state: ImportFileState) => state.status === IImportStatus.Completed;

export const getSuccess = (state: ImportFileState) => state;

export const selectUploadFileFeatureState: MemoizedSelector<object, ImportFileState> =
  createFeatureSelector<ImportFileState>('uploadFile');

export const selectUploadFileError: MemoizedSelector<object, string> = createSelector(
  selectUploadFileFeatureState,
  getError,
);

export const selectUploadFileReady = createSelector(selectUploadFileFeatureState, getReady);

export const selectUploadFileRequested = createSelector(selectUploadFileFeatureState, getRequested);

export const selectUploadFileStarted = createSelector(selectUploadFileFeatureState, getStarted);

export const selectUploadFileProgress = createSelector(selectUploadFileFeatureState, getProgress);

export const selectUploadFileInProgress = createSelector(
  selectUploadFileFeatureState,
  getInProgress,
);

export const selectUploadFileFailed = createSelector(selectUploadFileFeatureState, getFailed);

export const selectUploadFileCompleted = createSelector(selectUploadFileFeatureState, getCompleted);

export const selectUploadFileSuccess = createSelector(selectUploadFileFeatureState, getSuccess);
