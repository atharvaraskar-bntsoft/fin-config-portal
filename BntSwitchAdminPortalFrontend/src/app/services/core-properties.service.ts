import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorePropertiesUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class CorePropertiesService {

  corePropertiesUrl = `${basePath.domain}${CorePropertiesUrls.getCorePropertiesScreen}`;
  downloadCorePropertiesUrl = `${basePath.domain}${CorePropertiesUrls.downloadCoreProperties}`;
  uploadCorePropertiesUrl = `${basePath.domain}${CorePropertiesUrls.uploadCoreProperties}`;

  constructor(private _http: HttpClient) { }

  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'des',
    },
  };

  getCorePropetiesList(payload?: any): Observable<any>{
    if (payload.payload !== undefined) {
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.corePropertiesUrl, this.variable);
  }

  deleteCoreProperties(versionId: any): Observable<any> {
    return this._http.delete<any>(this.corePropertiesUrl + '/corepropertydetail/' + versionId);
  }

  getDefaultProperties(): Observable<any> {
    return this._http.get<any>(this.corePropertiesUrl + '/getDefaultCoreProperties');
  }

  getCorePropertiesById(versionId: any): Observable<any> {
    return this._http.get<any>(this.corePropertiesUrl + '/' + versionId);
  }

  validateCorePropertiesName(name: string): Observable<any> {
    return this._http.get<any>(this.corePropertiesUrl + '/validate-coreProperties-name/' + name);
  }

  saveCoreProperties(requestBody: any): Observable<any> {
    return this._http.post<any>(this.corePropertiesUrl + '/draft', requestBody);
  }


  downloadCoreProperties(versionId: number): Observable<any> {
    return this._http.get<any>(
      `${this.downloadCorePropertiesUrl}/${versionId}`
    );
  }
  
  uploadCorePropertiesFile(requestBody: any): Observable<any> {
    return this._http.post<any>(
      this.uploadCorePropertiesUrl,
      requestBody
    );
  }
  
  
}
