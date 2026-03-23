import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { basePath, ViewSettingsUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class ViewSettingsService {
  ViewSettingsUrl = `${basePath.domain}${ViewSettingsUrls.getSettings}`;
  putViewSettingsUrl = `${basePath.domain}${ViewSettingsUrls.getSettings}`;

  public variable: any = {
    'page-no': 1,
    'page-size': '15',
    'sort-column': '',
    'sort-order': 'asc',
  };

  constructor(private _http: HttpClient) {}
  getViewSettings(): Observable<any> {
    return this._http.get<any>(this.ViewSettingsUrl, this.variable);
  }
  updateErrorCodeMapping(payload): Observable<any> {
    return this._http.put<any>(this.putViewSettingsUrl + '/' + '1', payload);
  }
}
