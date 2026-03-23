import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';

import {
  EextractorActions,
  GetExtractor,
  GetExtractorSuccess,
  PauseExtractor,
  PauseExtractorSuccess,
  PutExtractor,
  PutExtractorSuccess,
  ResumeExtractor,
  ResumeExtractorSuccess,
  StartExtractor,
  StartExtractorSuccess,
  StopExtractor,
  StopExtractorSuccess,
} from '../actions/extractor.action';
import { ExtractorService } from '../../services/extractor.service';
import { Extractor } from '@app/models/extractor.interface';
import { id } from '@swimlane/ngx-datatable';

@Injectable()
export class ExtractorEffects {
  
  GetExtractor$ = createEffect(() => this._actions$.pipe(
    ofType<GetExtractor>(EextractorActions.GetExtractor),
    switchMap((payload: any) => this._ExtractorService.getExtractor(payload)),
    switchMap((data: any) => {
      return of(new GetExtractorSuccess(data));
    }),
  ));

  
  PutExtractor$ = createEffect(() => this._actions$.pipe(
    ofType<PutExtractor>(EextractorActions.PutExtractor),
    switchMap(data => this._ExtractorService.putExtractor(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PutExtractorSuccess(response));
    }),
  ));

  
  StartExtractor$ = createEffect(() => this._actions$.pipe(
    ofType<StartExtractor>(EextractorActions.StartExtractor),
    switchMap(payload => this._ExtractorService.startExtractor(payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new StartExtractorSuccess(data));
    }),
  ));

  
  StopExtractor$ = createEffect(() => this._actions$.pipe(
    ofType<StopExtractor>(EextractorActions.StopExtractor),
    switchMap(payload => this._ExtractorService.stopExtractor(payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new StopExtractorSuccess(data));
    }),
  ));

  
  PauseExtractor$ = createEffect(() => this._actions$.pipe(
    ofType<PauseExtractor>(EextractorActions.PauseExtractor),
    switchMap(payload => this._ExtractorService.pauseExtractor(payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new PauseExtractorSuccess(data));
    }),
  ));

  
  ResumeExtractor$ = createEffect(() => this._actions$.pipe(
    ofType<ResumeExtractor>(EextractorActions.ResumeExtractor),
    switchMap(payload => this._ExtractorService.resumeExtractor(payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new ResumeExtractorSuccess(data));
    }),
  ));

  constructor(
    private _ExtractorService: ExtractorService,
    private alertService: AlertService,
    private _actions$: Actions,
  ) {}
}
