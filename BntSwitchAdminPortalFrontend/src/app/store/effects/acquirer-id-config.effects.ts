import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import {
  EAcquirerIdConfigActions,
  GetAcquirerIdConfig,
  GetAcquirerIdConfigSuccess,
  GetAcquirerIdConfigDetails,
  GetAcquirerIdConfigDetailsSuccess,
  GetAcquirerIdFlag,
  GetAcquirerIdFlagSuccess,
} from '../actions/acquirer-id-config-mapping.action';
import { AcquirerIdConfigService } from '@app/services/acquirer-id-config.service';
import { AcquirerIdGetObject } from '@app/models/acquirer-id-config.interface';

@Injectable()
export class AcquirerIdConfigEffects {
  
  GetAcquirerIdConfig$ = createEffect(() => this._action$.pipe(
    ofType<GetAcquirerIdConfig>(EAcquirerIdConfigActions.GetAcquirerIdConfig),
    switchMap(payload => this._acquirerIdConfigService.getAcquirerIdConfig(payload)),
    switchMap((data: AcquirerIdGetObject) => {
      return of(new GetAcquirerIdConfigSuccess(data));
    }),
  ));

  
  GetAcquirerIdConfigDetails$ = createEffect(() => this._action$.pipe(
    ofType<GetAcquirerIdConfigDetails>(EAcquirerIdConfigActions.GetAcquirerIdConfigDetails),
    switchMap(payload => this._acquirerIdConfigService.getAcquirerIdConfigDetails(payload)),
    switchMap((data: any) => {
      return of(new GetAcquirerIdConfigDetailsSuccess(data.data));
    }),
  ));

  
  GetAcquirerIdFlag$ = createEffect(() => this._action$.pipe(
    ofType<GetAcquirerIdFlag>(EAcquirerIdConfigActions.GetAcquirerIdFlag),
    switchMap(() => this._acquirerIdConfigService.getAcquirerIdFlagDetails()),
    switchMap((data: any) => {
      return of(new GetAcquirerIdFlagSuccess(data));
    }),
  ));

  constructor(
    private _acquirerIdConfigService: AcquirerIdConfigService,
    private _action$: Actions,
    private alertService: AlertService,
  ) {}
}
