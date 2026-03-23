import { MasterConfigurationService } from './../../services/master-configuration.service';
import {
  EMasterConfigurationActions,
  GetAllMasterConfiguration,
  GetAllMasterConfigurationSuccess,
  UpdateMasterConfigurationDetails,
  UpdateMasterConfigurationDetailsSuccess,
} from './../actions/master-configuration.action';
import { AlertService } from '@app/services/alert.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs/internal/observable/of';
import { Injectable } from '@angular/core';

@Injectable()
export class MasterConfigurationEffect {
  constructor(
    private _alertService: AlertService,
    private masterConfiguration: MasterConfigurationService,
    private _actions$: Actions,
  ) {}

  
  GetAllMasterConfigurationList = createEffect(() => this._actions$.pipe(
    ofType<GetAllMasterConfiguration>(EMasterConfigurationActions.GET_ALL_MASTER_CONFIGUERATION),
    switchMap(payload => this.masterConfiguration.getAllMasterConfiguration()),
    switchMap((res: any) => {
      return of(new GetAllMasterConfigurationSuccess(res.data));
    }),
  ));

  
  UpdateMasterCOnfigurationData = createEffect(() => this._actions$.pipe(
    ofType<UpdateMasterConfigurationDetails>(
      EMasterConfigurationActions.MODIFY_CURRENT_MASTER_CONFIGURATION,
    ),
    switchMap(payload => this.masterConfiguration.updateMasterConfiguration(payload)),
    switchMap((res: any) => {
      this._alertService.responseMessage(res);
      return of(new UpdateMasterConfigurationDetailsSuccess(res));
    }),
  ));
}
