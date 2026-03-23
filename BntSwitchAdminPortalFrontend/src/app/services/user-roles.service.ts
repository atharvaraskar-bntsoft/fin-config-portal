import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UsersUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class UserRolesService {
  userRolesUrl = `${basePath.domain}${UsersUrls.getUserRoles}`;
  userRoleFunctionUrl = `${basePath.domain}${UsersUrls.getFunctionsList}`;
  getAdminRoleCheckUrl = `${basePath.domain}${UsersUrls.getAdminRoleCheck}`;
  roleHiddenLink = `${basePath.domain}${UsersUrls.roleHiddenLink}`;
  public variable: any = {
    params: {
      filters: null,
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };
  constructor(private _http: HttpClient) {}
  getUserRoles(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.userRolesUrl, this.variable);
  }
  getAdminRoleCheck(payload?: any): Observable<any> {
    return this._http.get<any>(this.getAdminRoleCheckUrl);
  }
  getUserRolesDetails(id: any): Observable<any> {
    return this._http.get<any>(this.userRolesUrl + '/' + id.payload);
  }

  getUserRolesFunctionList(): Observable<any> {
    return this._http.get<any>(this.userRoleFunctionUrl);
  }

  deleteUserRoles(id: any): Observable<any> {
    return this._http.delete<any>(this.userRolesUrl + '/' + id.payload);
  }

  postUserRoles(data: any): Observable<any> {
    return this._http.post<any>(this.userRolesUrl, data.payload);
  }

  putUserRoles(data: any): Observable<any> {
    return this._http.put<any>(this.userRolesUrl + '/' + data.payload?.id, data.payload);
  }

  putUserRolesStatus(data: any): Observable<any> {
    return this._http.put<any>(this.userRolesUrl + '/' + data.payload?.id, {
      active: data.payload?.active,
    });
  }

  getRoleHidden() {
    return this._http.get<any>(this.roleHiddenLink);
  }
}
