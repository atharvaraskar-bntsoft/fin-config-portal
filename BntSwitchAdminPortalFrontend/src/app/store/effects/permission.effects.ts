import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  EPermissionsActions,
  GetPermission,
  GetPermissionSuccess,
} from '../actions/permissions.action';
import { PermissionService } from '../../services/permission.service';

@Injectable()
export class PermissionEffects {
  
  GetPermission$ = createEffect(() => this._actions$.pipe(
    ofType<GetPermission>(EPermissionsActions.GetPermission),
    switchMap(() => this._permissionService.getPermission()),
    switchMap((response: any) => {
      return of(new GetPermissionSuccess(response));
    }),
  ));

  constructor(private _permissionService: PermissionService, private _actions$: Actions) {}
}
