import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';

import {
  EInstitutionGroupActions,
  GetInstitutionGroupList,
  GetInstitutionGroupListSuccess,
  GetInstitutionGroups,
  GetInstitutionGroupDetails,
  GetInstitutionGroupDetailsSuccess,
  GetInstitutionGroupsSuccess,
  GetRowDataInstitutionGroups,
  GetRowDataInstitutionGroupSuccess,
} from '../actions/institution-group.action';

import { InstitutionGroupService } from '../../services/institution-group.service';
import { InstitutionGroupGetObject } from '@app/models/institution-group.interface';

@Injectable()
export class InstitutionGroupEffects {
  
  GetInstitutionGroups$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionGroups>(EInstitutionGroupActions.GetInstitutionGroups),
    switchMap(payload => this._institutiongroupService.getInstitutionGroups(payload)),
    switchMap((data: InstitutionGroupGetObject) => {
      return of(new GetInstitutionGroupsSuccess(data));
    }),
  ));
  
  GetInstitutionGroupList$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionGroupList>(EInstitutionGroupActions.GetInstitutionGroupList),
    switchMap(() => this._institutiongroupService.getInstitutionGroupList()),
    switchMap((response: any) => {
      return of(new GetInstitutionGroupListSuccess(response.data));
    }),
  ));
  
  GetInstitutionGroupDetails$ = createEffect(() => this._actions$.pipe(
    ofType<GetInstitutionGroupDetails>(EInstitutionGroupActions.GetInstitutionGroupDetails),
    switchMap((payload: any) => this._institutiongroupService.getInstitutionGroupDetails(payload)),
    switchMap((data: any) => {
      return of(new GetInstitutionGroupDetailsSuccess(data.data));
    }),
  ));
  
  GetRowDataInstitutionGroups$ = createEffect(() => this._actions$.pipe(
    ofType<GetRowDataInstitutionGroups>(EInstitutionGroupActions.GetRowDataInstitutionGroups),
    switchMap(data => this._institutiongroupService.getRowDataInstitutionGroups(data)),
    switchMap((response: any) => {
      return of(new GetRowDataInstitutionGroupSuccess(response));
    }),
  ));
  constructor(
    private _institutiongroupService: InstitutionGroupService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
