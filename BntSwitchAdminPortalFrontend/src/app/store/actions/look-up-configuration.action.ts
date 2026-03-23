import { Action } from '@ngrx/store';
import { MerchantGetObject } from '@app/models/merchant-code-mapping.interface';

export enum ELookUpConfigurationActions {
  GetLookUpType = '[LookUp] Get Look Up Type',
  GetLookUpTypeSuccess = '[LookUp] Get Look Up Type Success',
  DeleteLookUpType = '[LookUp] Delete Look Up Type',
  DeleteLookUpTypeSuccess = '[LookUp] Delete Look Up Type Success',
  PostLookUpType = '[LookUp] Post Look Up Type',
  PostLookUpTypeSuccess = '[LookUp] Post Look Up Type Success',
  UpdateLookUpType = '[LookUp] Update Look Up Type',
  UpdateLookUpTypeSuccess = '[LookUp] Update Look Up Type Success',
  GetLookUpValue = '[LookUp] Get Look Up Value',
  GetLookUpValueSuccess = '[LookUp] Get Look Up Value Success',
  UpdateLookUpValue = '[LookUp] Update Look Up Value',
  UpdateLookUpValueSuccess = '[LookUp] Update Look Up Value Success',
  ClearState = '[LookUp] Clear state',
}
export class DeleteLookUpType implements Action {
  public readonly type = ELookUpConfigurationActions.DeleteLookUpType;
  constructor(public payload: any) {}
}
export class DeleteLookUpTypeSuccess implements Action {
  public readonly type = ELookUpConfigurationActions.DeleteLookUpTypeSuccess;
  constructor(public payload: any) {}
}

export class GetLookUpType implements Action {
  public readonly type = ELookUpConfigurationActions.GetLookUpType;
  constructor(public payload?: any) {}
}

export class GetLookUpTypeSuccess implements Action {
  public readonly type = ELookUpConfigurationActions.GetLookUpTypeSuccess;
  constructor(public payload: any) {}
}

export class PostLookUpType implements Action {
  public readonly type = ELookUpConfigurationActions.PostLookUpType;
  constructor(public payload: any) {}
}

export class PostLookUpTypeSuccess implements Action {
  public readonly type = ELookUpConfigurationActions.PostLookUpTypeSuccess;
  constructor(public payload: any) {}
}

export class UpdateLookUpType implements Action {
  public readonly type = ELookUpConfigurationActions.UpdateLookUpType;
  constructor(public payload: any) {}
}

export class UpdateLookUpTypeSuccess implements Action {
  public readonly type = ELookUpConfigurationActions.UpdateLookUpTypeSuccess;
  constructor(public payload: any) {}
}

export class GetLookUpValue implements Action {
  public readonly type = ELookUpConfigurationActions.GetLookUpValue;
  constructor(public payload?: any) {}
}

export class GetLookUpValueSuccess implements Action {
  public readonly type = ELookUpConfigurationActions.GetLookUpValueSuccess;
  constructor(public payload: any) {}
}

export class UpdateLookUpValue implements Action {
  public readonly type = ELookUpConfigurationActions.UpdateLookUpValue;
  constructor(public payload: any) {}
}

export class UpdateLookUpValueSuccess implements Action {
  public readonly type = ELookUpConfigurationActions.UpdateLookUpValueSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = ELookUpConfigurationActions.ClearState;
}
export type LookUpConfigurationActions =
  | GetLookUpType
  | GetLookUpTypeSuccess
  | DeleteLookUpType
  | DeleteLookUpTypeSuccess
  | PostLookUpType
  | PostLookUpTypeSuccess
  | UpdateLookUpType
  | UpdateLookUpTypeSuccess
  | GetLookUpValue
  | GetLookUpValueSuccess
  | UpdateLookUpValue
  | UpdateLookUpValueSuccess
  | ClearState;
