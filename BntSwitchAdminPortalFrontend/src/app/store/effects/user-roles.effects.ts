import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  DeleteUserRoles,
  DeleteUserRolesSuccess,
  EUserRolesActions,
  GetUserRoles,
  GetUserRolesDetails,
  GetAdminRoleCheck,
  GetAdminRoleCheckSuccess,
  GetUserRolesDetailsSuccess,
  GetUserRolesFunctionList,
  GetUserRolesFunctionListSuccess,
  GetUserRolesSuccess,
  PostUserRoles,
  PostUserRolesSuccess,
  PutUserRoles,
  PutUserRolesStatus,
  PutUserRolesStatusSuccess,
  PutUserRolesSuccess,
} from '../actions/user-roles.actions';
import { UserRolesService } from '../../services/user-roles.service';
import { AlertService } from '../../services/alert.service';
import { UserRoleGetObject } from '@app/models/user-roles.interface';

@Injectable()
export class UserRolesEffects {
  
  getUserRoles$ = createEffect(() => this._actions$.pipe(
    ofType<GetUserRoles>(EUserRolesActions.GetUserRoles),
    switchMap(payload => this._userRolesService.getUserRoles(payload)),
    switchMap((userRoleData: UserRoleGetObject) => {
      return of(new GetUserRolesSuccess(userRoleData));
    }),
  ));

  
  GetUserRolesDetails$ = createEffect(() => this._actions$.pipe(
    ofType<GetUserRolesDetails>(EUserRolesActions.GetUserRolesDetails),
    switchMap(payload => this._userRolesService.getUserRolesDetails(payload)),
    switchMap((userRoleDetailData: any) => {
      return of(new GetUserRolesDetailsSuccess(userRoleDetailData));
    }),
  ));
  
  GetAdminRoleCheck$ = createEffect(() => this._actions$.pipe(
    ofType<GetAdminRoleCheck>(EUserRolesActions.GetAdminRoleCheck),
    switchMap(payload => this._userRolesService.getAdminRoleCheck(payload)),
    switchMap((data: any) => {
      return of(new GetAdminRoleCheckSuccess(data));
    }),
  ));
  
  GetUserRolesFunctionList$ = createEffect(() => this._actions$.pipe(
    ofType<GetUserRolesFunctionList>(EUserRolesActions.GetUserRolesFunctionList),
    switchMap(() => this._userRolesService.getUserRolesFunctionList()),
    switchMap((userRoleDetailData: any) => {
      return of(new GetUserRolesFunctionListSuccess(userRoleDetailData.data));
    }),
  ));

  
  DeleteUserRoles$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteUserRoles>(EUserRolesActions.DeleteUserRoles),
    switchMap(payload => this._userRolesService.deleteUserRoles(payload)),
    switchMap((deleteUserRoleData: any) => {
      this.alertService.responseMessage(deleteUserRoleData);
      return of(new DeleteUserRolesSuccess(deleteUserRoleData));
    }),
  ));

  
  PostUserRoles$ = createEffect(() => this._actions$.pipe(
    ofType<PostUserRoles>(EUserRolesActions.PostUserRoles),
    switchMap(payload => this._userRolesService.postUserRoles(payload)),
    switchMap((createUserRoleData: any) => {
      this.alertService.responseMessage(createUserRoleData);
      return of(new PostUserRolesSuccess(createUserRoleData));
    }),
  ));

  
  PutUserRoles$ = createEffect(() => this._actions$.pipe(
    ofType<PutUserRoles>(EUserRolesActions.PutUserRoles),
    switchMap(payload => this._userRolesService.putUserRoles(payload)),
    switchMap((editUserRoleData: any) => {
      this.alertService.responseMessage(editUserRoleData);
      return of(new PostUserRolesSuccess(editUserRoleData));
    }),
  ));

  
  PutUserRolesStatus$ = createEffect(() => this._actions$.pipe(
    ofType<PutUserRoles>(EUserRolesActions.PutUserRolesStatus),
    switchMap(payload => this._userRolesService.putUserRolesStatus(payload)),
    switchMap((editUserRoleStatusData: any) => {
      this.alertService.responseMessage(editUserRoleStatusData);
      return of(new PutUserRolesStatusSuccess(editUserRoleStatusData));
    }),
  ));

  constructor(
    private _userRolesService: UserRolesService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
