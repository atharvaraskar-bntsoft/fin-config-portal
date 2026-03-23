import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { basePath, ProfileUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class ProfileService {
  LogoutUrl = `${basePath.domain}${ProfileUrls.getLogout}`;
  ProfileUrl = `${basePath.domain}${ProfileUrls.getUsers}`;
  public variable: any = {
    params: {
      type: 'current',
    },
  };

  constructor(private _http: HttpClient) {}

  GetLogout(id): Observable<any> {
    return this._http.get<any>(`${this.LogoutUrl}/${id}`);
  }

  getProfile(): Observable<any> {
    return this._http.get<any>(this.ProfileUrl, this.variable);
  }

  updateProfile(payload): Observable<any> {
    return this._http.put<any>(this.ProfileUrl + '?' + payload.url, payload.data);
  }
}
