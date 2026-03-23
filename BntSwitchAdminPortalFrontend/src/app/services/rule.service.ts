import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { basePath, RuleEngine } from '@app/config/i18n/services/request.url.config';

@Injectable()
export class RulesService {
  getRuleItemUrl = `${basePath.domain}${RuleEngine.getRuleItem}`;
  postRuleUrl = `${basePath.domain}${RuleEngine.postRule}`;
  putRuleUrl = `${basePath.domain}${RuleEngine.postRule}`;
  getRuleConditionUrl = `${basePath.domain}${RuleEngine.getRuleCondition}`;

  public variable: any = {
    'page-no': 1,
    'page-size': '15',
    'sort-column': '',
    'sort-order': 'asc',
  };

  constructor(private _http: HttpClient) {}
  getRuleItem(payload: any): Observable<any> {
    return this._http.get<any>(this.getRuleItemUrl + '/' + payload.payload);
  }

  getRuleCondition(payload): Observable<any> {
    return this._http.get<any>(this.getRuleConditionUrl + '/' + payload.payload?.ruletype);
  }

  postRule(payload: any): Observable<any> {
    return this._http.post<any>(this.postRuleUrl, payload);
  }
  putRule(payload): Observable<any> {
    return this._http.put<any>(this.putRuleUrl + '/' + payload.rule, payload.saveObject);
  }
}
