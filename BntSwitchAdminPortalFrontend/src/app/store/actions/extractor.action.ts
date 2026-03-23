import { Action } from '@ngrx/store';

export enum EextractorActions {
  GetExtractor = '[Extractor] Get Extractor',
  ClearState = '[Extractor] Clear State Extractor',
  GetExtractorSuccess = '[Extractor] GetextractorSuccess',
  PutExtractor = '[Extractor] PutExtractor  ',
  PutExtractorSuccess = '[Extractor] PutExtractorSuccess  ',
  PutDeviceSuccess = '[Extractor] PutDeviceSuccess',
  StartExtractor = '[Extractor] Start Extractor',
  StartExtractorSuccess = '[Extractor] Start Extractor Success',
  StopExtractor = '[Extractor] Stop Extractor',
  StopExtractorSuccess = '[Extractor] Stop Extractor Success',
  PauseExtractor = '[Extractor] Pause Extractor',
  PauseExtractorSuccess = '[Extractor] Pause Extractor Success',
  ResumeExtractor = '[Extractor] Resume Extractor',
  ResumeExtractorSuccess = '[Extractor] Resume Extractor Success',
}

export class GetExtractor implements Action {
  public readonly type = EextractorActions.GetExtractor;
  constructor(public payload?: any) {}
}

export class GetExtractorSuccess implements Action {
  public readonly type = EextractorActions.GetExtractorSuccess;

  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = EextractorActions.ClearState;
}

export class PutExtractor implements Action {
  public readonly type = EextractorActions.PutExtractor;

  constructor(public payload: any) {}
}
export class PutExtractorSuccess implements Action {
  public readonly type = EextractorActions.PutExtractorSuccess;

  constructor(public payload: any) {}
}

export class StartExtractor implements Action {
  public readonly type = EextractorActions.StartExtractor;
  constructor(public payload?: any) {}
}

export class StartExtractorSuccess implements Action {
  public readonly type = EextractorActions.StartExtractorSuccess;
  constructor(public payload: any) {}
}

export class StopExtractor implements Action {
  public readonly type = EextractorActions.StopExtractor;
  constructor(public payload?: any) {}
}

export class StopExtractorSuccess implements Action {
  public readonly type = EextractorActions.StopExtractorSuccess;
  constructor(public payload: any) {}
}

export class PauseExtractor implements Action {
  public readonly type = EextractorActions.PauseExtractor;
  constructor(public payload?: any) {}
}

export class PauseExtractorSuccess implements Action {
  public readonly type = EextractorActions.PauseExtractorSuccess;
  constructor(public payload: any) {}
}

export class ResumeExtractor implements Action {
  public readonly type = EextractorActions.ResumeExtractor;
  constructor(public payload?: any) {}
}

export class ResumeExtractorSuccess implements Action {
  public readonly type = EextractorActions.ResumeExtractorSuccess;
  constructor(public payload: any) {}
}

export type ExtractorAction =
  | GetExtractor
  | GetExtractorSuccess
  | PutExtractor
  | PutExtractorSuccess
  | StartExtractorSuccess
  | StartExtractor
  | StopExtractorSuccess
  | StopExtractor
  | PauseExtractorSuccess
  | PauseExtractor
  | ResumeExtractorSuccess
  | ResumeExtractor
  | ClearState;
