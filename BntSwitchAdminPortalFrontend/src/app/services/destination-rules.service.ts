import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { basePath, DestinationRulesUrls } from '@app/config/i18n/services/request.url.config';

@Injectable({
  providedIn: 'root',
})
export class DestinationRulesService {
  DestinationUrl = `${basePath.domain}${DestinationRulesUrls.getDestination}`;
  DestinationRulesUrl = `${basePath.domain}${DestinationRulesUrls.getDestinationRules}`;
  ConditionUrl = `${basePath.domain}${DestinationRulesUrls.getConditions}`;
  RuleTypeUrl = `${basePath.domain}${DestinationRulesUrls.getRuleType}`;
  UpdRuleTypeUrl = `${basePath.domain}${DestinationRulesUrls.updRule}`;
  ConfrimRule = `${basePath.domain}${DestinationRulesUrls.conFrimRule}`;

  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(private _http: HttpClient) {}
  getDestination(payload): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.DestinationUrl, this.variable);
  }
  getDestinationRules(payload): Observable<any> {
    if (payload.payload.filter !== undefined) {
      this.variable.params['ruletype'] = payload.payload.ruleType;
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    } else {
      this.variable.params['ruletype'] = payload.payload;
    }
    return this._http.get<any>(this.DestinationRulesUrl, this.variable);
  }
  getConditions(): Observable<any> {
    return this._http.get<any>(this.ConditionUrl);
  }

  getRuleType(): Observable<any> {
    return this._http.get<any>(this.RuleTypeUrl);
  }
  updRuleList(rule: any): Observable<any> {
    return this._http.put<any>(
      this.UpdRuleTypeUrl + '/' + rule.ruleConfiguration[rule.ruleConfiguration.length - 1].id,
      { active: rule.active },
    );
  }
  confrimRule(rule: any): Observable<any> {
    return this._http.put<any>(this.ConfrimRule + '/' + rule, { verified: 1 });
  }
  confrimUpdateRule(rule: any): Observable<any> {
    return this._http.put<any>(this.ConfrimRule + '/' + rule, { verified: 0 });
  }
}
