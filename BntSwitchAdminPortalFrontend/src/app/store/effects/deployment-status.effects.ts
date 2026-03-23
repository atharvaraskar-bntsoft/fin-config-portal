import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  GetDeploymentStatus,
  EDeploymentStatusActions,
  GetDeploymentStatusSuccess,
} from '../actions/deployment-status.action';
import { DeploymentStatusService } from '@app/services/deployment-status.service';

@Injectable()
export class DeploymentStatussEffects {
  
  GetDeploymentStatuss$ = createEffect(() => this._actions$.pipe(
    ofType<GetDeploymentStatus>(EDeploymentStatusActions.GetDeploymentStatus),
    switchMap(payload => this._DeploymentStatusService.getDeploymentStatusUrl(payload)),
    switchMap((response: any) => {
      return of(new GetDeploymentStatusSuccess(response));
    }),
  ));

  constructor(
    private _DeploymentStatusService: DeploymentStatusService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
