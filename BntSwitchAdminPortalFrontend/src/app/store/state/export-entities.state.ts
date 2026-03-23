import {
  GetEntitySchemaObject,
  GetEntityListObject,
  GetEntitySchemaPost,
  GetImportEntitySchemaPost,
} from '@app/models/export-entities.interface';

export interface IExportEntitiesState {
  exportEntitiesSchema: GetEntitySchemaObject;
  exportEntities: GetEntityListObject;
  exportEntitiesPost: GetEntitySchemaPost;
  importEntitiesPost: GetImportEntitySchemaPost;
  importExportList: any;
  snapshotList: any;
  createdResponse: any;
  importData: any;
  importList: any;
  downloadSnapshot: any;
}

export const initialExportEntitiesState: IExportEntitiesState = {
  exportEntities: null,
  exportEntitiesPost: null,
  exportEntitiesSchema: null,
  importData: null,
  importList: null,
  importEntitiesPost: null,
  importExportList: null,
  snapshotList: null,
  createdResponse: null,
  downloadSnapshot: null,
};
