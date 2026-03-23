import { Action } from '@ngrx/store';

export enum EBinTableActions {
  GetBinTable = '[BinTable] Get Bin Table',
  GetBinTableSuccess = '[BinTable] Get Bin Table Success',
  GetBinTableAll = '[BinTable] Get Bin Table All',
  GetBinTableAllSuccess = '[BinTable] Get Bin Table All Success',
  GetAccountType = '[BinTable] Get Account Type',
  GetAccountTypeSuccess = '[BinTable] Get Account Type Success',
  GetBinTableDetails = '[BinTable] Get Bin Table Details',
  GetBinTableDetailsSuccess = '[BinTable] Get Bin Table Details Success',
  GetAccountTypeDetails = '[BinTable] Get Account Type Details',
  GetAccountTypeDetailsSuccess = '[BinTable] Get Account Type Details Success',
  ClearState = '[BinTable] Clear state',
  GetBinMaster = '[BinTable] Get Bin Master',
  GetBinMasterSuccess = '[BinTable] Get Bin Master Success',
  GetBinMasterAll = '[BinTable] Get Bin Master All',
  GetBinMasterAllSuccess = '[BinTable] Get Bin Master All Success',
  GetBinTableData = '[BinTable] Get Bin Table Data',
  GetBinTableDataSuccess = '[BinTable] Get Bin Table Data Success',
  UploadFile = '[BinTable] Upload File',
  UploadFileSuccess = '[BinTable] Upload File Success',
}

export class GetBinTable implements Action {
  public readonly type = EBinTableActions.GetBinTable;
  constructor(public payload?: any) {}
}

export class GetBinTableSuccess implements Action {
  public readonly type = EBinTableActions.GetBinTableSuccess;
  constructor(public payload: any) {}
}

export class GetBinTableAll implements Action {
  public readonly type = EBinTableActions.GetBinTableAll;
  constructor(public payload?: any) {}
}

export class GetBinTableAllSuccess implements Action {
  public readonly type = EBinTableActions.GetBinTableAllSuccess;
  constructor(public payload: any) {}
}

export class GetAccountType implements Action {
  public readonly type = EBinTableActions.GetAccountType;
  constructor(public payload?: any) {}
}

export class GetAccountTypeSuccess implements Action {
  public readonly type = EBinTableActions.GetAccountTypeSuccess;
  constructor(public payload: any) {}
}

export class GetBinTableDetails implements Action {
  public readonly type = EBinTableActions.GetBinTableDetails;
  constructor(public payload: any) {}
}

export class GetBinTableDetailsSuccess implements Action {
  public readonly type = EBinTableActions.GetBinTableDetailsSuccess;
  constructor(public payload: any) {}
}

export class GetAccountTypeDetails implements Action {
  public readonly type = EBinTableActions.GetAccountTypeDetails;
  constructor(public payload: any) {}
}

export class GetAccountTypeDetailsSuccess implements Action {
  public readonly type = EBinTableActions.GetAccountTypeDetailsSuccess;
  constructor(public payload: any) {}
}

export class GetBinMaster implements Action {
  public readonly type = EBinTableActions.GetBinMaster;
  constructor(public payload?: any) {}
}

export class GetBinMasterSuccess implements Action {
  public readonly type = EBinTableActions.GetBinMasterSuccess;
  constructor(public payload: any) {}
}

export class GetBinMasterAll implements Action {
  public readonly type = EBinTableActions.GetBinMasterAll;
  constructor(public payload?: any) {}
}

export class GetBinMasterAllSuccess implements Action {
  public readonly type = EBinTableActions.GetBinMasterAllSuccess;
  constructor(public payload: any) {}
}

export class GetBinTableData implements Action {
  public readonly type = EBinTableActions.GetBinTableData;
  constructor(public payload?: any) {}
}

export class GetBinTableDataSuccess implements Action {
  public readonly type = EBinTableActions.GetBinTableDataSuccess;
  constructor(public payload: any) {}
}
export class UploadFile implements Action {
  public readonly type = EBinTableActions.UploadFile;
  constructor(public payload: any) {}
}

export class UploadFileSuccess implements Action {
  public readonly type = EBinTableActions.UploadFileSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EBinTableActions.ClearState;
}
export type BinTableActions =
  | GetBinTable
  | GetBinTableAllSuccess
  | GetBinTableAll
  | GetBinTableSuccess
  | GetBinTableDetails
  | GetBinTableDetailsSuccess
  | GetBinMaster
  | GetBinMasterSuccess
  | GetBinMasterAll
  | GetBinMasterAllSuccess
  | GetBinTableData
  | GetBinTableDataSuccess
  | ClearState
  | UploadFileSuccess
  | GetAccountTypeDetailsSuccess
  | GetAccountTypeSuccess
  | GetAccountType
  | GetAccountTypeDetails
  | UploadFile;
