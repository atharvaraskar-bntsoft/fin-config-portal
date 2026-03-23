import { Injectable } from '@angular/core';
import { basePath, InstitutionGroupUrls, Router } from '../config/i18n/services/request.url.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RouterService {
  getRouterListUrl = `${basePath.domain}${Router.getRouter}`;
  getServiceListUrl = `${basePath.domain}${Router.serviceType}`;
  getRuleListUrl = `${basePath.domain}${Router.ruleList}`;
  saveRuleListUrl = `${basePath.domain}${Router.saveRule}`;
  updateRuleListUrl = `${basePath.domain}${Router.saveRule}`;
  commitRuleListUrl = `${basePath.domain}${Router.commitRule}`;
  deleteRuleListUrl = `${basePath.domain}${Router.deleteRoute}`;
  updateRouterListUrl = `${basePath.domain}${Router.updateRouter}`;
  getRuleConditionUrl = `${basePath.domain}${Router.getRuleCondition}`;

  public variable: any = {
    params: {
      filters: null,
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(public _http: HttpClient) {}
  getRouterList(payload): Observable<any> {
    let url;
    if (payload.payload.filter !== undefined && payload.payload.filter !== '') {
      url = payload.payload.url;
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    } else {
      delete this.variable.params.filters;
      url = payload.payload;
    }
    return this._http.get<any>(this.getRouterListUrl + url, this.variable);
  }
  getServiceList(router): Observable<any> {
    return this._http.get<any>(this.getServiceListUrl + router.payload);
  }
  getruleListList(router): Observable<any> {
    return this._http.get<any>(this.getRuleListUrl + router.payload);
  }
  commitRuleList(rule): Observable<any> {
    if (rule.payload.id) {
      return this._http.put<any>(this.commitRuleListUrl + '/' + rule.payload.id, rule.payload);
    } else {
      return this._http.post<any>(this.commitRuleListUrl, rule.payload);
    }
  }
  saveRuleListList(rule): Observable<any> {
    if (rule.payload.id) {
      return this._http.put<any>(this.saveRuleListUrl + '/' + rule.payload.id, rule.payload);
    } else {
      return this._http.post<any>(this.saveRuleListUrl, rule.payload);
    }
  }

  addRuleListList(rule): Observable<any> {
    return this._http.post<any>(this.saveRuleListUrl, rule.payload);
  }
  updateRuleList(rule): Observable<any> {
    return this._http.get<any>(this.saveRuleListUrl + '/' + rule.payload);
  }
  deleteRouteList(rule): Observable<any> {
    return this._http.delete<any>(this.deleteRuleListUrl + '/' + rule.payload);
  }
  updRouterList(rule): Observable<any> {
    return this._http.put<any>(this.updateRouterListUrl + '/' + rule.payload.id, {
      live: !rule.payload.live,
    });
  }
  getRuleCondition(): Observable<any> {
    return this._http.get<any>(this.getRuleConditionUrl);
  }
}
