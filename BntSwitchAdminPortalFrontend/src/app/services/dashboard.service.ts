import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DashboardUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class DashboardService {
  DashboardUrl = `${basePath.domain}${DashboardUrls.getDashboard}`;
  constructor(private _http: HttpClient) {}

  getDashboard(): Observable<any> {
    return this._http.get<any>(this.DashboardUrl);
  }
}
