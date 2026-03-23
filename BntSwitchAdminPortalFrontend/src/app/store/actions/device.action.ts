import { Action } from '@ngrx/store';
import { EInstitutionActions } from '@app/store/actions/institution.action';
import { DeviceGetObject } from '@app/models/device.interface';

export enum EDeviceActions {
  GetDevice = '[Device] Get Device',
  GetDeviceSuccess = '[Device] Get Device Success',
  GetDeviceDetail = '[Device] Get Device Detail',
  GetDeviceDetailSuccess = '[Device] Get Device Detail Success',
  GetDeviceTypes = '[Device] get Device Types',
  GetDeviceTypesSuccess = '[Device] get Device Types Success',
  GetInstitutionList = '[Device] get Institution Group',
  GetInstitutionListSuccess = '[Device] get Institution Group Success',
  GetInstitutionGroupList = '[Device] get Institution Group List',
  GetInstitutionGroupListSuccess = '[Device] get Institution Group List Success',
  GetTreeDeepDevice = '[Device] Get Tree Deep Device',
  GetTreeDeepDeviceSuccess = '[Device] Get Tree Deep Device Success',
  GetLocationList = '[Device] get Location',
  GetLocationListSuccess = '[Device] get Location Success',
  GetDeviceModelMapping = '[Device] Get Device Model Mapping',
  GetDeviceModelMappingSuccess = '[Device] Get Device Model Mapping Success',
  ClearState = '[Device] Clear State Device',
}

export class GetDevice implements Action {
  public readonly type = EDeviceActions.GetDevice;
  constructor(public payload?: any) {}
}

export class GetDeviceSuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceSuccess;

  constructor(public payload: DeviceGetObject) {}
}

export class GetTreeDeepDevice implements Action {
  public readonly type = EDeviceActions.GetTreeDeepDevice;
  constructor(public payload?: any) {}
}

export class GetTreeDeepDeviceSuccess implements Action {
  public readonly type = EDeviceActions.GetTreeDeepDeviceSuccess;

  constructor(public payload: any) {}
}

export class GetDeviceDetail implements Action {
  public readonly type = EDeviceActions.GetDeviceDetail;

  constructor(public payload: any) {}
}

export class GetDeviceDetailSuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceDetailSuccess;

  constructor(public payload: any) {}
}

export class GetDeviceTypes implements Action {
  public readonly type = EDeviceActions.GetDeviceTypes;
}

export class GetDeviceTypesSuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceTypesSuccess;

  constructor(public payload: any) {}
}

export class GetLocationList implements Action {
  public readonly type = EDeviceActions.GetLocationList;
  constructor(public payload?: any) {}
}

export class GetLocationListSuccess implements Action {
  public readonly type = EDeviceActions.GetLocationListSuccess;

  constructor(public payload: any) {}
}

export class GetInstitutionGroupList implements Action {
  public readonly type = EDeviceActions.GetInstitutionGroupList;
}

export class GetInstitutionGroupListSuccess implements Action {
  public readonly type = EDeviceActions.GetInstitutionGroupListSuccess;

  constructor(public payload: any) {}
}

export class GetInstitutionList implements Action {
  public readonly type = EDeviceActions.GetInstitutionList;
  constructor(public payload?: any) {}
}

export class GetInstitutionListSuccess implements Action {
  public readonly type = EDeviceActions.GetInstitutionListSuccess;

  constructor(public payload: any) {}
}

export class GetDeviceModelMapping implements Action {
  public readonly type = EDeviceActions.GetDeviceModelMapping;

  constructor(public payload?: any) {}
}

export class GetDeviceModelMappingSuccess implements Action {
  public readonly type = EDeviceActions.GetDeviceModelMappingSuccess;

  constructor(public payload?: any) {}
}

export class ClearState implements Action {
  public readonly type = EDeviceActions.ClearState;
}

export type DeviceAction =
  | GetDevice
  | GetDeviceSuccess
  | GetDeviceDetail
  | GetDeviceDetailSuccess
  | GetTreeDeepDeviceSuccess
  | GetTreeDeepDevice
  | GetDeviceTypes
  | GetDeviceTypesSuccess
  | GetInstitutionList
  | GetInstitutionListSuccess
  | GetInstitutionGroupList
  | GetInstitutionGroupListSuccess
  | GetLocationList
  | GetLocationListSuccess
  | GetDeviceModelMapping
  | GetDeviceModelMappingSuccess
  | ClearState;
