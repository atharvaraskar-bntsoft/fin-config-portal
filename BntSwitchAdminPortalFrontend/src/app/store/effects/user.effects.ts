import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import {
  GetUsersSuccess,
  EUserActions,
  GetUserSuccess,
  GetUser,
  GetUsers,
  GetUsersDetails,
  GetUsersDetailsSuccess,
  DeleteUsers,
  DeleteUsersSuccess,
  PostUsers,
  PostUsersSuccess,
  PutUsers,
  PutUsersSuccess,
  GetUsersRoleList,
  GetUsersRoleListSuccess,
  PutUsersStatus,
  PutUsersStatusSuccess,
} from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { selectUserList } from '../selectors/user.selector';
import { AlertService } from '../../services/alert.service';
import { UserGetObject } from '@app/models/user.interface';

@Injectable()
export class UserEffects {
  
  getUser$ = createEffect(() => this._actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([id, users]) => {
      const selectedUser = users;
      return of(new GetUsers());
    }),
  ));

  
  getUsers$ = createEffect(() => this._actions$.pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    switchMap(payload => this._userService.getUsers(payload)),
    switchMap((userData: UserGetObject) => {
      return of(new GetUsersSuccess(userData));
    }),
  ));

  
  GetUsersDetails$ = createEffect(() => this._actions$.pipe(
    ofType<GetUsersDetails>(EUserActions.GetUsersDetails),
    switchMap(payload => this._userService.getUsersDetails(payload)),
    switchMap((userDetailData: any) => {
      return of(new GetUsersDetailsSuccess(userDetailData.data));
    }),
  ));

  
  DeleteUsers$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteUsers>(EUserActions.DeleteUsers),
    switchMap(payload => this._userService.deleteUsers(payload)),
    switchMap((deleteUserData: any) => {
      this.alertService.responseMessage(deleteUserData);
      return of(new DeleteUsersSuccess(deleteUserData));
    }),
  ));

  
  PostUsers$ = createEffect(() => this._actions$.pipe(
    ofType<PostUsers>(EUserActions.PostUsers),
    switchMap(payload => this._userService.postUsers(payload)),
    switchMap((postUserData: any) => {
      this.alertService.responseMessage(postUserData);
      return of(new PostUsersSuccess(postUserData));
    }),
  ));

  
  PutUsers$ = createEffect(() => this._actions$.pipe(
    ofType<PutUsers>(EUserActions.PutUsers),
    switchMap(payload => this._userService.putUsers(payload)),
    switchMap((putUserData: any) => {
      this.alertService.responseMessage(putUserData);
      return of(new PutUsersSuccess(putUserData));
    }),
  ));

  
  PutUsersStatus$ = createEffect(() => this._actions$.pipe(
    ofType<PutUsersStatus>(EUserActions.PutUsersStatus),
    switchMap(payload => this._userService.putUsersStatus(payload)),
    switchMap((putUserStatusData: any) => {
      this.alertService.responseMessage(putUserStatusData);
      return of(new PutUsersStatusSuccess(putUserStatusData));
    }),
  ));
  
  GetUsersRoleList$ = createEffect(() => this._actions$.pipe(
    ofType<GetUsersRoleList>(EUserActions.GetUsersRoleList),
    switchMap(() => this._userService.getRoleList()),
    switchMap((userRoleList: any) => {
      return of(new GetUsersRoleListSuccess(userRoleList.data));
    }),
  ));

  constructor(
    private _userService: UserService,
    private _actions$: Actions,
    private _store: Store<IAppState>,
    private alertService: AlertService,
  ) {}
}
