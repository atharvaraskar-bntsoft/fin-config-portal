import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { EDashboardActions, GetDashboard, GetDashboardSuccess } from '../actions/dashboard.actions';
import { DashboardService } from '../../services/dashboard.service';

@Injectable()
export class DashboardEffects {
  
  GetDashboard$ = createEffect(() => this._actions$.pipe(
    ofType<GetDashboard>(EDashboardActions.GetDashboard),
    switchMap(data => this._dashboardService.getDashboard()),
    switchMap((dashboardData: any) => {
      return of(new GetDashboardSuccess(dashboardData.data));
    }),
  ));

  constructor(private _dashboardService: DashboardService, private _actions$: Actions) {}
}
