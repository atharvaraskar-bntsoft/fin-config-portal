import { Action } from '@ngrx/store';

export enum ELoginActions {
  LOGIN = '[AUTH] Login',
  LoginReset = '[AUTH] Login Reset',
  ResetPassword = '[AUTH] Reset Password',
  ResetPasswordSuccess = '[AUTH] Reset Password Success',
  LoginSucess = '[AUTH] LoginSucess',
}

export class LOGIN implements Action {
  public readonly type = ELoginActions.LOGIN;
  constructor(public payload: any) {}
}

export class LoginReset implements Action {
  public readonly type = ELoginActions.LoginReset;
}

export class LoginSucess implements Action {
  public readonly type = ELoginActions.LoginSucess;
  constructor(public payload: any) {}
}

export class ResetPassword implements Action {
  public readonly type = ELoginActions.ResetPassword;
  constructor(public payload: any) {}
}

export class ResetPasswordSuccess implements Action {
  public readonly type = ELoginActions.ResetPasswordSuccess;
  constructor(public payload: any) {}
}

export type LoginActions = LOGIN | LoginSucess | LoginReset | ResetPassword | ResetPasswordSuccess;
