import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { basePath, ApprovalsUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class ApprovalsService {
  ApprovalsUrl = `${basePath.domain}${ApprovalsUrls.getChecker}`;
  putApprovalsUrl = `${basePath.domain}${ApprovalsUrls.putChecker}`;
  getApprovalCountUrl = `${basePath.domain}${ApprovalsUrls.getCheckerCount}`;
  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(private _http: HttpClient) {}
  getApprovals(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.ApprovalsUrl, this.variable);
  }

  getApprovalCount(): Observable<any> {
    return this._http.get<any>(this.getApprovalCountUrl, this.variable);
  }
  postApprovals(payload): Observable<any> {
    return this._http.put<any>(this.putApprovalsUrl, payload);
  }
}
