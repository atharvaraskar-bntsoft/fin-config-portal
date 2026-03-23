import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { basePath, JsonCompareUrls } from '@app/config/i18n/services/request.url.config';

@Injectable()
export class JsonCompareService {

  getComponentTypeUrl = `${basePath.domain}${JsonCompareUrls.getComponentType}`;
  postJsonCompareUrl = `${basePath.domain}${JsonCompareUrls.postJsonCompare}`;


  constructor(private _http: HttpClient) { }

  getComponentTypeList(payload): Observable<any> {
    return this._http.get<any>(this.getComponentTypeUrl + '/' + payload);
  }
  postJson(payload): Observable<any> {
    return this._http.post<any>(this.postJsonCompareUrl, payload);
  }

}
