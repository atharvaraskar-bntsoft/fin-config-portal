import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { CookieService } from 'ngx-cookie-service';
import { PermissionService } from './services/permission.service';
import { GetPermission } from './store/actions/permissions.action';
import { selectPermissionsData } from './store/selectors/permission.selectors';
import { IAppState } from './store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class PermissionResolver implements Resolve<any> {
  constructor(
    private _cookieService: CookieService,
    private permissionService: PermissionService,
    private keycloakService: KeycloakService,
    private _store: Store<IAppState>,
  ) {}

  async resolve() {
    const token = this._cookieService.get('token');
    if (token && token.length && (await this.keycloakService.isLoggedIn())) {
      this._store.dispatch(new GetPermission());
      this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
        if (response && response.data && response.data.length !== 0) {
          return response;
        }
      });
    }
  }
}
