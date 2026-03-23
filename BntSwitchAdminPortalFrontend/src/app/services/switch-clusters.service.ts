import { currentItem } from './../models/schedule-router.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basePath, switchClustersUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class SwitchClustersService {
  getSwitchClusters = `${basePath.domain}${switchClustersUrls.getSwitchClustersUrl}`;
  getByIdSwitchClusters = `${basePath.domain}${switchClustersUrls.getByIdSwitchClustersUrl}`;
  postSwitchClusters = `${basePath.domain}${switchClustersUrls.postSwitchClustersUrl}`;
  putSwitchClusters = `${basePath.domain}${switchClustersUrls.putSwitchClustersUrl}`;
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
  getSwitchClustersUrl(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getSwitchClusters, this.variable);
  }

  postSwitchClustersUrl(payload): Observable<any> {
    return this._http.post<any>(this.postSwitchClusters, payload);
  }
  putSwitchClustersUrl(payload): Observable<any> {
    const data: any = {
      active: payload.active,
      dataCentre: payload.dataCentre,
      region: payload.region,
    };
    return this._http.put<any>(this.putSwitchClusters + '/' + payload.id, data);
  }

  getByIdSwitchClustersUrl(id: any): Observable<any> {
    return this._http.get<any>(this.getByIdSwitchClusters + '/' + id);
  }
}
