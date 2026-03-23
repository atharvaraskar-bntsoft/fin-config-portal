import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import {
  EInstitutionActions,
  GetInstitution,
  GetInstitutionSuccess,
  GetInstitutionDetail,
  GetInstitutionDetailSuccess,
  GetInstitutionService,
  GetInstitutionServiceSuccess,
  GetCategoryCode,
  GetCategoryCodeSuccess,
  GetCountriesList,
  GetInstitutionGroupList,
  GetInstitutionGroupListSuccess,
  GetCurrency,
  GetCurrencySuccess,
  GetInstitutionAdditionalService,
  GetInstitutionAdditionalServiceSuccess,
  GetInstitutionRowData,
  GetInstitutionRowDataSuccess,
  GetCountryList,
  GetCountryListSuccess,
  GetStateList,
  GetStateListSuccess,
  GetInstitutionList,
} from '../actions/institution.action';

import { InstitutionService } from '../../services/institution.service';
import { AlertService } from '@app/services/alert.service';
import { InstitutionGetObject } from '@app/models/institution.interface';

@Injectable()
export class InstitutionEffects {
  
  GetCategoryCode$ = createEffect(() => this._actions$.pipe(
    ofType<GetCategoryCode>(EInstitutionActions.GetCategoryCode),
    switchMap(() => this._institutionService.getCategoryCode()),
    switchMap((data: any) => {
      return of(new GetCategoryCodeSuccess(data.data));
    }),
  ));

  
  GetCurrency$ = createEffect(() => this._actions$.pipe(
    ofType<GetCurrency>(EInstitutionActions.GetCurrency),
    switchMap(() => this._institutionService.getCurrency()),
    switchMap((data: any) => {
      return of(new GetCurrencySuccess(data.data));
    }),
  ));

  
  GetInstitution$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitution>(EInstitutionActions.GetInstitution),
    switchMap(payload => this._institutionService.getInstitution(payload)),
    switchMap((data: InstitutionGetObject) => {
      return of(new GetInstitutionSuccess(data));
    }),
  ));

  
  GetInstitutionDetail$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionDetail>(EInstitutionActions.GetInstitutionDetail),
    switchMap(data => this._institutionService.InstitutionDetail(data.payload)),
    switchMap((data: any) => {
      return of(new GetInstitutionDetailSuccess(data.data));
    }),
  ));

  
  GetInstitutionList$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionList>(EInstitutionActions.GetInstitutionList),
    switchMap(() => this._institutionService.getInstitutionList()),
    switchMap((response: any) => {
      return of(new GetInstitutionSuccess(response.data));
    }),
  ));

  
  GetInstitutionService$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionService>(EInstitutionActions.GetInstitutionService),
    switchMap(() => this._institutionService.InstitutionService()),
    switchMap((data: any) => {
      return of(new GetInstitutionServiceSuccess(data.data));
    }),
  ));

  
  GetInstitutionAdditionalService$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionAdditionalService>(EInstitutionActions.GetInstitutionAdditionalService),
    switchMap(() => this._institutionService.InstitutionAdditionalService()),
    switchMap((data: any) => {
      return of(new GetInstitutionAdditionalServiceSuccess(data.data));
    }),
  ));

  
  GetInstitutionGroupList$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionGroupList>(EInstitutionActions.GetInstitutionGroupList),
    switchMap(() => this._institutionService.getInstitutionGroupList()),
    switchMap((institutionData: any) => {
      return of(new GetInstitutionGroupListSuccess(institutionData));
    }),
  ));
  
  GetInstitutionRowData$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionRowData>(EInstitutionActions.GetInstitutionRowData),
    switchMap(data => this._institutionService.InstitutionDetail(data.payload)),
    switchMap((data: any) => {
      return of(new GetInstitutionRowDataSuccess(data.data));
    }),
  ));
  
  GetCountryList$ = createEffect(() => this._actions$.pipe(
    ofType<GetCountryList>(EInstitutionActions.GetCountryList),
    switchMap(() => this._institutionService.getCountryList()),
    switchMap((response: any) => {
      return of(new GetCountryListSuccess(response.data));
    }),
  ));
  
  GetStateByCountryList$ = createEffect(() => this._actions$.pipe(
    ofType<GetStateList>(EInstitutionActions.GetStateList),
    switchMap(payload => this._institutionService.getStateList(payload)),
    switchMap((response: any) => {
      return of(new GetStateListSuccess(response.data.countryStateList));
    }),
  ));
  constructor(
    private _institutionService: InstitutionService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
