import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { selectPermissionsData } from '../../store/selectors/permission.selectors';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _cookieService: CookieService,
    private _store: Store<IAppState>,
    private _authService: AuthService,
    private _router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      if (!this._cookieService.get('token')) {
        this._cookieService.deleteAll();
        window.location.href = environment.baseHref;
      }
      const { id, permission } = next.data;
      this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
        if (response && response.data && response.data.length !== 0) {
          const value = response.data.find(item => item.id === id);
          if (value && value.id && permission && value[permission]) {
            resolve(true);
          } else if (value && value.id && !permission) {
            resolve(true);
          } else if (id && !permission) {
            resolve(true);
          } else {
            this._router.navigate(['/access-denied']);
          }
        }
      });
    });
  }
}
