import { Action } from '@ngrx/store';
import { ProfileGetObject } from '@app/models/profile.interface';

export enum EProfileActions {
  GetLogout = '[Logout] Get Logout',
  GetLogoutSuccess = '[Logout] Get Logout Success',
  GetProfile = '[Profile] Get Profile List',
  GetProfileSuccess = '[Profile] Get Profile List Success',
  PostChangePassword = '[Change Password] Post Change Password',
  PostChangePasswordSuccess = '[Change Password] Post Change Password Success',
  UpdateProfile = '[Profile] Update Profile',
  UpdateProfileSuccess = '[Profile] Update Profile Success',
  ClearState = '[Profile] Clear state',
}

export class ClearState implements Action {
  public readonly type = EProfileActions.ClearState;
}

export class GetLogout implements Action {
  public readonly type = EProfileActions.GetLogout;
}

export class GetLogoutSuccess implements Action {
  public readonly type = EProfileActions.GetLogoutSuccess;
  constructor(public payload: any) {}
}

export class GetProfile implements Action {
  public readonly type = EProfileActions.GetProfile;
}

export class GetProfileSuccess implements Action {
  public readonly type = EProfileActions.GetProfileSuccess;
  constructor(public payload: ProfileGetObject) {}
}

export class PostChangePassword implements Action {
  public readonly type = EProfileActions.PostChangePassword;
  constructor(public payload: any) {}
}

export class PostChangePasswordSuccess implements Action {
  public readonly type = EProfileActions.PostChangePasswordSuccess;
  constructor(public payload: any) {}
}

export class UpdateProfile implements Action {
  public readonly type = EProfileActions.UpdateProfile;
  constructor(public payload: any) {}
}

export class UpdateProfileSuccess implements Action {
  public readonly type = EProfileActions.UpdateProfileSuccess;
  constructor(public payload: any) {}
}

export type ProfileActions =
  | GetLogout
  | GetLogoutSuccess
  | GetProfile
  | GetProfileSuccess
  | PostChangePassword
  | PostChangePasswordSuccess
  | UpdateProfile
  | UpdateProfileSuccess
  | ClearState;
