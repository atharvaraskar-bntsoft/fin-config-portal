import { Action } from '@ngrx/store';

export enum EMasterConfigurationActions {
  GET_ALL_MASTER_CONFIGUERATION = '[Master Configuration] Get All Master Configuration',
  GET_ALL_MASTER_CONFIGUERATION_SUCCESS = '[Master Configuration] Get All Master Configuration Success',
  EDIT_CURRENT_MASTER_CONFIGURATION = '[Master Configuration] Edit Current Master Configuration',
  EDIT_CURRENT_MASTER_CONFIGURATION_SUCCESS = '[Master Configuration] Edit Current Master Configuration Success',
  MODIFY_CURRENT_MASTER_CONFIGURATION = '[Master Configuration] Update Master Configuration',
  MODIFY_CURRENT_MASTER_CONFIGURATION_SUCCESS = '[Master Configuration] Update Master Configuration Success',
}

export class GetAllMasterConfiguration implements Action {
  readonly type = EMasterConfigurationActions.GET_ALL_MASTER_CONFIGUERATION;
  constructor(payload?: any) {}
}

export class GetAllMasterConfigurationSuccess implements Action {
  readonly type = EMasterConfigurationActions.GET_ALL_MASTER_CONFIGUERATION_SUCCESS;
  constructor(public payload: any) {}
}

export class EditCurrentMasterConfiguration implements Action {
  readonly type = EMasterConfigurationActions.EDIT_CURRENT_MASTER_CONFIGURATION;
  constructor(payload: any) {}
}

export class EditCurrentMasterConfigurationSuccess implements Action {
  readonly type = EMasterConfigurationActions.EDIT_CURRENT_MASTER_CONFIGURATION_SUCCESS;
  constructor(payload: any) {}
}

export class UpdateMasterConfigurationDetails implements Action {
  readonly type = EMasterConfigurationActions.MODIFY_CURRENT_MASTER_CONFIGURATION;
  constructor(public payload: any) {}
}

export class UpdateMasterConfigurationDetailsSuccess implements Action {
  readonly type = EMasterConfigurationActions.MODIFY_CURRENT_MASTER_CONFIGURATION_SUCCESS;
  constructor(public payload: any) {}
}

export type MasterConfigurationActions =
  | EditCurrentMasterConfigurationSuccess
  | EditCurrentMasterConfiguration
  | GetAllMasterConfigurationSuccess
  | GetAllMasterConfiguration
  | UpdateMasterConfigurationDetails
  | UpdateMasterConfigurationDetailsSuccess;
