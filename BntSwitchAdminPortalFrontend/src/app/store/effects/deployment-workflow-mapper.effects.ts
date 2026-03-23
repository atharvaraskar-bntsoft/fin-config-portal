import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import {
  EDeploymentWorkflowActions,
  GetDeploymentWorkflow,
  GetDeploymentWorkflowSuccess,
  GetByIdDeploymentWorkflow,
  GetByIdDeploymentWorkflowSuccess,
} from '../actions/deployment-workflow-mapper.action';
import { DeploymentWorkflowService } from '@app/services/deployment-workflow-mapper.service';

@Injectable()
export class DeploymentWorkflowEffects {
  
  GetDeploymentWorkflow$ = createEffect(() => this._actions$.pipe(
    ofType<GetDeploymentWorkflow>(EDeploymentWorkflowActions.GetDeploymentWorkflow),
    switchMap(payload => this._DeploymentWorkflowService.getDeploymentWorkflowUrl(payload)),
    switchMap((response: any) => {
      return of(new GetDeploymentWorkflowSuccess(response));
    }),
  ));

  
  GetByIdDeploymentWorkflow$ = createEffect(() => this._actions$.pipe(
    ofType<GetByIdDeploymentWorkflow>(EDeploymentWorkflowActions.GetByIdDeploymentWorkflow),
    switchMap(data => this._DeploymentWorkflowService.getByIdDeploymentWorkflowUrl(data.payload)),
    switchMap((response: any) => {
      return of(new GetByIdDeploymentWorkflowSuccess(response));
    }),
  ));
  constructor(
    private _DeploymentWorkflowService: DeploymentWorkflowService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
