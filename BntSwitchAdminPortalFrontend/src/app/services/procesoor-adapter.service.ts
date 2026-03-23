import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { basePath, ProcessorAdapterUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class ProcessorAdapterService {
  processorAdapterUrl = `${basePath.domain}${ProcessorAdapterUrls.multihopServices}`;
  get13ListUrl = `${basePath.domain}${ProcessorAdapterUrls.get13List}`;
  getServiceListUrl = `${basePath.domain}${ProcessorAdapterUrls.getServiceList}`;

  constructor(private _http: HttpClient) {}

  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': 15,
      'sort-column': '',
      'sort-order': 'desc',
    },
  };

  getProcessorAdapter(payload): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.processorAdapterUrl, this.variable);
  }

  get13List(payload): Observable<any> {
    return this._http.get<any>(this.get13ListUrl);
  }

  getServiceList(payload): Observable<any> {
    return this._http.get<any>(this.getServiceListUrl);
  }

  getProcessorAdapterDetails(id: any): Observable<any> {
    return this._http.get<any>(this.processorAdapterUrl + '/' + id.payload);
  }

  putProcessorAdapter(data: any): Observable<any> {
    return this._http.put<any>(this.processorAdapterUrl + '/' + data.payload.id, data.payload);
  }

  postProcessorAdapter(data: any): Observable<any> {
    return this._http.post<any>(this.processorAdapterUrl, data.payload);
  }
}
