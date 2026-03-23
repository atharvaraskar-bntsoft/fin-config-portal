import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IExportEntitiesState } from '../state/export-entities.state';

export const exportEntities = (state: IAppState) => state.exportEntities;

export const selectExportEntities = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.exportEntities,
);

export const selectDownloadSnapshot = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.downloadSnapshot,
);

export const selectExportSchema = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.exportEntitiesSchema,
);

export const selectExportSchemaId = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.exportEntitiesPost,
);

export const selectImportSchema = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.importEntitiesPost,
);

export const importExportSelector = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.importExportList,
);

export const snapshotList = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.snapshotList,
);

export const createdSnapshotResponse = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.createdResponse,
);
export const importDataResponse = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.importData,
);
export const importDataList = createSelector(
  exportEntities,
  (state: IExportEntitiesState) => state.importList,
);
