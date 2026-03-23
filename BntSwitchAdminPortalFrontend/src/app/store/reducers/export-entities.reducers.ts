import { IExportEntitiesState, initialExportEntitiesState } from '../state/export-entities.state';
import { EExportEntitiesActions, ExportEntitiesAction } from '../actions/export-entities.action';

export function ExportEntitiesReducers(
  state = initialExportEntitiesState,
  action: ExportEntitiesAction,
): IExportEntitiesState {
  switch (action.type) {
    case EExportEntitiesActions.GetExportEntitiesSuccess: {
      return {
        ...state,
        exportEntities: action.payload,
      };
    }

    case EExportEntitiesActions.DownloadSnapshotSuccess: {
      return {
        ...state,
        downloadSnapshot: action.payload,
      };
    }
    case EExportEntitiesActions.GetImportEntitiesListSuccess: {
      return {
        ...state,
        importList: action.payload,
      };
    }
    case EExportEntitiesActions.GetExportSchemaSuccess: {
      return {
        ...state,
        exportEntitiesSchema: action.payload,
      };
    }
    case EExportEntitiesActions.PostExportSchemaSuccess: {
      return {
        ...state,
        exportEntitiesPost: action.payload,
      };
    }
    case EExportEntitiesActions.PostImportSchemaSuccess: {
      return {
        ...state,
        importEntitiesPost: action.payload,
      };
    }
    case EExportEntitiesActions.FETCH_IMPORT_EXPORT_DATA_SUCCESS: {
      return {
        ...state,
        importExportList: action.payload,
      };
    }
    case EExportEntitiesActions.GET_SNAPSHOT_SUCCESS: {
      return {
        ...state,
        snapshotList: action.payload,
      };
    }
    case EExportEntitiesActions.CREATE_EXPORT_SNAPSHOT_SUCCESS: {
      return {
        ...state,
        createdResponse: action.payload,
      };
    }
    case EExportEntitiesActions.POSTIMPORTDATASUCCESS: {
      return {
        ...state,
        importData: action.payload,
      };
    }
    default:
      return state;
  }
}
