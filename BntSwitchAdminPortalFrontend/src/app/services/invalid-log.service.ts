import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { basePath, InvalidLogUrls } from '../config/i18n/services/request.url.config';
/*
  This Service will  work for the below screens:
  1. SAF Screen
  2. Exceptional Screen and
  3. Invalid Logs
*/
@Injectable()
export class InvalidLogService {
  // getSafProcessorList(): any {
  //   throw new Error('Method not implemented.');
  // }
  LogsUrl = `${basePath.domain}${InvalidLogUrls.getInvalidLogs}`;
  DeleteMultiple = `${basePath.domain}${InvalidLogUrls.deleteMultiple}`;
  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '20',
      'sort-column': '',
      'sort-order': 'des',
    },
  };

  public safVariable: any = {
    params: {
      'page-no': 1,
      'page-size': '20',
      'sort-column': 'lastAttemptTime',
      'sort-order': 'des',
    },
  };

  constructor(private _http: HttpClient) {}
  getInvalidLogs(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    } else {
      this.variable = {
        params: {
          'page-no': 1,
          'page-size': '15',
          'sort-column': '',
          'sort-order': 'des',
        },
      };
    }
    return this._http.get<any>(this.LogsUrl, this.variable);
  }

  deleteMultiple(payload): Observable<any> {
    return this._http.put<any>(this.DeleteMultiple, payload);
  }

  getSAFQueue(payload?: any): Observable<any> {
    delete this.safVariable.params.filters;
    let url = `${basePath.domain}${InvalidLogUrls.safList}`;
    if (payload !== undefined) {
      this.safVariable.params['page-no'] = payload.page;
      this.safVariable.params['page-size'] = payload['page-size'];
      if (payload.filter) {
        this.safVariable.params.filters = payload.filter;
      }
    }
    return this._http.get<any>(url, this.safVariable);
  }

  getExceptionQueueList(payload) {
    delete this.safVariable.params.filters;
    this.setPayload(payload);
    let url = `${basePath.domain}${InvalidLogUrls.exceptionList}`;
    if (payload !== undefined) {
      this.safVariable.params['page-no'] = payload.page;
      this.safVariable.params['page-size'] = payload['page-size'];
      if (payload.filter) {
        this.safVariable.params.filters = payload.filter;
      }
    }
    return this._http.get<any>(url, this.safVariable);
  }

  moveToSafQueue(payload) {
    const url = `${basePath.domain}${InvalidLogUrls.moveToSaf}`;
    return this._http.put(url, payload);
  }

  deleteExceptionalQueue(payload) {
    const url = `${basePath.domain}${InvalidLogUrls.deleteSaf}/${payload.id}`;
    return this._http.delete(url);
  }

  getSafStatusDDL() {
    const url = `${basePath.domain}${InvalidLogUrls.safQueueList}`;
    return this._http.get(url);
  }
  getSafProcessorList() {
    const url = `${basePath.domain}${InvalidLogUrls.safProcessorList}`;
    return this._http.get(url);
  }

  private setPayload(payload) {
    if (payload !== undefined) {
      this.variable.params['page-no'] = payload.page;
      this.variable.params['page-size'] = payload['page-size'];
      if (payload.payload && payload.filter) {
        this.variable.params.filters = payload.filter;
      }
    }
  }
}
