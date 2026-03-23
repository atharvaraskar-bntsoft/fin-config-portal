import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basePath, AcquirerIdConfigUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class AcquirerIdConfigService {
  AcquirerIdConfigUrl = `${basePath.domain}${AcquirerIdConfigUrls.getAcquirerIdConfig}`;
  AcquirerIdFlagUrl = `${basePath.domain}${AcquirerIdConfigUrls.GetAcquirerIdFlag}`;
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
  getAcquirerIdConfig(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.AcquirerIdConfigUrl, this.variable);
  }

  getAcquirerIdConfigDetails(payload: any): Observable<any> {
    return this._http.get<any>(this.AcquirerIdConfigUrl + '/' + payload.payload);
  }

  getAcquirerIdFlagDetails(): Observable<any> {
    return this._http.get<any>(this.AcquirerIdFlagUrl);
  }
}
