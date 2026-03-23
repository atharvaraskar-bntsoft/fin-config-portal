import { Action } from '@ngrx/store';
import {
  TransactionTypeGetObject,
  GetByIdObject,
  UpdateObject,
} from '@app/models/transaction-type.interface';

export enum ETransactionTypeActions {
  GetTransactionType = '[TransactionType] Get Transaction Type',
  GetTransactionTypeSuccess = '[TransactionType] Get Transaction Type Success',
  PostTransactionType = '[TransactionType] Post Transaction Type',
  PostTransactionTypeSuccess = '[TransactionType] Post Transaction Type Success',
  GetByIdTransactionType = '[TransactionType] GetById Transaction Type',
  GetByIdTransactionTypeSuccess = '[TransactionType] GetById Transaction Type Success',
  UpdateTransactionType = '[TransactionType] Update Transaction Type',
  UpdateTransactionTypeSuccess = '[TransactionType] Update Transaction Type Success',
  ClearState = '[TransactionType] Clear State Transaction Type',
}
export class GetTransactionType implements Action {
  public readonly type = ETransactionTypeActions.GetTransactionType;
  constructor(public payload?: any) {}
}

export class GetTransactionTypeSuccess implements Action {
  public readonly type = ETransactionTypeActions.GetTransactionTypeSuccess;
  constructor(public payload: TransactionTypeGetObject) {}
}

export class PostTransactionType implements Action {
  public readonly type = ETransactionTypeActions.PostTransactionType;
  constructor(public payload: any) {}
}

export class PostTransactionTypeSuccess implements Action {
  public readonly type = ETransactionTypeActions.PostTransactionTypeSuccess;
  constructor(public payload: UpdateObject) {}
}

export class GetByIdTransactionType implements Action {
  public readonly type = ETransactionTypeActions.GetByIdTransactionType;
  constructor(public payload: any) {}
}
export class GetByIdTransactionTypeSuccess implements Action {
  public readonly type = ETransactionTypeActions.GetByIdTransactionTypeSuccess;
  constructor(public payload: GetByIdObject) {}
}

export class UpdateTransactionType implements Action {
  public readonly type = ETransactionTypeActions.UpdateTransactionType;
  constructor(public payload: any) {}
}

export class UpdateTransactionTypeSuccess implements Action {
  public readonly type = ETransactionTypeActions.UpdateTransactionTypeSuccess;
  constructor(public payload: UpdateObject) {}
}

export class ClearState implements Action {
  public readonly type = ETransactionTypeActions.ClearState;
}
export type TransactionTypeActions =
  | GetTransactionType
  | GetTransactionTypeSuccess
  | PostTransactionType
  | PostTransactionTypeSuccess
  | GetByIdTransactionType
  | GetByIdTransactionTypeSuccess
  | UpdateTransactionType
  | UpdateTransactionTypeSuccess
  | ClearState;
