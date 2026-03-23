import { Action } from '@ngrx/store';

export enum EforgetPass {
  PostToken = '[PostTokens] Post Token Password',
  PostTokenSuccess = '[PostTokensSuccess] Post Token Password Success',
}

export class PostToken implements Action {
  public readonly type = EforgetPass.PostToken;
  constructor(public payload: any) {}
}

export class PostTokenSuccess implements Action {
  public readonly type = EforgetPass.PostTokenSuccess;
  constructor(public payload: any) {}
}

export type forgetPass = PostToken | PostTokenSuccess;
