import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { basePath, RuntimePropertiesUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class RuntimePropertiesService {
  getRuntimePropertyUrl = `${basePath.domain}${RuntimePropertiesUrls.runtimeProperty}`;
  getPropertyUrl = `${basePath.domain}${RuntimePropertiesUrls.property}`;
  setPropertyUrl = `${basePath.domain}${RuntimePropertiesUrls.property}`;
  private subject = new Subject<any>();

  public variable: any = {
    params: {
      filters: null,
      'parentpath': '',
      'fileName': '',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(public _http: HttpClient) {}


  public getRuntimeProperty(payload?: any): Observable<any> {
    return this._http.get<any>(this.getRuntimePropertyUrl);
  }

  public getPropertyFile(payload: any): Observable<any> {
    return this._http.post<any>(this.getRuntimePropertyUrl,payload);
  }

  public setPropertyFileData(payload: any): Observable<any> {
    return this._http.post<any>(this.setPropertyUrl,payload);
  }

  sendItems(items: any) {
    this.subject.next(items);
  }

  getItems(): Observable<any> {
    return this.subject.asObservable();
  }

}
