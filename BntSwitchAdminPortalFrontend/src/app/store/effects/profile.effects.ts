import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  GetProfile,
  EProfileActions,
  GetProfileSuccess,
  PostChangePassword,
  PostChangePasswordSuccess,
  UpdateProfile,
  UpdateProfileSuccess,
  GetLogout,
  GetLogoutSuccess,
} from '../actions/profile.action';
import { ProfileService } from '@app/services/profile.service';
import { AlertService } from '@app/services/alert.service';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { ProfileGetObject } from '@app/models/profile.interface';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class ProfileEffects {
  
  // GetLogout$ = createEffect(() => this._actions$.pipe(
  //   ofType<GetLogout>(EProfileActions.GetLogout),
  //   switchMap(() => this._profileService.GetLogout('')),
  //   switchMap(async (data: any) => {
  //     await this.keycloakService.logout(window.location.origin + environment.baseHref);
  //     if (data.status === 'success') {
  //       this.cookieService.deleteAll();
  //       window.location.href = environment.baseHref;
  //     }
  //     return of(new GetLogoutSuccess(data));
  //   }),
  // ));

  
  GetProfile$ = createEffect(() => this._actions$.pipe(
    ofType<GetProfile>(EProfileActions.GetProfile),
    switchMap(() => this._profileService.getProfile()),
    switchMap((data: ProfileGetObject) => {
      return of(new GetProfileSuccess(data));
    }),
  ));


  
  UpdateProfile$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateProfile>(EProfileActions.UpdateProfile),
    switchMap(data => this._profileService.updateProfile(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new UpdateProfileSuccess(response));
    }),
  ));

  constructor(
    private _profileService: ProfileService,
    private _actions$: Actions,
    private keycloakService: KeycloakService,
    private cookieService: CookieService,
    private alertService: AlertService,
  ) {}
}
