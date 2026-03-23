import { Action } from '@ngrx/store';

export enum EImfJsonActions {
  GetImfJson = '[LogsAccess] Get Imf Json',
  GetImfJsonSuccess = '[LogsAccess] Get Imf Json Success',
  GetImfTypeListJson = '[LogsAccess] Get Imf Type List',
  GetImfTypeListJsonSuccess = '[LogsAccess] Get Imf Type List Success',
  GetImfJsonView = '[LogsAccess] Get Imf Json View',
  GetImfJsonViewSuccess = '[LogsAccess] Get Imf Json View Success',
  CreateImfJson = '[LogsAccess] Create Imf Json',
  CreateImfJsonSuccess = '[LogsAccess] Create Imf Json Success',
  UpdateImfJson = '[LogsAccess] Update Imf Json',
  UpdateImfJsonSuccess = '[LogsAccess] Update Imf Json Success',
  SingleImfJson = '[LogsAccess] Single Imf Json',
  SingleImfJsonSuccess = '[LogsAccess] Single Imf Json Success',
  DeleteImfJson = '[LogsAccess] Delete Imf Json',
  DeleteImfJsonSuccess = '[LogsAccess] Delete Imf Json Success',
  LatestImfJson = '[LogsAccess] Latest Imf Json',
  LatestImfJsonSuccess = '[LogsAccess] Latest Imf Json Success',
  UserViewJson = '[LogsAccess] UserView Json',
  UserViewSuccess = '[LogsAccess] UserView Json Success',
  GetTemplateJson = '[LogsAccess] Get Template Json',
  GetTemplateJsonSuccess = '[LogsAccess] Get Template Json Success',
  GetTemplateDetailsJson = '[LogsAccess] Get Template Details Json',
  GetTemplateDetailsJsonSuccess = '[LogsAccess] Get Template Details Json Success',
  GetImfJsonById = '[LogsAccess] Get Imf Json By Id',
  GetImfJsonByIdSuccess = '[LogsAccess] Get Imf Json By Id Success',
  ClearState = '[GetHsmKeys] Clear Ifm Json',
}

export class DeleteImfJson implements Action {
  public readonly type = EImfJsonActions.DeleteImfJson;
  constructor(public payload?: any) {}
}

export class DeleteImfJsonSuccess implements Action {
  public readonly type = EImfJsonActions.DeleteImfJsonSuccess;
  constructor(public payload: any) {}
}

export class GetImfTypeListJson implements Action {
  public readonly type = EImfJsonActions.GetImfTypeListJson;
  constructor(public payload?: any) {}
}

export class GetImfTypeListJsonSuccess implements Action {
  public readonly type = EImfJsonActions.GetImfTypeListJsonSuccess;
  constructor(public payload: any) {}
}

export class LatestImfJson implements Action {
  public readonly type = EImfJsonActions.LatestImfJson;
  constructor(public payload?: any) {}
}

export class LatestImfJsonSuccess implements Action {
  public readonly type = EImfJsonActions.LatestImfJsonSuccess;
  constructor(public payload: any) {}
}

export class UserViewJson implements Action {
  public readonly type = EImfJsonActions.UserViewJson;
  constructor(public payload: any) {}
}

export class UserViewSuccess implements Action {
  public readonly type = EImfJsonActions.UserViewSuccess;
  constructor(public payload: any) {}
}

export class GetImfJson implements Action {
  public readonly type = EImfJsonActions.GetImfJson;
  constructor(public payload?: any) {}
}

export class GetImfJsonSuccess implements Action {
  public readonly type = EImfJsonActions.GetImfJsonSuccess;
  constructor(public payload: any) {}
}

export class GetImfJsonView implements Action {
  public readonly type = EImfJsonActions.GetImfJsonView;
  constructor(public payload?: any) {}
}

export class GetImfJsonViewSuccess implements Action {
  public readonly type = EImfJsonActions.GetImfJsonViewSuccess;
  constructor(public payload: any) {}
}

export class CreateImfJson implements Action {
  public readonly type = EImfJsonActions.CreateImfJson;
  constructor(public payload?: any) {}
}
export class CreateImfJsonSuccess implements Action {
  public readonly type = EImfJsonActions.CreateImfJsonSuccess;
  constructor(public payload: any) {}
}

export class UpdateImfJson implements Action {
  public readonly type = EImfJsonActions.UpdateImfJson;
  constructor(public payload?: any) {}
}
export class UpdateImfJsonSuccess implements Action {
  public readonly type = EImfJsonActions.UpdateImfJsonSuccess;
  constructor(public payload: any) {}
}

export class SingleImfJson implements Action {
  public readonly type = EImfJsonActions.SingleImfJson;
  constructor(public payload?: any) {}
}
export class SingleImfJsonSuccess implements Action {
  public readonly type = EImfJsonActions.SingleImfJsonSuccess;
  constructor(public payload: any) {}
}
export class GetTemplateJson implements Action {
  public readonly type = EImfJsonActions.GetTemplateJson;
  constructor(public payload?: any) {}
}
export class GetTemplateJsonSuccess implements Action {
  public readonly type = EImfJsonActions.GetTemplateJsonSuccess;
  constructor(public payload: any) {}
}
export class GetTemplateDetailsJson implements Action {
  public readonly type = EImfJsonActions.GetTemplateDetailsJson;
  constructor(public payload?: any) {}
}
export class GetTemplateDetailsJsonSuccess implements Action {
  public readonly type = EImfJsonActions.GetTemplateDetailsJsonSuccess;
  constructor(public payload: any) {}
}

export class GetImfJsonById implements Action {
  public readonly type = EImfJsonActions.GetImfJsonById;
  constructor(public payload: any) {}
}
export class GetImfJsonByIdSuccess implements Action {
  public readonly type = EImfJsonActions.GetImfJsonByIdSuccess;
  constructor(public payload: any) {}
}
export class ClearState implements Action {
  public readonly type = EImfJsonActions.ClearState;
}

export type ImfJsonActions =
  | GetImfJson
  | LatestImfJson
  | LatestImfJsonSuccess
  | GetImfJsonSuccess
  | CreateImfJson
  | CreateImfJsonSuccess
  | UpdateImfJson
  | UpdateImfJsonSuccess
  | SingleImfJson
  | SingleImfJsonSuccess
  | GetImfJsonView
  | GetImfJsonViewSuccess
  | GetTemplateJson
  | GetTemplateJsonSuccess
  | GetTemplateDetailsJson
  | GetTemplateDetailsJsonSuccess
  | UserViewJson
  | UserViewSuccess
  | ClearState
  | GetImfTypeListJson
  | GetImfTypeListJsonSuccess
  | DeleteImfJson
  | DeleteImfJsonSuccess
  | GetImfJsonById
  | GetImfJsonByIdSuccess;
