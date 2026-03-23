import { Action } from '@ngrx/store';

import { IDashboard } from '../../models/dashboard.interface';

export enum EDashboardActions {
  GetDashboard = '[Dashboard] Get Dashboard',
  GetDashboardSuccess = '[Dashboard] Get Dashboard Success',
}

export class GetDashboard implements Action {
  public readonly type = EDashboardActions.GetDashboard;
  constructor(public payload?: any) {}
}

export class GetDashboardSuccess implements Action {
  public readonly type = EDashboardActions.GetDashboardSuccess;
  constructor(public payload: IDashboard[]) {}
}

export type DashboardActions = GetDashboard | GetDashboardSuccess;
