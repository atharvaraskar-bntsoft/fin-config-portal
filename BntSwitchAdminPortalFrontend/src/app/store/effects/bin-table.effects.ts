import {
  GetAccountType,
  GetAccountTypeDetails,
  GetAccountTypeDetailsSuccess,
  GetAccountTypeSuccess,
  GetBinMaster,
  GetBinMasterAll,
  GetBinMasterAllSuccess,
  GetBinMasterSuccess,
  GetBinTableAll,
  GetBinTableAllSuccess,
  GetBinTableData,
  GetBinTableDataSuccess,
  GetBinTableDetails,
  GetBinTableDetailsSuccess,
  UploadFile,
  UploadFileSuccess,
} from './../actions/bin-table.action';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { EBinTableActions, GetBinTable, GetBinTableSuccess } from '../actions/bin-table.action';
import { BinTableService } from '@app/services/bin-table.service';

@Injectable()
export class BinTableEffects {
  
  GetBinTable$ = createEffect(() => this._action$.pipe(
    ofType<GetBinTable>(EBinTableActions.GetBinTable),
    switchMap(payload => this._binTableService.getBinTable(payload)),
    switchMap((data: any) => {
      return of(new GetBinTableSuccess(data));
    }),
  ));

  
  GetBinTableAll$ = createEffect(() => this._action$.pipe(
    ofType<GetBinTableAll>(EBinTableActions.GetBinTableAll),
    switchMap(payload => this._binTableService.getBinTableAll()),
    switchMap((data: any) => {
      return of(new GetBinTableAllSuccess(data));
    }),
  ));

  
  GetAccountType$ = createEffect(() => this._action$.pipe(
    ofType<GetAccountType>(EBinTableActions.GetAccountType),
    switchMap(payload => this._binTableService.getAccountType(payload)),
    switchMap((data: any) => {
      return of(new GetAccountTypeSuccess(data));
    }),
  ));

  
  GetBinMaster$ = createEffect(() => this._action$.pipe(
    ofType<GetBinMaster>(EBinTableActions.GetBinMaster),
    switchMap(payload => this._binTableService.getBinTable(payload)),
    switchMap((data: any) => {
      return of(new GetBinMasterSuccess(data));
    }),
  ));

  
  GetBinMasterAll$ = createEffect(() => this._action$.pipe(
    ofType<GetBinMasterAll>(EBinTableActions.GetBinMasterAll),
    switchMap(payload => this._binTableService.getBinMasterAll()),
    switchMap((data: any) => {
      return of(new GetBinMasterAllSuccess(data));
    }),
  ));

  
  GetBinTableData$ = createEffect(() => this._action$.pipe(
    ofType<GetBinTableData>(EBinTableActions.GetBinTableData),
    switchMap(payload => this._binTableService.getBinTableData(payload)),
    switchMap((data: any) => {
      return of(new GetBinTableDataSuccess(data));
    }),
  ));

  
  GetBinTableDetails$ = createEffect(() => this._action$.pipe(
    ofType<GetBinTableDetails>(EBinTableActions.GetBinTableDetails),
    switchMap(payload => this._binTableService.binDataDetails(payload)),
    switchMap((data: any) => {
      return of(new GetBinTableDetailsSuccess(data.data));
    }),
  ));

  
  GetAccountTypeDetails$ = createEffect(() => this._action$.pipe(
    ofType<GetAccountTypeDetails>(EBinTableActions.GetAccountTypeDetails),
    switchMap(payload => this._binTableService.getAccountTypeDetails(payload)),
    switchMap((data: any) => {
      return of(new GetAccountTypeDetailsSuccess(data.data));
    }),
  ));

  
  GetBinTableUploadFile$ = createEffect(() => this._action$.pipe(
    ofType<UploadFile>(EBinTableActions.UploadFile),
    switchMap(payload => this._binTableService.uploadFile(payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new UploadFileSuccess(data));
    }),
  ));

  constructor(
    private _binTableService: BinTableService,
    private _action$: Actions,
    private alertService: AlertService,
  ) {}
}
