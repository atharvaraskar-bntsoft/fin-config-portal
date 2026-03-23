import { Action } from '@ngrx/store';

import { UserRoleGetObject } from '../../models/user-roles.interface';

export enum EUserRolesActions {
  DeleteUserRoles = '[User] Delete User Roles',
  DeleteUserRolesSuccess = '[User] Delete User Roles Success',
  GetUserRoles = '[User] Get User Roles',
  GetUserRolesSuccess = '[User] Get User Roles Success',
  GetUserRolesDetails = '[User] Get User Roles Details',
  GetUserRolesDetailsSuccess = '[User] Get User Roles Details Success',
  GetUserRolesFunctionList = '[User] Get User Roles Function List',
  GetUserRolesFunctionListSuccess = '[User] Get User Roles Function List Success',
  PostUserRoles = '[User] Post User Roles',
  PostUserRolesSuccess = '[User] Post User Roles Success',
  PutUserRoles = '[User] Put User Roles',
  PutUserRolesSuccess = '[User] Put User Roles Success',
  PutUserRolesStatus = '[User] Put User Roles Status',
  PutUserRolesStatusSuccess = '[User] Put User Roles Status Success',
  ClearState = '[Clear User Role] Clear State User Role',
  GetAdminRoleCheck = '[User] Get Admin Role',
  GetAdminRoleCheckSuccess = '[User] Get Admin Role Success',
}

export class DeleteUserRoles implements Action {
  public readonly type = EUserRolesActions.DeleteUserRoles;
  constructor(public payload: any) {}
}

export class DeleteUserRolesSuccess implements Action {
  public readonly type = EUserRolesActions.DeleteUserRolesSuccess;
  constructor(public payload: any) {}
}

export class GetUserRoles implements Action {
  public readonly type = EUserRolesActions.GetUserRoles;
  constructor(public payload?: any) {}
}

export class GetUserRolesSuccess implements Action {
  public readonly type = EUserRolesActions.GetUserRolesSuccess;
  constructor(public payload: UserRoleGetObject) {}
}

export class GetUserRolesDetails implements Action {
  public readonly type = EUserRolesActions.GetUserRolesDetails;
  constructor(public payload: any) {}
}

export class GetAdminRoleCheck implements Action {
  public readonly type = EUserRolesActions.GetAdminRoleCheck;
  constructor(public payload?: any) {}
}

export class GetAdminRoleCheckSuccess implements Action {
  public readonly type = EUserRolesActions.GetAdminRoleCheckSuccess;
  constructor(public payload: any) {}
}

export class GetUserRolesDetailsSuccess implements Action {
  public readonly type = EUserRolesActions.GetUserRolesDetailsSuccess;
  constructor(public payload: any) {}
}

export class GetUserRolesFunctionList implements Action {
  public readonly type = EUserRolesActions.GetUserRolesFunctionList;
}

export class GetUserRolesFunctionListSuccess implements Action {
  public readonly type = EUserRolesActions.GetUserRolesFunctionListSuccess;
  constructor(public payload: any) {}
}

export class PostUserRoles implements Action {
  public readonly type = EUserRolesActions.PostUserRoles;
  constructor(public payload: any) {}
}

export class PostUserRolesSuccess implements Action {
  public readonly type = EUserRolesActions.PostUserRolesSuccess;
  constructor(public payload: any) {}
}

export class PutUserRoles implements Action {
  public readonly type = EUserRolesActions.PutUserRoles;
  constructor(public payload: any) {}
}

export class PutUserRolesSuccess implements Action {
  public readonly type = EUserRolesActions.PutUserRolesSuccess;
  constructor(public payload: any) {}
}

export class PutUserRolesStatus implements Action {
  public readonly type = EUserRolesActions.PutUserRolesStatus;
  constructor(public payload: any) {}
}

export class PutUserRolesStatusSuccess implements Action {
  public readonly type = EUserRolesActions.PutUserRolesStatusSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EUserRolesActions.ClearState;
}

export type UserRolesActions =
  | GetUserRoles
  | GetUserRolesSuccess
  | DeleteUserRoles
  | DeleteUserRolesSuccess
  | GetUserRolesDetails
  | GetUserRolesDetailsSuccess
  | GetUserRolesFunctionList
  | GetUserRolesFunctionListSuccess
  | PostUserRoles
  | PostUserRolesSuccess
  | PutUserRoles
  | PutUserRolesSuccess
  | PutUserRolesStatus
  | PutUserRolesStatusSuccess
  | ClearState
  | GetAdminRoleCheckSuccess
  | GetAdminRoleCheck;
