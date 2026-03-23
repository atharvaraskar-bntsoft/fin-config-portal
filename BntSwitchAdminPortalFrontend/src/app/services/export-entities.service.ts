import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ExportEntitiesUrls,
  InstitutionGroupUrls,
} from '../config/i18n/services/request.url.config';

@Injectable()
export class ExportEntitiesService {
  getExportEntitiesUrl = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.getExportEntities}`;
  getExportSchemaUrl = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.getExportSchema}`;
  getImportListUrl = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.importList}`;
  postExportSchemaUrl = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.postExportSchema}`;
  postImportSchemaUrl = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.postImportSchema}`;
  downloadSnapshotUrl = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.downloadSnapshot}`;
  getDataUrl = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.getData}`
  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(public _http: HttpClient) {}

  getExportEntities(payload?: any): Observable<any> {
    return this._http.get<any>(this.getExportEntitiesUrl);
  }

  getExportSchema(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getExportSchemaUrl, this.variable);
  }

  getImportList(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getImportListUrl, this.variable);
  }

  postExportSchema(payload: any): Observable<any> {
    return this._http.post<any>(this.postExportSchemaUrl, payload.payload);
  }

  PostImportSchema(payload: any): Observable<any> {
    return this._http.post<any>(this.postImportSchemaUrl, payload.payload);
  }

  fetchExportList(payload: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.payload.page;
      this.variable.params['page-size'] = payload.payload.payload['page-size'];
    }
    const url = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.exportSnapshot}`;
    return this._http.get(url, this.variable);
    // return of(data);
  }

  createExportSnapshot(payload: any) {
    const url = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.exportSnapshot}`;
    return this._http.post(url, payload.payload);
  }

  getSnapshotListToBeAdded(payload: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    const url = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.exportSnapshot}/all-versions`;
    return this._http.get(url, this.variable);
  }

  getSnapshotListById(id) {
    const url = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.exportSnapshot}/${id}`;
    return this._http.get(url);
  }

  downloadSnapshot(id) {
    this.variable.responseType = 'blob';
    const url = `${this.downloadSnapshotUrl}/${id}`;
    return this._http.get(url, this.variable);
  }

  postImportData(payload?: any) {  
    const url = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.importData}`;
    return this._http.post(url, payload);
  }


  postImportDataConfirmation(payload?: any) {
    const url = `${ExportEntitiesUrls.domain}${ExportEntitiesUrls.importDataConfirmation}`;
    return this._http.post(url, payload);
  }

  getData(id: any): Observable<any>{
    return this._http.get(this.getDataUrl + '/' + id);
  }
}
