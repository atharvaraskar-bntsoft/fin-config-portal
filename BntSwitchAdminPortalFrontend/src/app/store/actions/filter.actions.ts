import { Action } from '@ngrx/store';
import { GetCategoryCode } from '@app/store/actions/institution.action';

export enum EFilterActions {
  GetFilterData = '[Filter] Get Filter Data',
  ClearFilterData = '[Filter] Clear Filter Data',
  GetFilterDataSuccess = '[Filter Get Filter Data Success',
}

export class GetFilterData implements Action {
  readonly type = EFilterActions.GetFilterData;
  constructor(public payload: any) {}
}

export class ClearFilterData implements Action {
  readonly type = EFilterActions.ClearFilterData;
}

export class GetFilterDataSuccess implements Action {
  readonly type = EFilterActions.GetFilterDataSuccess;
  constructor(public payload: any) {}
}

export type FilterActions = GetFilterData | GetFilterDataSuccess | ClearFilterData;
