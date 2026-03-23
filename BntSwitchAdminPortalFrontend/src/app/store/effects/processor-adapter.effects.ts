import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import {
  EProcessorAdapterActions,
  GetProcessorAdapter,
  GetProcessorAdapterDetails,
  GetProcessorAdapterDetailsSuccess,
  GetProcessorAdapterSuccess,
  PostProcessorAdapter,
  PostProcessorAdapterSuccess,
  PutProcessorAdapter,
  PutProcessorAdapterSuccess,
  GetServiceListSuccess,
  Get13ListSuccess,
} from '../actions/processor-adapter.action';
import { ProcessorAdapterService } from '../../services/procesoor-adapter.service';

@Injectable()
export class ProcessorAdapterEffects {
  
  GetProcessorAdapter$ = createEffect(() => this._actions$.pipe(
    ofType<GetProcessorAdapter>(EProcessorAdapterActions.GetProcessorAdapter),
    switchMap(payload => this._processorAdapterService.getProcessorAdapter(payload)),
    switchMap((processorAdapterData: any) => {
      return of(new GetProcessorAdapterSuccess(processorAdapterData.data));
    }),
  ));

  
  GetServiceList$ = createEffect(() => this._actions$.pipe(
    ofType<GetProcessorAdapter>(EProcessorAdapterActions.GetServiceList),
    switchMap(payload => this._processorAdapterService.getServiceList(payload)),
    switchMap((data: any) => {
      return of(new GetServiceListSuccess(data.data));
    }),
  ));

  
  Get13List$ = createEffect(() => this._actions$.pipe(
    ofType<GetProcessorAdapter>(EProcessorAdapterActions.Get13List),
    switchMap(payload => this._processorAdapterService.get13List(payload)),
    switchMap((data: any) => {
      return of(new Get13ListSuccess(data.data));
    }),
  ));

  
  GetProcessorAdapterDetails$ = createEffect(() => this._actions$.pipe(
    ofType<GetProcessorAdapterDetails>(EProcessorAdapterActions.GetProcessorAdapterDetails),
    switchMap(payload => this._processorAdapterService.getProcessorAdapterDetails(payload)),
    switchMap((processorAdapterDetailsData: any) => {
      return of(new GetProcessorAdapterDetailsSuccess(processorAdapterDetailsData.data));
    }),
  ));
  
  PostProcessorAdapter$ = createEffect(() => this._actions$.pipe(
    ofType<PostProcessorAdapter>(EProcessorAdapterActions.PostProcessorAdapter),
    switchMap(payload => this._processorAdapterService.postProcessorAdapter(payload)),
    switchMap((postprocessorAdapterData: any) => {
      if (postprocessorAdapterData.status === 'success')
        this.alertService.responseMessage(postprocessorAdapterData);
      return of(new PostProcessorAdapterSuccess(postprocessorAdapterData));
    }),
  ));
  
  PutProcessorAdapter$ = createEffect(() => this._actions$.pipe(
    ofType<PutProcessorAdapter>(EProcessorAdapterActions.PutProcessorAdapter),
    switchMap(payload => this._processorAdapterService.putProcessorAdapter(payload)),
    switchMap((putprocessorAdapterData: any) => {
      if (putprocessorAdapterData.status === 'success')
        this.alertService.responseMessage(putprocessorAdapterData);
      return of(new PutProcessorAdapterSuccess(putprocessorAdapterData));
    }),
  ));

  constructor(
    private _processorAdapterService: ProcessorAdapterService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
