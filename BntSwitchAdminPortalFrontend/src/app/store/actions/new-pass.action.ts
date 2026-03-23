import { Action } from '@ngrx/store';

export enum ENewPass {
  PostNewPass = '[PostNewPass] Post New Pass',
  PostNewPassSuccess = '[PostNewPassSuccess] Post New Pass Success',
}

export class PostNewPass implements Action {
  public readonly type = ENewPass.PostNewPass;
  constructor(public payload: any) {}
}

export class PostNewPassSuccess implements Action {
  public readonly type = ENewPass.PostNewPassSuccess;
  constructor(public payload: any) {}
}

export type newPass = PostNewPass | PostNewPassSuccess;
