import { Action } from '@ngrx/store';
import { SchemeImfMapperGetObject } from '@app/models/scheme-imf-mapper.interface';

export enum ESchemeImfMapperActions {
  GetSchemeImfMapper = '[SchemeImfMapper] Get Scheme Imf Mapper',
  GetSchemeImfMapperSuccess = '[SchemeImfMapper] Get Scheme Imf Mapper Success',
  GetScheme = '[SchemeImfMapper] Get Scheme',
  GetSchemeSuccess = '[SchemeImfMapper] Get Scheme Success',
  GetField = '[SchemeImfMapper] Get Field',
  GetFieldSuccess = '[SchemeImfMapper]  Get Field Success',
  GetIMF = '[SchemeImfMapper] Get IMF',
  GetIMFSuccess = '[SchemeImfMapper] Get IMF Success',
  GetIPC = '[SchemeImfMapper] Get IPC',
  GetIPCSuccess = '[SchemeImfMapper] Get IPC Success',
  GetMap = '[SchemeImfMapper] Get Map',
  GetMapSuccess = '[SchemeImfMapper] Get Map Success',
  SchemeImfMapperSave = '[SchemeImfMapper] Scheme Imf Mapper Save',
  SchemeImfMapperSaveSuccess = '[SchemeImfMapper] Scheme Imf Mapper Save Success',
  GetElFunction = '[SchemeImfMapper] Get El Function',
  GetElFunctionSuccess = '[SchemeImfMapper] Get El Function Success',
  GetIMFVersion = '[SchemeImfMapper] Get IMF Version',
  GetIMFVersionSuccess = '[SchemeImfMapper] Get IMF Version Success',
  GetServiceType = '[SchemeImfMapper] Get Service Type ',
  GetServiceTypeSuccess = '[SchemeImfMapper] Get Service Type Success',
  GetInBuiltMapper = '[SchemeImfMapper] Get InBuiltMapper',
  GetInBuiltMapperSuccess = '[SchemeImfMapper] Get InBuiltMapper Success',
  ClearState = '[SchemeImfMapper] Clear state',
}

export class GetSchemeImfMapper implements Action {
  public readonly type = ESchemeImfMapperActions.GetSchemeImfMapper;
  constructor(public payload?: any) {}
}
export class GetSchemeImfMapperSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetSchemeImfMapperSuccess;
  constructor(public payload: SchemeImfMapperGetObject) {}
}

export class GetScheme implements Action {
  public readonly type = ESchemeImfMapperActions.GetScheme;
}

export class GetSchemeSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetSchemeSuccess;
  constructor(public payload: any) {}
}

export class GetField implements Action {
  public readonly type = ESchemeImfMapperActions.GetField;
  constructor(public payload: any) {}
}

export class GetFieldSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetFieldSuccess;
  constructor(public payload: any) {}
}

export class GetIMF implements Action {
  public readonly type = ESchemeImfMapperActions.GetIMF;
  constructor(public payload: any) {}
}

export class GetIMFSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetIMFSuccess;
  constructor(public payload: any) {}
}

export class GetIPC implements Action {
  public readonly type = ESchemeImfMapperActions.GetIPC;
}

export class GetIPCSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetIPCSuccess;
  constructor(public payload: any) {}
}

export class GetMap implements Action {
  public readonly type = ESchemeImfMapperActions.GetMap;
}

export class GetMapSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetMapSuccess;
  constructor(public payload: any) {}
}

export class SchemeImfMapperSave implements Action {
  public readonly type = ESchemeImfMapperActions.SchemeImfMapperSave;
  constructor(public payload: any) {}
}

export class SchemeImfMapperSaveSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.SchemeImfMapperSaveSuccess;
  constructor(public payload: any) {}
}

export class GetElFunction implements Action {
  public readonly type = ESchemeImfMapperActions.GetElFunction;
}

export class GetElFunctionSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetElFunctionSuccess;
  constructor(public payload: any) {}
}
export class GetIMFVersion implements Action {
  public readonly type = ESchemeImfMapperActions.GetIMFVersion;
}
export class GetIMFVersionSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetIMFVersionSuccess;
  constructor(public payload: any) {}
}
export class GetServiceType implements Action {
  public readonly type = ESchemeImfMapperActions.GetServiceType;
}
export class GetServiceTypeSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetServiceTypeSuccess;
  constructor(public payload: any) {}
}
export class ClearState implements Action {
  public readonly type = ESchemeImfMapperActions.ClearState;
}

export class GetInBuiltMapper implements Action {
  public readonly type = ESchemeImfMapperActions.GetInBuiltMapper;
  constructor(public payload: any) {}
}

export class GetInBuiltMapperSuccess implements Action {
  public readonly type = ESchemeImfMapperActions.GetInBuiltMapperSuccess;
  constructor(public payload: any) {}
}

export type SchemeImfMapperActions =
  | GetSchemeImfMapper
  | GetSchemeImfMapperSuccess
  | GetScheme
  | GetSchemeSuccess
  | GetField
  | GetFieldSuccess
  | GetIMFSuccess
  | GetIMF
  | GetIPC
  | GetIPCSuccess
  | GetMap
  | GetMapSuccess
  | SchemeImfMapperSave
  | SchemeImfMapperSaveSuccess
  | GetElFunction
  | GetElFunctionSuccess
  | GetIMFVersion
  | GetIMFVersionSuccess
  | GetServiceType
  | GetServiceTypeSuccess
  | GetInBuiltMapper
  | GetInBuiltMapperSuccess
  | ClearState;
