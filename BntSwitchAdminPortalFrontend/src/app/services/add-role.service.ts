import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basePath, AddRoleUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class AddRoleService {
  AddRoleUrl = `${basePath.domain}${AddRoleUrls.getRoleList}`;

  constructor(private _http: HttpClient) {}
  getAddRoleList(payload?: any): Observable<any> {
    return this._http.get<any>(this.AddRoleUrl);
  }
}