import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basePath, l3AdapterUrls } from '../config/i18n/services/request.url.config';
import { map } from 'rxjs/operators';

@Injectable()
export class L3AdapterService {
  getL3AdapterListUrl = `${basePath.domain}${l3AdapterUrls.getL3AdapterList}`;
  getL3AdapterUrl = `${basePath.domain}${l3AdapterUrls.getL3Adapter}`;
  getL3AdapterByIdUrl = `${basePath.domain}${l3AdapterUrls.getL3AdapterById}`;
  getNetworkUrl = `${basePath.domain}${l3AdapterUrls.getL3Network}`;
  copyL3AdapterUrl = `${basePath.domain}${l3AdapterUrls.copyL3Adapter}`;
  getPostActionMethodUrl = `${basePath.domain}${l3AdapterUrls.postActionMethodUrl}`;
  getStepListMethodUrl = `${basePath.domain}${l3AdapterUrls.StepListMethodUrl}`;

  getPreActionMethodUrl = `${basePath.domain}${l3AdapterUrls.preActionMethodUrl}`;
  downloadL3ConfigUrl = `${basePath.domain}${l3AdapterUrls.downloadL3Config}`;
  uploadL3AdapterConfigUrl = `${basePath.domain}${l3AdapterUrls.uploadL3Config}`;
  

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

  getL3AdapterList(payload?: any): Observable<any> {
    if (payload !== undefined) {
      this.variable.params.filters = payload.filter;
      this.variable.params['page-no'] = payload.page;
      this.variable.params['page-size'] = payload['page-size'];
    }
    return this._http.get<any>(this.getL3AdapterListUrl, this.variable);
  }

  getL3Adapter(payload: any): Observable<any> {
    return this._http.get<any>(this.getL3AdapterUrl + '/' + payload.template);
  }

  getL3AdapterById(payload: any): Observable<any> {
    return this._http.get<any>(this.getL3AdapterByIdUrl + '/' + payload);
  }

  getL3Network(payload: any): Observable<any> {
    return this._http.get<any>(this.getNetworkUrl + '/' + payload.template);
  }

  copyL3Adapter(payload: any): Observable<any> {
    return this._http.post<any>(this.copyL3AdapterUrl, payload);
  }
  
  public downloadL3Adapter(payload: { adapterId: number; version: string }): Observable<any> {
    return this._http.post<any>(this.downloadL3ConfigUrl, payload);
  }
  
  public uploadL3Adapter(payload: any): Observable<any> {
    return this._http.post<any>(this.uploadL3AdapterConfigUrl, payload);
  }


  public dataTypeFilter(data, typeFilter: string) {
    return data
      .map(item => {
        if (item.value !== '' && item.mtype === typeFilter) {
          item.field = item.field.replaceAll(item.mtype + '--', '');
          delete item.mtype;
          delete item.custom;
          return item;
        } else {
          return item;
        }
      })
      .filter(item => item);
  }

  public transformData(adapterData) {
    if ('networkData' in adapterData) {
      adapterData = JSON.parse(JSON.stringify(adapterData));
      if (adapterData.networkData.properties.network) {
        adapterData.networkData.properties.network = this.dataTypeFilter(
          adapterData.networkData.properties.network,
          'network',
        );
      }
      if (adapterData.networkData.properties.message) {
        adapterData.networkData.properties.message = this.dataTypeFilter(
          adapterData.networkData.properties.message,
          'message',
        );
      }
    }
    return adapterData;
  }

  public upload(file) {
    const uploadURL = `${basePath.domain}/data-files/upload`;
    return this._http
      .post<any>(uploadURL, file, {
        observe: 'events',
      })
      .pipe(
        map(event => {
          if (event) {
            switch (event.type) {
              case HttpEventType.Response:
                return event.body;
              default:
                return null;
            }
          }
        }),
      );
  }
  public getPostActionMethod(): Observable<any> {
    return this._http.get<any>(this.getPostActionMethodUrl);
  }

  public getPreActionMethod(): Observable<any> {
    return this._http.get<any>(this.getPreActionMethodUrl);
  }

  public GetStepListMethod(): Observable<any> {
    return this._http.get<any>(this.getStepListMethodUrl);
  }
}
