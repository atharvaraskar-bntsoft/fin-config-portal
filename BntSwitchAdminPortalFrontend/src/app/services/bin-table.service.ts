import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { basePath, BinTableUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class BinTableService {
  binDataDetailsUrl = `${basePath.domain}${BinTableUrls.getBinTableData}`;
  getAccountTypeDetailsUrl = `${basePath.domain}${BinTableUrls.getAccountTypeDetails}`;
  getBinMasterAllUrl = `${basePath.domain}${BinTableUrls.getBinMasterAll}`;
  getBinTableDataUrl = `${basePath.domain}${BinTableUrls.getBinTableData}`;
  getBinMasterUrl = `${basePath.domain}${BinTableUrls.getBinMaster}`;
  binTableUrl = `${basePath.domain}${BinTableUrls.getBinTable}`;
  getBinTableAllUrl = `${basePath.domain}${BinTableUrls.getBinTableAll}`;
  accountTypeUrl = `${basePath.domain}${BinTableUrls.getAccountType}`;
  public variable: any = {
    params: {
      // filters: null,
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(private _http: HttpClient) {}
  getBinTable(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      // this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.binTableUrl, this.variable);
  }

  getBinTableAll(): Observable<any> {
    return this._http.get<any>(this.getBinTableAllUrl);
  }

  getAccountType(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      // this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.accountTypeUrl, this.variable);
  }

  getBinMasterAll(): Observable<any> {
    return this._http.get<any>(this.getBinMasterAllUrl);
  }

  getBinTableData(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      // this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getBinTableDataUrl, this.variable);
  }


  binDataDetails(payload: any): Observable<any> {
    let url: string;
    this.variable = {
      params: {
         filters: null,
        'page-no': 1,
        'page-size': '15',
        'sort-column': '',
        'sort-order': 'asc',
      }
    }
    if (payload.payload !== undefined) {
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    url = this.binDataDetailsUrl
    if (payload.payload['filters']) {
      this.variable.params['filters'] = payload.payload['filters'];
    }
    return this._http.get<any>(url, this.variable);
  }

  getAccountTypeDetails(payload: any): Observable<any> {
    let url: string;
    if (payload.payload !== undefined) {
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    if (payload.payload.id) {
      url = this.getAccountTypeDetailsUrl + '/' + payload.payload.id;
    } else {
      url = this.accountTypeUrl;
    }
    return this._http.get<any>(url, this.variable);
  }

  public uploadFile(payload: any): Observable<any> {
    const url = `${basePath.domain}${BinTableUrls.uploadFile}`;
    return this._http.post(url, payload.payload);
  }
}
