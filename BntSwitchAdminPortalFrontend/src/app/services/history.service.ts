import { currentItem } from './../models/schedule-router.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basePath, historyUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class HistoryService {
  getHistory = `${basePath.domain}${historyUrls.getHistoryUrl}`;
  getByIdHistory = `${basePath.domain}${historyUrls.getByIdHistoryUrl}`;
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
  getHistoryUrl(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getHistory, this.variable);
  }
  getByIdHistoryUrl(id: any): Observable<any> {
    return this._http.get<any>(this.getByIdHistory + '/' + id);
  }
}
