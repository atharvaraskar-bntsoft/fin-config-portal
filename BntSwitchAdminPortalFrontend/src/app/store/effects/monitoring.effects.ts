import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  ChangeLoggerLogLevel,
  ChangeLoggerLogLevelSuccess,
  EMonitoringActions,
  GetLoggerLogLevel,
  GetLoggerLogLevelSuccess,
  GetMonitoring,
  GetMonitoringSuccess,
  KillMonitoringInstance,
  KillMonitoringInstanceSuccess,
  NetworkDumpStatus,
  NetworkDumpStatusSuccess,
  StartMonitoringInstance,
  StartMonitoringInstanceSuccess,
  StopMonitoringInstanceSuccess,
  ExecuteMonitoringOperation,
  ExecuteMonitoringOperationSuccess,
} from '../actions/monitoring.action';
import { MonitoringService } from '../../services/monitoring.service';
import { AlertService } from '@app/services/alert.service';
import { GetMonitoringRootObject } from '@app/models/monitoring.interface';

@Injectable()
export class MonitoringEffects {
  GetMonitoring$ = createEffect(() =>
    this._actions$.pipe(
      ofType<GetMonitoring>(EMonitoringActions.GetMonitoring),
      switchMap(() => this._monitoringService.getMonitoringScreen()),
      switchMap((data: GetMonitoringRootObject) => {
        this._monitoringService.isSpinning = false;
        return of(new GetMonitoringSuccess(data));
      }),
    ),
  );

  GetLoggerLogLevel$ = createEffect(() =>
    this._actions$.pipe(
      ofType<GetLoggerLogLevel>(EMonitoringActions.GetLoggerLogLevel),
      switchMap(data => this._monitoringService.getLoggerLogLevel(data.payload)),
      switchMap((data: GetMonitoringRootObject) => {
        this.alertService.responseMessage(data);
        return of(new GetLoggerLogLevelSuccess(data));
      }),
    ),
  );

  ChangeLoggerLogLevel$ = createEffect(() =>
    this._actions$.pipe(
      ofType<ChangeLoggerLogLevel>(EMonitoringActions.ChangeLoggerLogLevel),
      switchMap(data => this._monitoringService.changeLoggerLogLevel(data.payload)),
      switchMap((data: GetMonitoringRootObject) => {
        this.alertService.responseMessage(data);
        return of(new ChangeLoggerLogLevelSuccess(data));
      }),
    ),
  );

  KillMonitoringInstance$ = createEffect(() =>
    this._actions$.pipe(
      ofType<KillMonitoringInstance>(EMonitoringActions.KillMonitoringInstance),
      switchMap(data => this._monitoringService.killInstance(data.payload)),
      switchMap((data: GetMonitoringRootObject) => {
        this.alertService.responseMessage(data);
        return of(new KillMonitoringInstanceSuccess(data));
      }),
    ),
  );

  NetworkDumpStatus$ = createEffect(() =>
    this._actions$.pipe(
      ofType<NetworkDumpStatus>(EMonitoringActions.NetworkDumpStatus),
      switchMap(data => this._monitoringService.networkDumpInstance(data.payload)),
      switchMap((data: GetMonitoringRootObject) => {
        this.alertService.responseMessage(data);
        return of(new NetworkDumpStatusSuccess(data));
      }),
    ),
  );

  // StartMonitoringInstance$ = createEffect(() => this._actions$.pipe(
  //   ofType<StartMonitoringInstance>(EMonitoringActions.StartMonitoringInstance),
  //   switchMap(data => this._monitoringService.startInstance(data.payload)),
  //   switchMap((data: GetMonitoringRootObject) => {
  //     this.alertService.responseMessage(data);
  //     return of(new StartMonitoringInstanceSuccess(data));
  //   }),
  // ));

  // StopMonitoringInstance$ = createEffect(() => this._actions$.pipe(
  //   ofType<StartMonitoringInstance>(EMonitoringActions.StopMonitoringInstance),
  //   switchMap(data => this._monitoringService.stopInstance(data.payload)),
  //   switchMap((data: GetMonitoringRootObject) => {
  //     this.alertService.responseMessage(data);
  //     return of(new StopMonitoringInstanceSuccess(data));
  //   }),
  // ));

  ExecuteMonitoringOperation$ = createEffect(() =>
    this._actions$.pipe(
      ofType<ExecuteMonitoringOperation>(EMonitoringActions.ExecuteMonitoringOperation),
      switchMap(data => this._monitoringService.ExecuteOperation(data.payload)),
      switchMap((data: GetMonitoringRootObject) => {
        this.alertService.responseMessage(data);
        return of(new ExecuteMonitoringOperationSuccess(data));
      }),
    ),
  );
  constructor(
    private _monitoringService: MonitoringService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
