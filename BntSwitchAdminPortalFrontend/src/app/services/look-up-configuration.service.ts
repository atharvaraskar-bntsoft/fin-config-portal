import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookUpConfigurationUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class LookUpConfigurationService {
  getLookUpTypeUrl = `${basePath.domain}${LookUpConfigurationUrls.lookUpType}`;
  deleteLookUpTypeUrl = `${basePath.domain}${LookUpConfigurationUrls.lookUpType}`;
  postLookUpTypeUrl = `${basePath.domain}${LookUpConfigurationUrls.lookUpType}`;
  putLookUpTypeUrl = `${basePath.domain}${LookUpConfigurationUrls.lookUpType}`;
  getLookUpValueUrl = `${basePath.domain}${LookUpConfigurationUrls.lookUpValue}`;
  updateLookUpValueUrl = `${basePath.domain}${LookUpConfigurationUrls.lookUpValue}`;
  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'des',
    },
  };
  constructor(private _http: HttpClient) {}
  getLookUpType(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getLookUpTypeUrl, this.variable);
  }

  deleteLookUpType(id: any): Observable<any> {
    return this._http.delete<any>(this.deleteLookUpTypeUrl + '/' + id);
  }
  updateLookUpType(payload): Observable<any> {
    return this._http.put<any>(this.putLookUpTypeUrl + '/' + payload.id, payload);
  }
  postLookUpType(payload): Observable<any> {
    return this._http.post<any>(this.postLookUpTypeUrl, payload);
  }
  getLookUpValue(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getLookUpValueUrl + '/' + payload.payload?.id, this.variable);
  }
  updateLookUpValue(payload): Observable<any> {
    return this._http.put<any>(this.updateLookUpValueUrl + '/' + payload.id, payload.data);
  }
}
