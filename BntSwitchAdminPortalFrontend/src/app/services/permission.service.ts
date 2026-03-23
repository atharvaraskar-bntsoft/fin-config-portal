import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { basePath, PermissionUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class PermissionService {
  getPermissionUrl = `${basePath.domain}${PermissionUrls.getPermission}`;

  constructor(public _http: HttpClient) {}
  getPermission(): Observable<any> {
    return this._http.get<any>(this.getPermissionUrl);
  }
}
