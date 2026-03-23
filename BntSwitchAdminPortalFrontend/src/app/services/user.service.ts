import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UsersUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class UserService {
  usersUrl = `${basePath.domain}${UsersUrls.getUsers}`;
  roleListUrl = `${basePath.domain}${UsersUrls.getRoles}`;
  constructor(private _http: HttpClient) {}

  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': 15,
      'sort-column': '',
      'sort-order': 'desc',
    },
  };

  getUsers(payload?: any): Observable<any> {
    // delete this.variable.params?.filters;
    // delete this.variable.params?.search;
    if (payload.payload?.filter && payload.payload.search) {
      this.variable.params.filters = payload.payload.filterStr;
      this.variable.params.search = payload.payload.searchStr;
    } else if (payload.payload?.filter) {
      this.variable.params.filters = payload.payload.filterStr;
    } else if (payload.payload?.search) {
      this.variable.params.search = payload.payload.searchStr;
    }
    else{
      delete this.variable.params.search;
    }
    return this._http.get<any>(this.usersUrl, this.variable);
  }
  getRoleList(): Observable<any> {
    return this._http.get<any>(this.roleListUrl);
  }
  getUsersDetails(payload: any): Observable<any> {
    return this._http.get<any>(this.usersUrl + '/' + payload.payload);
  }
  deleteUsers(id: any): Observable<any> {
    return this._http.delete<any>(this.usersUrl + '/' + id.payload);
  }
  postUsers(data: any): Observable<any> {
    return this._http.post<any>(this.usersUrl, data.payload);
  }
  putUsers(data: any): Observable<any> {
    return this._http.put<any>(this.usersUrl + '/' + data.payload.id, data.payload);
  }
  putUsersStatus(data: any): Observable<any> {
    return this._http.put<any>(this.usersUrl + '/' + data.payload.id, {
      active: data.payload.active,
    });
  }
}
