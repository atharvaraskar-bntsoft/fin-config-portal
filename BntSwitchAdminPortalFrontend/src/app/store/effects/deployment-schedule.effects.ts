import {
  FetchNonScheduleAction,
  EDeploymentScheduleActions,
  FetchNonScheduleSuccessAction,
  FetchScheduledAction,
  FetchScheduledSuccessAction,
  CreateComponentAction,
  CreateComponentSuccessAction,
  FetchClusterListAction,
  FetchClusterListSuccessAction,
  FetchCorePropertiesListAction,
  FetchCorePropertiesListSuccessAction,
  EditComponentAction,
  EditComponentSuccessAction,
} from './../actions/deployment-schedule.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeploymentScheduleService } from '@app/services/deployment-schedule.service';
import { AlertService } from '@app/services/alert.service';

@Injectable()
export class DeployedScheduledEffects {
  constructor(
    private _actions$: Actions,
    private deploymentScheduleService: DeploymentScheduleService,
    private alertService: AlertService,
  ) {}
  
  GetDeployemntNonScheduleComponents$ = createEffect(() => this._actions$.pipe(
    ofType<FetchNonScheduleAction>(EDeploymentScheduleActions.FetchNonSchedule),
    switchMap(_ => this.deploymentScheduleService.getCurrentNonScheduledDeployments()),
    switchMap(response => of(new FetchNonScheduleSuccessAction(response))),
  ));

  
  GetDeployedScheduledComponents$ = createEffect(() => this._actions$.pipe(
    ofType<FetchScheduledAction>(EDeploymentScheduleActions.FetchNonSchedule),
    switchMap(_ => this.deploymentScheduleService.getCurrentScheduledDeployments()),
    switchMap(res => of(new FetchScheduledSuccessAction(res))),
  ));

  
  SaveScheduledComponent$ = createEffect(() => this._actions$.pipe(
    ofType<CreateComponentAction>(EDeploymentScheduleActions.CreateComponent),
    switchMap(body => this.deploymentScheduleService.saveSelectedDeployment(body.payload)),
    switchMap(res => {
      this.alertService.responseMessage(res);
      return of(new CreateComponentSuccessAction(res));
    }),
  ));

  
  FetchClusterList$ = createEffect(() => this._actions$.pipe(
    ofType<FetchClusterListAction>(EDeploymentScheduleActions.FetchClusterList),
    switchMap(_ => this.deploymentScheduleService.fetchClusterList()),
    switchMap(res => of(new FetchClusterListSuccessAction(res))),
  ));

  
  FetchCorePropertiesList$ = createEffect(() => this._actions$.pipe(
    ofType<FetchCorePropertiesListAction>(EDeploymentScheduleActions.FetchCorePropertiesList),
    switchMap(_ => this.deploymentScheduleService.fetchCorePropertiesList()),
    switchMap(res => of(new FetchCorePropertiesListSuccessAction(res))),
  ));

  
  UpdateDeployedComponent$ = createEffect(() => this._actions$.pipe(
    ofType<EditComponentAction>(EDeploymentScheduleActions.EditComponent),
    switchMap(body => this.deploymentScheduleService.updateComponent(body.payload)),
    switchMap(res => {
      this.alertService.responseMessage(res);
      return of(new EditComponentSuccessAction(res));
    }),
  ));
}
