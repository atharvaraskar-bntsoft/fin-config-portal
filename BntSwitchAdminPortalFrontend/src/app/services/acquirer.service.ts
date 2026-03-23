import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AcquirersUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class AcquirerService {
  AcquirerUrl = `${basePath.domain}${AcquirersUrls.getAcquirer}`;
  ListUrl = `${basePath.domain}${AcquirersUrls.getInstitutionAcquirerProcessorList}`;
  postAcquirerUrl = `${basePath.domain}${AcquirersUrls.postAcquirer}`;
  putAcquirerUrl = `${basePath.domain}${AcquirersUrls.putAcquirer}`;
  getAcquirerRowDataUrl = `${basePath.domain}${AcquirersUrls.getAcquirerRowData}`;

  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(private _http: HttpClient) {}

  getLogs(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get(this.AcquirerUrl, this.variable);
  }
  getInstitutionAcquirerProcessorList(): Observable<any> {
    return this._http.get<any>(this.ListUrl);
  }
  postAcquirer(payload: any): Observable<any> {
    return this._http.post<any>(this.postAcquirerUrl, payload);
  }
  getAcquirerRowData(id): Observable<any> {
    return this._http.get<any>(this.getAcquirerRowDataUrl + '/' + id);
  }
  putAcquirer(payload): Observable<any> {
    return this._http.put<any>(this.putAcquirerUrl + '/' + payload.id, payload);
  }
}
