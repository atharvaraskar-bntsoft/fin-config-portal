import { Action } from '@ngrx/store';


export enum ECorePropertiesActions {
    GetCoreProperties = '[CoreProperties] Get Core Properties',
    GetCorePropertiesSuccess = '[CoreProperties] Get Core Properties Success',
    GetDefaultCoreProperties = '[CoreProperties] Get Default Core Properties',
    GetDefaultCorePropertiesSuccess = '[CoreProperties] Get Default Core Properties Success',
    GetByIdCoreProperties = '[CoreProperties] Get Id Core Properties',
    GetByIdCorePropertiesSuccess = '[CoreProperties] Get Id Core Properties Success',
    PostCoreProperties = '[CoreProperties] Post Core Properties',
    PostCorePropertiesSuccess = '[CoreProperties] Post Core Properties Success',
    UpdateCoreProperties = '[CoreProperties] Update Core Properties',
    UpdateCorePropertiesSuccess = '[CoreProperties] Update Core Properties Success',
    ClearState = '[CoreProperties] Clear state',
}

export class GetCoreProperties implements Action {
  public readonly type = ECorePropertiesActions.GetCoreProperties;
  constructor(public payload?: any) {}
}

export class GetCorePropertiesSuccess implements Action {
  public readonly type = ECorePropertiesActions.GetCorePropertiesSuccess;
  constructor(public payload: any) {}
}

export class GetDefaultCoreProperties implements Action {
    public readonly type = ECorePropertiesActions.GetDefaultCoreProperties;
    constructor(public payload?: any) {}
  }
  
  export class GetDefaultCorePropertiesSuccess implements Action {
    public readonly type = ECorePropertiesActions.GetDefaultCorePropertiesSuccess;
    constructor(public payload: any) {}
  }

export class GetByIdCoreProperties implements Action {
  public readonly type = ECorePropertiesActions.GetByIdCoreProperties;
  constructor(public payload?: any) {}
}

export class GetByIdCorePropertiesSuccess implements Action {
  public readonly type = ECorePropertiesActions.GetByIdCorePropertiesSuccess;
  constructor(public payload: any) {}
}

export class PostCoreProperties implements Action {
  public readonly type = ECorePropertiesActions.PostCoreProperties;
  constructor(public payload: any) {}
}

export class PostCorePropertiesSuccess implements Action {
  public readonly type = ECorePropertiesActions.PostCorePropertiesSuccess;
  constructor(public payload: any) {}
}

export class UpdateCoreProperties implements Action {
  public readonly type = ECorePropertiesActions.UpdateCoreProperties;
  constructor(public payload: any) {}
}

export class UpdateCorePropertiesSuccess implements Action {
  public readonly type = ECorePropertiesActions.UpdateCorePropertiesSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = ECorePropertiesActions.ClearState;
}
export type CorePropertiesActions =
  | GetCoreProperties
  | GetCorePropertiesSuccess
  | GetDefaultCoreProperties
  | GetDefaultCorePropertiesSuccess
  | GetByIdCoreProperties
  | GetByIdCorePropertiesSuccess
  | PostCoreProperties
  | PostCorePropertiesSuccess
  | UpdateCoreProperties
  | UpdateCorePropertiesSuccess
  | ClearState;
