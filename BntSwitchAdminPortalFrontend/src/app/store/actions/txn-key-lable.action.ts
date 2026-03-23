import { Action } from '@ngrx/store';


export enum ETxnKeyLableActions {
    GetTxnKeyLableType = '[TxnKeyLable] Get Txn Key Lable Type',
    GetTxnKeyLableTypeSuccess = '[TxnKeyLable] Get Txn Key Lable Type Success',
    GetByIdTxnKeyLableType = '[TxnKeyLable] Get Id Txn Key Lable Type',
    GetByIdTxnKeyLableTypeSuccess = '[TxnKeyLable] Get Id Txn Key Lable Type Success',
    DeleteTxnKeyLableType = '[TxnKeyLable] Delete Txn Key Lable Type',
    DeleteTxnKeyLableTypeSuccess = '[TxnKeyLable] Delete Txn Key Lable Type Success',
    PostTxnKeyLableType = '[TxnKeyLable] Post Txn Key Lable Type',
    PostTxnKeyLableTypeSuccess = '[TxnKeyLable] Post Txn Key Lable Type Success',
    UpdateTxnKeyLableType = '[TxnKeyLable] Update Txn Key Lable Type',
    UpdateTxnKeyLableTypeSuccess = '[TxnKeyLable] Update Txn Key Lable Type Success',
    ClearState = '[TxnKeyLable] Clear state',
}
export class DeleteTxnKeyLableType implements Action {
  public readonly type = ETxnKeyLableActions.DeleteTxnKeyLableType;
  constructor(public payload: any) {}
}
export class DeleteTxnKeyLableTypeSuccess implements Action {
  public readonly type = ETxnKeyLableActions.DeleteTxnKeyLableTypeSuccess;
  constructor(public payload: any) {}
}

export class GetTxnKeyLableType implements Action {
  public readonly type = ETxnKeyLableActions.GetTxnKeyLableType;
  constructor(public payload?: any) {}
}

export class GetTxnKeyLableTypeSuccess implements Action {
  public readonly type = ETxnKeyLableActions.GetTxnKeyLableTypeSuccess;
  constructor(public payload: any) {}
}

export class GetByIdTxnKeyLableType implements Action {
  public readonly type = ETxnKeyLableActions.GetByIdTxnKeyLableType;
  constructor(public payload?: any) {}
}

export class GetByIdTxnKeyLableTypeSuccess implements Action {
  public readonly type = ETxnKeyLableActions.GetByIdTxnKeyLableTypeSuccess;
  constructor(public payload: any) {}
}

export class PostTxnKeyLableType implements Action {
  public readonly type = ETxnKeyLableActions.PostTxnKeyLableType;
  constructor(public payload: any) {}
}

export class PostTxnKeyLableTypeSuccess implements Action {
  public readonly type = ETxnKeyLableActions.PostTxnKeyLableTypeSuccess;
  constructor(public payload: any) {}
}

export class UpdateTxnKeyLableType implements Action {
  public readonly type = ETxnKeyLableActions.UpdateTxnKeyLableType;
  constructor(public payload: any) {}
}

export class UpdateTxnKeyLableTypeSuccess implements Action {
  public readonly type = ETxnKeyLableActions.UpdateTxnKeyLableTypeSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = ETxnKeyLableActions.ClearState;
}
export type TxnKeyLableActions =
  | GetTxnKeyLableType
  | GetTxnKeyLableTypeSuccess
  | GetByIdTxnKeyLableType
  | GetByIdTxnKeyLableTypeSuccess
  | DeleteTxnKeyLableType
  | DeleteTxnKeyLableTypeSuccess
  | PostTxnKeyLableType
  | PostTxnKeyLableTypeSuccess
  | UpdateTxnKeyLableType
  | UpdateTxnKeyLableTypeSuccess
  | ClearState;
