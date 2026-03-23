import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectLimitsAndPermission } from '@app/store/selectors/velocity-limits.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import {
  VelocityLimitsUrls,
  VelocityLimitsEditUrls,
  VelocityLimitsDeleteUrls,
  basePath,
} from '../config/i18n/services/request.url.config';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';

@Injectable()
export class VelocityLimitsService {
  LogsUrl = `${basePath.domain}${VelocityLimitsUrls.getLimits}`;
  transactionLogsUrl = `${basePath.domain}${VelocityLimitsEditUrls.getTransactionTypeList}`;
  institutionLogsUrl = `${basePath.domain}${VelocityLimitsEditUrls.getInstitutionTreeList}`;
  currencyLogUrl = `${basePath.domain}${VelocityLimitsEditUrls.getCurrencyNew}`;
  deleteLogsUrl = `${basePath.domain}${VelocityLimitsDeleteUrls.deleteLimits}`;
  updateLogsUrl = `${basePath.domain}${VelocityLimitsEditUrls.updateLimits}`;
  createLogsUrl = `${basePath.domain}${VelocityLimitsEditUrls.createLimits}`;
  public variable: any = {
    params: {
      filters: null,
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };
  constructor(private _http: HttpClient, private _store: Store<IAppState>) {}
  getLimits(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.LogsUrl, this.variable);
  }
  getTransactionTypeList(): Observable<any> {
    return this._http.get<any>(this.transactionLogsUrl, this.variable);
  }
  getInstitutionTreeList(): Observable<any> {
    return this._http.get<any>(this.institutionLogsUrl, this.variable);
  }
  getCurrency(): Observable<any> {
    return this._http.get(this.currencyLogUrl, this.variable);
  }
  getRowLimits(id): Observable<any> {
    return this._http.get<any>(this.LogsUrl + '/' + id.payload);
  }
  deleteLimits(payload): Observable<any> {
    return this._http.delete<any>(this.deleteLogsUrl + '/' + payload);
  }
  createLimits(data): Observable<any> {
    return this._http.post<any>(this.createLogsUrl, data.payload);
  }
  updateLimits(payload): Observable<any> {
    return this._http.put<any>(this.updateLogsUrl + '/' + payload.payload.id, payload.payload);
  }
}
