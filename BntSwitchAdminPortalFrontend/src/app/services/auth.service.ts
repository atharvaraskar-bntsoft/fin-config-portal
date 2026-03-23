import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthURL, basePath } from '../config/i18n/services/request.url.config';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { GetPermission } from '../store/actions/permissions.action';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  loginUrl = `${basePath.domain}${AuthURL.login}`;
  metaInfo = `${basePath.domain}${AuthURL.metaInfo}`;
  permissionsUrl = `${basePath.domain}${AuthURL.permissions}`;
  constructor(
    private _http: HttpClient,
    private _store: Store<IAppState>,
    private _cookieService: CookieService,
  ) {}

  login(payload: any): Observable<any> {
    return this._http.post<any>(this.loginUrl, payload);
  }

  metaInformation(): Observable<any> {
    return this._http.get<any>(this.metaInfo);
  }


  permissions(): Observable<any> {
    return this._http.get<any>(this.permissionsUrl);
  }

  init(resolve) {
    if (this._cookieService.get('token')) {
      this._store.dispatch(new GetPermission());
      setTimeout(() => {
        resolve(true);
      });
    } else {
      resolve(true);
    }
  }
}
