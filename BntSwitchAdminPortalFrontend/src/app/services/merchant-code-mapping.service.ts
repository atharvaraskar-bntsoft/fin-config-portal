import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantCodeMappingUrls, basePath } from '../config/i18n/services/request.url.config';

import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
@Injectable()
export class MerchantCodeMappingService {
  static getselectViewSettingsList() {
    throw new Error('Method not implemented.');
  }
  static getselectGetMerchantCodeMapping() {
    throw new Error('Method not implemented.');
  }
  static getselectPermissionsData() {
    throw new Error('Method not implemented.');
  }
  getMerchantCodeMappingUrl = `${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping}`;
  deleteMerchantCodeMappingUrl = `${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping}`;
  postMerchantCodeMappingUrl = `${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping}`;
  getRowMerchantCodeMappingUrl = `${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping}`;
  putMerchantCodeMappingUrl = `${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping}`;
  getMerchantConfigUrl = `${basePath.domain}${MerchantCodeMappingUrls.getMerchantConfigUrl}`;
  public variable: any = {
    params: {
      filters: '',
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };
  constructor(private _http: HttpClient, private _store: Store<IAppState>) {}
  getMerchantCodeMapping(payload?: any): Observable<any> {
    delete this.variable.params.filters;
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getMerchantCodeMappingUrl, this.variable);
  }

  deleteMechantCodeMapping(id: any): Observable<any> {
    return this._http.delete<any>(this.deleteMerchantCodeMappingUrl + '/' + id);
  }
  getRowErrorCodeMapping(id): Observable<any> {
    return this._http.get<any>(this.getRowMerchantCodeMappingUrl + '/' + id.payload);
  }
  updateErrorCodeMapping(payload): Observable<any> {
    return this._http.put<any>(this.putMerchantCodeMappingUrl + '/' + payload.id, payload);
  }
  postErrorCodeMapping(payload): Observable<any> {
    return this._http.post<any>(this.postMerchantCodeMappingUrl, payload);
  }
  getMerchantConfigueData(): Observable<any> {
    return this._http.get<any>(this.getMerchantConfigUrl);
  }
}
