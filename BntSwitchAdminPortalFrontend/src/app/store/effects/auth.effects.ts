import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { IAppState } from '../state/app.state';
import {
  ELoginActions,
  LOGIN,
  LoginSucess,
  ResetPassword,
  ResetPasswordSuccess,
} from '../actions/auth.action';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  
  LOGIN$ = createEffect(() => this._actions$.pipe(
    ofType<LOGIN>(ELoginActions.LOGIN),
    map(action => action.payload),
    switchMap(payload => this._authService.login(payload)),
    switchMap((data: any) => {
      return of(new LoginSucess(data));
    }),
  ));



  constructor(
    private _authService: AuthService,
    private _actions$: Actions,
    private _store: Store<IAppState>,
  ) {}
}
