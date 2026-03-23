import { IImportStatus, ImportFileState, initialImportFileState } from '../state/import-file.state';
import { ImportFileAction, ImportFileTypes } from '../actions/import-file.action';

export function ImportFileReducer(
  state = initialImportFileState,
  action: ImportFileAction,
): ImportFileState {
  switch (action.type) {
    case ImportFileTypes.UPLOAD_REQUEST: {
      return {
        ...state,
        error: null,
        progress: null,
        status: IImportStatus.Requested,
      };
    }
    case ImportFileTypes.UPLOAD_CANCEL: {
      return {
        ...state,
        error: null,
        progress: null,
        status: IImportStatus.Ready,
      };
    }
    case ImportFileTypes.UPLOAD_RESET: {
      return {
        ...state,
        error: null,
        progress: null,
        status: IImportStatus.Ready,
      };
    }
    case ImportFileTypes.UPLOAD_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        progress: null,
        status: IImportStatus.Failed,
      };
    }
    case ImportFileTypes.UPLOAD_STARTED: {
      return {
        ...state,
        progress: 0,
        status: IImportStatus.Started,
      };
    }
    case ImportFileTypes.UPLOAD_PROGRESS: {
      return {
        ...state,
        progress: action.payload.progress,
      };
    }
    case ImportFileTypes.UPLOAD_COMPLETED: {
      return {
        ...state,
        error: null,
        progress: 100,
        status: IImportStatus.Completed,
      };
    }
    case ImportFileTypes.UPLOAD_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        error: null,
        progress: 100,
        status: IImportStatus.Completed,
      };
    }
    case ImportFileTypes.UPLOAD_CLEAR: {
      return {
        ...state,
        data: null,
        error: null,
        progress: null,
        status: IImportStatus.Ready,
      };
    }
    default: {
      return state;
    }
  }
}
