import { Action } from '@ngrx/store';

export enum EActivationActions {
  VerifyActivation = '[Activation] Verify Activation',
  VerifyActivationSuccess = '[Activation] Verify Activation Success',
  PostActivation = '[Activation] Post Activation',
  PostActivationSuccess = '[Activation] Post Activation Success',
}
export class VerifyActivation implements Action {
  public readonly type = EActivationActions.VerifyActivation;
  constructor(public payload?: any) {}
}

export class VerifyActivationSuccess implements Action {
  public readonly type = EActivationActions.VerifyActivationSuccess;
  constructor(public payload: any) {}
}
export class PostActivation implements Action {
  public readonly type = EActivationActions.PostActivation;
  constructor(public payload?: any) {}
}

export class PostActivationSuccess implements Action {
  public readonly type = EActivationActions.PostActivationSuccess;
  constructor(public payload: any) {}
}
export type ActivationActions =
  | VerifyActivation
  | VerifyActivationSuccess
  | PostActivation
  | PostActivationSuccess;
