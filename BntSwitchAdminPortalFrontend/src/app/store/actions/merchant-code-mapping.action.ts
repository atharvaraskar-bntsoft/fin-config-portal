import { Action } from '@ngrx/store';
import { MerchantGetObject } from '@app/models/merchant-code-mapping.interface';

export enum EMerchantCodeMappingActions {
  GetMerchantCodeMapping = '[MerchantCodeMapping] Get Merchant Code Mapping',
  GetMerchantCodeMappingSuccess = '[MerchantCodeMapping] Get Merchant Code Mapping Success',
  DeleteMerchantCodeMapping = '[MerchantCodeMapping] Delete Merchant Code Mapping',
  DeleteMerchantCodeMappingSuccess = '[MerchantCodeMapping] Delete Merchant Code Mapping Success',
  GetRowMerchantCodeMapping = '[MerchantCodeMapping] Get Merchant Code Mapping Row',
  GetRowMerchantCodeMappingSuccess = '[MerchantCodeMapping] Get Merchant Code Mapping Row Success',
  PostMerchantCodeMapping = '[MerchantCodeMapping] Post Merchant Code Mapping',
  PostMerchantCodeMappingSuccess = '[MerchantCodeMapping] Post Merchant Code Mapping Success',
  UpdateMerchantCodeMapping = '[MerchantCodeMapping] Update Merchant Code Mapping',
  UpdateMerchantCodeMappingSuccess = '[MerchantCodeMapping] Update Merchant Code Mapping Success',
  GetMerchantConfigureData = '[MerchantCodeMapping] Get Merchant Configure Data',
  GetMerchantConfigureDataSuccess = '[MerchantCodeMapping] Get Merchant Configure Data Success',
  ClearState = '[MerchantCodeMapping] Clear state',
}
export class DeleteMerchantCodeMapping implements Action {
  public readonly type = EMerchantCodeMappingActions.DeleteMerchantCodeMapping;
  constructor(public payload: any) {}
}
export class DeleteMerchantCodeMappingSuccess implements Action {
  public readonly type = EMerchantCodeMappingActions.DeleteMerchantCodeMappingSuccess;
  constructor(public payload: any) {}
}

export class GetMerchantCodeMapping implements Action {
  public readonly type = EMerchantCodeMappingActions.GetMerchantCodeMapping;
  constructor(public payload?: any) {}
}

export class GetMerchantCodeMappingSuccess implements Action {
  public readonly type = EMerchantCodeMappingActions.GetMerchantCodeMappingSuccess;
  constructor(public payload: MerchantGetObject) {}
}

export class GetRowMerchantCodeMapping implements Action {
  public readonly type = EMerchantCodeMappingActions.GetRowMerchantCodeMapping;
  constructor(public payload: any) {}
}

export class GetRowMerchantCodeMappingSuccess implements Action {
  public readonly type = EMerchantCodeMappingActions.GetRowMerchantCodeMappingSuccess;
  constructor(public payload: any) {}
}
export class PostMerchantCodeMapping implements Action {
  public readonly type = EMerchantCodeMappingActions.PostMerchantCodeMapping;
  constructor(public payload: any) {}
}

export class PostMerchantCodeMappingSuccess implements Action {
  public readonly type = EMerchantCodeMappingActions.PostMerchantCodeMappingSuccess;
  constructor(public payload: any) {}
}

export class UpdateMerchantCodeMapping implements Action {
  public readonly type = EMerchantCodeMappingActions.UpdateMerchantCodeMapping;
  constructor(public payload: any) {}
}

export class UpdateMerchantCodeMappingSuccess implements Action {
  public readonly type = EMerchantCodeMappingActions.UpdateMerchantCodeMappingSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EMerchantCodeMappingActions.ClearState;
}
export class GetMerchantConfigureData implements Action {
  public readonly type = EMerchantCodeMappingActions.GetMerchantConfigureData;
  constructor(public payload?: any) {}
}

export class GetMerchantConfigureDataSuccess implements Action {
  public readonly type = EMerchantCodeMappingActions.GetMerchantConfigureDataSuccess;
  constructor(public payload: MerchantGetObject) {}
}
export type MerchantCodeMappingActions =
  | GetMerchantCodeMapping
  | GetMerchantCodeMappingSuccess
  | DeleteMerchantCodeMapping
  | DeleteMerchantCodeMappingSuccess
  | GetRowMerchantCodeMapping
  | GetRowMerchantCodeMappingSuccess
  | PostMerchantCodeMapping
  | PostMerchantCodeMappingSuccess
  | UpdateMerchantCodeMapping
  | UpdateMerchantCodeMappingSuccess
  | GetMerchantConfigureData
  | GetMerchantConfigureDataSuccess
  | ClearState;
