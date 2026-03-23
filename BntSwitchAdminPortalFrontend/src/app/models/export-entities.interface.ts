export interface EntitiesList {
  id: number;
  comment: string;
  createdOn: any;
  createdBy: number;
  updatedOn: any;
  data: string;
}

export interface GetEntityListData {
  'total-record': number;
  entitiesList: EntitiesList[];
  'page-no': number;
  'total-filtered-record': number;
}

export interface GetEntityListObject {
  status: string;
  message: string;
  data: GetEntityListData;
}

export interface Entite {
  id: number;
  entityName: string;
}

export interface Data {
  entites: Entite[];
  comment?: any;
}

export interface GetEntitySchemaObject {
  status: string;
  message: string;
  data: Data;
}
export interface GetEntitySchemaPost {
  status: string;
  message: string;
  data: Data;
}

export interface GetImportEntitySchemaPost {
  status: string;
  message: string;
  data: Data;
}
