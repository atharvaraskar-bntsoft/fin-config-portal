import { Action } from "@ngrx/store";

export enum EDekActions {
    GetDek = '[Dek] Get Dek',
    GetDekSuccess = '[Dek] Get Dek Success',
    PostDek = '[Dek] Post Dek',
    PostDekSuccess = '[Dek] Post Dek Success',
    ClearState = '[Dek] Clear State',
}

export class GetDek implements Action {
    public readonly type = EDekActions.GetDek;
    constructor(public payload?: any) {}
}

export class GetDekSuccess implements Action {
    public readonly type = EDekActions.GetDekSuccess;
    constructor(public payload: any) {}
}

export class PostDek implements Action {
    public readonly type = EDekActions.PostDek;
    constructor(public payload: any) {}
}

export class PostDekSuccess implements Action {
    public readonly type = EDekActions.PostDekSuccess;
    constructor(public payload: any) {}
}

export class ClearState implements Action {
    public readonly type = EDekActions.ClearState;
}

export type DekActions = GetDek | GetDekSuccess | PostDek | PostDekSuccess | ClearState;