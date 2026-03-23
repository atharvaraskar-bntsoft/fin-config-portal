import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DeviceUrls, basePath, ExtractorUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class ExtractorService {
  // GetExtractor(payload: any): any {
  //     throw new Error('Method not implemented.');
  // }
  ExtractorUrl = `${basePath.domain}${ExtractorUrls.getExtractor}`;
  getByIdExtractorUrl = `${basePath.domain}${ExtractorUrls.getByIdExtractor}`;
  postExtractorUrl = `${basePath.domain}${ExtractorUrls.postExtractor}`;
  putExtractorUrl = `${basePath.domain}${ExtractorUrls.putExtractor}`;
  startExtractorUrl = `${basePath.domain}${ExtractorUrls.startExtractor}`;
  stopExtractorUrl = `${basePath.domain}${ExtractorUrls.stopExtractor}`;
  pauseExtractorUrl = `${basePath.domain}${ExtractorUrls.pauseExtractor}`;
  resumeExtractorUrl = `${basePath.domain}${ExtractorUrls.resumeExtractor}`;
  getMessageContext = `${basePath.domain}${ExtractorUrls.getMessageContextImListbyVersion}`

  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(private _http: HttpClient) { }

  getExtractor(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.ExtractorUrl, this.variable);
  }

  getByIdExtractor(payload?: any): Observable<any> {
    return this._http.get<any>(this.getByIdExtractorUrl + '/' + payload);
  }

  public getMessageContextList(imfid): Observable<any> {
    return this._http.get<any>(this.getMessageContext  + '/' + imfid);
  }

  postExtractor(payload): Observable<any> {
    const url = this.postExtractorUrl;
    return this._http.post<any>(url, payload);
  }

  putExtractor(payload): Observable<any> {
    const url = this.putExtractorUrl + '/' + payload.id;
    return this._http.put<any>(url, payload);
  }

  getDeviceModelMapping(): Observable<any> {
    const url = `${basePath.domain}${DeviceUrls.deviceModelUrl}`;
    return this._http.get(url);
  }

  startExtractor(id: any): Observable<any> {
    return this._http.get<any>(this.startExtractorUrl + '/' + id.payload.versionId);
  }

  stopExtractor(id: any): Observable<any> {
    return this._http.get<any>(
      this.stopExtractorUrl + '/' + id.payload.versionId,
    );
  }

  pauseExtractor(id: any): Observable<any> {
    return this._http.get<any>(
      this.pauseExtractorUrl + '/' + id.payload.versionId,
    );
  }

  resumeExtractor(id: any): Observable<any> {
    return this._http.get<any>(
      this.resumeExtractorUrl + '/' + id.payload.versionId,
    );
  }

  getSenderDefaultProperty(): Observable<any> {
    const url = `${basePath.domain}/dummy1`;
    return this._http.get<any>(url);
  }

  getAttributeJson(payload): Observable<any> {
    const url = `${basePath.domain}/adapter/convertPackagerData`;
    return this._http.post<any>(url, payload);
  }

}
