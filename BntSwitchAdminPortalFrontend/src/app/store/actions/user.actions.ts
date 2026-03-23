import { Action } from '@ngrx/store';

import { UserGetObject } from '../../models/user.interface';

export enum EUserActions {
  DeleteUsers = '[User] Delete Users',
  DeleteUsersSuccess = '[User] Delete Users Success',
  GetUsers = '[User] Get Users',
  GetUsersSuccess = '[User] Get Users Success',
  GetUsersDetails = '[User] Get Users Details',
  GetUsersDetailsSuccess = '[User] Get Users Details Success',
  GetUsersRoleList = '[User] Users Role List',
  GetUsersRoleListSuccess = '[User] Users Role List Success',
  GetUser = '[User] Get User',
  GetUserSuccess = '[User] Get User Success',
  PostUsers = '[User] Post Users',
  PostUsersSuccess = '[User] Post Users Success',
  PutUsers = '[User] Put Users',
  PutUsersSuccess = '[User] Put Users Success',
  PutUsersStatus = '[User] Put Users Status',
  PutUsersStatusSuccess = '[User] Put Users Status Success',
  ClearState = '[Clear User] Clear State User',
}

export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
  constructor(public payload?: any) {}
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: UserGetObject) {}
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
  constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: any) {}
}

export class DeleteUsers implements Action {
  public readonly type = EUserActions.DeleteUsers;
  constructor(public payload: any) {}
}

export class DeleteUsersSuccess implements Action {
  public readonly type = EUserActions.DeleteUsersSuccess;
  constructor(public payload: any) {}
}

export class PostUsers implements Action {
  public readonly type = EUserActions.PostUsers;
  constructor(public payload: any) {}
}

export class PostUsersSuccess implements Action {
  public readonly type = EUserActions.PostUsersSuccess;
  constructor(public payload: any) {}
}

export class PutUsersStatus implements Action {
  public readonly type = EUserActions.PutUsersStatus;
  constructor(public payload: any) {}
}

export class PutUsersStatusSuccess implements Action {
  public readonly type = EUserActions.PutUsersStatusSuccess;
  constructor(public payload: any) {}
}

export class PutUsers implements Action {
  public readonly type = EUserActions.PutUsers;
  constructor(public payload: any) {}
}

export class PutUsersSuccess implements Action {
  public readonly type = EUserActions.PutUsersSuccess;
  constructor(public payload: any) {}
}

export class GetUsersDetails implements Action {
  public readonly type = EUserActions.GetUsersDetails;
  constructor(public payload: any) {}
}

export class GetUsersDetailsSuccess implements Action {
  public readonly type = EUserActions.GetUsersDetailsSuccess;
  constructor(public payload: any) {}
}

export class GetUsersRoleList implements Action {
  public readonly type = EUserActions.GetUsersRoleList;
}

export class GetUsersRoleListSuccess implements Action {
  public readonly type = EUserActions.GetUsersRoleListSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EUserActions.ClearState;
}

export type UserActions =
  | GetUsers
  | GetUsersSuccess
  | GetUser
  | GetUserSuccess
  | DeleteUsers
  | DeleteUsersSuccess
  | PostUsers
  | PostUsersSuccess
  | PutUsers
  | PutUsersSuccess
  | PutUsersStatus
  | PutUsersStatusSuccess
  | GetUsersDetails
  | GetUsersDetailsSuccess
  | GetUsersRoleList
  | GetUsersRoleListSuccess
  | ClearState;
