import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  basePath,
  l1AdapterUrls,
  LookUpConfigurationUrls,
} from '../../config/i18n/services/request.url.config';
import { map } from 'rxjs/operators';


@Injectable()
export class MainService {

  getMessageContextListUrl = `${basePath.domain}${l1AdapterUrls.getMessageContextImListbyVersion}`;
  getStepListMethodUrl = `${basePath.domain}${l1AdapterUrls.StepListMethodUrl}`;

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

  public GetStepListMethod(): Observable<any> {
    return this._http.get<any>(this.getStepListMethodUrl);
  }

  getIPC(): Observable<any> {
    return this._http.get<any>(`${environment['serviceCoreUrl']}/lookup-value-list/INTERNAL_PROCESSING_CODE`);
  }

  // public getMessageContextList(imfid): Observable<any> {
  //   return this._http.get<any>(`${environment['serviceCoreUrl']}/get-messagecontext-fieldList-by-imf-version/${imfid}`);
  // }
  
  public getImfList(id): Observable<any> {
    
    return this._http.get<any>(`${environment['serviceCoreUrl']}/imf-field-list-byid-hide-false/${id}`);
  }
  public getServiceList(): Observable<any> {
    return this._http.get<any>(`${environment['serviceCoreUrl']}/lookup-value-list/SERVICE_TYPE`);
  }
  
  postData(data: any): Observable<any> {
    return this._http.post<any>(`${environment['serviceCoreUrl']}/component`, data);
  }

  getBuiltMapperList(templateId): Observable<any> {
    return this._http.get<any>(`${environment['serviceCoreUrl']}/AdapterToolKit-Transform/get-scheme-mapper-list/${templateId}`);
  }

  public getAdapterDataMap(): Observable<any> {
    return this._http.get<any>(`${environment['serviceCoreUrl']}/adapter-data-map`);
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

}
