import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  basePath,
  schemeImfMapperUrls,
  imfJsonUrl,
} from '../config/i18n/services/request.url.config';

@Injectable()
export class SchemeImfMapperService {
  getSchemeImfMapperUrl = `${basePath.domain}${schemeImfMapperUrls.gerSchemeImfMapper}`;
  getSchemeUrl = `${basePath.domain}${schemeImfMapperUrls.getScheme}`;
  getFieldUrl = `${basePath.domain}${schemeImfMapperUrls.getField}`;
  getIMFUrl = `${basePath.domain}${schemeImfMapperUrls.getIMF}`;
  getIPCUrl = `${basePath.domain}${schemeImfMapperUrls.getIPC}`;
  getMapUrl = `${basePath.domain}${schemeImfMapperUrls.getMap}`;
  saveSchemeImfMapperUrl = `${basePath.domain}${schemeImfMapperUrls.saveSchemeImfMapper}`;
  getFlFunctionUrl = `${basePath.domain}${schemeImfMapperUrls.getFlFunction}`;
  getIMFVersionUrl = `${basePath.domain}${imfJsonUrl.imfJson}${imfJsonUrl.getIMFVersion}`;
  getServiceUrl = `${basePath.domain}${schemeImfMapperUrls.getService}`;
  getBuiltMapperUrl = `${basePath.domain}${schemeImfMapperUrls.getMapperList}`;
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

  getSchemeImfMapper(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getSchemeImfMapperUrl, this.variable);
  }
  getScheme(): Observable<any> {
    return this._http.get<any>(this.getSchemeUrl);
  }
  getField(payload: any): Observable<any> {
    return this._http.get<any>(this.getFieldUrl + '/' + payload);
  }
  // getIMF(): Observable<any> {
  //   return this._http.get<any>(this.getIMFUrl);
  // }
  getIMF(payload: any): Observable<any> {
    return this._http.get<any>(this.getIMFUrl + payload.payload);
  }
  getIPC(): Observable<any> {
    return this._http.get<any>(this.getIPCUrl);
  }
  getMap(): Observable<any> {
    return this._http.get<any>(this.getMapUrl);
  }
  postSchemeImfMapper(payload: any): Observable<any> {
    return this._http.post<any>(this.saveSchemeImfMapperUrl, payload);
  }
  getElFunction(): Observable<any> {
    return this._http.get<any>(this.getFlFunctionUrl);
  }
  getIMFVersion(): Observable<any> {
    return this._http.get<any>(this.getIMFVersionUrl);
  }
  getServiceType(): Observable<any> {
    return this._http.get<any>(this.getServiceUrl);
  }
  getBuiltMapperList(payload): Observable<any> {
    return this._http.get<any>(this.getBuiltMapperUrl + payload.payload);
  }
}
