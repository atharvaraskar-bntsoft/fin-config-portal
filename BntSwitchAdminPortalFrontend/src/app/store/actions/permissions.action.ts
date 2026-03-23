import { Action } from '@ngrx/store';

export enum EPermissionsActions {
  GetPermission = '[Permission] Get Permission',
  GetPermissionSuccess = '[Permission] Get Permission Success',
}

export class GetPermission implements Action {
  public readonly type = EPermissionsActions.GetPermission;
}

export class GetPermissionSuccess implements Action {
  public readonly type = EPermissionsActions.GetPermissionSuccess;

  constructor(public payload: any) {}
}

export type PermissionsActions = GetPermission | GetPermissionSuccess;
