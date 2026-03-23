import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { basePath, StatusUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class StatusService {
  StatusUrl = `${basePath.domain}${StatusUrls.getStatus}`;
  public variable: any = {
    'page-no': 1,
    'page-size': '15',
    'sort-column': '',
    'sort-order': 'asc',
  };

  constructor(private _http: HttpClient) {}
  getStatus(): Observable<any> {
    return this._http.get<any>(this.StatusUrl, this.variable);
  }
}
