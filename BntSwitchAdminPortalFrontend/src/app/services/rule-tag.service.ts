import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { basePath, ruleTagUrls, tagUrls } from '../config/i18n/services/request.url.config';
import { ITagsList } from '@app/routing/tag/tag';
import { selectNewTagList } from '@app/store/selectors/rule-tag.selectors';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';

const data = [
  {
    name: 'TAG_NAME',
    service_type: 'AUTH_SERVICE',
    service: 'request',
    condition: {
      type: 'or',
      conditions: [
        {
          type: 'equal',
          fieldName: '${payment_method}',
          value: 'CARD',
        },
        {
          type: 'equal',
          fieldName: '${payment_method}',
          value: 'ECOM',
        },
      ],
    },
    active: 1,
    deleted: 0,
    tag: 'HIGH_RISK',
  },
  {
    name: 'New Tag',
    service_type: 'AUTH_SERVICE',
    service: 'request',
    condition: {
      type: 'or',
      conditions: [
        {
          type: 'equal',
          fieldName: '${payment_method}',
          value: 'CARD',
        },
      ],
    },
    active: 0,
    deleted: 0,
    tag: 'HIGH_RISK',
  },
];

@Injectable()
export class RuleTagService {
  public getRuleTagListUrl = `${basePath.domain}${ruleTagUrls.getRuleTagList}`;
  public deleteRuleTagUrl = `${basePath.domain}${ruleTagUrls.updateRuleTag}`;
  public postRuleTagUrl = `${basePath.domain}${ruleTagUrls.updateRuleTag}`;
  public getRuleTagUrl = `${basePath.domain}${ruleTagUrls.getRuleTags}`;
  public putRuleTagUrl = `${basePath.domain}${ruleTagUrls.updateRuleTag}`;
  public getRuleTagIdUrl = `${basePath.domain}${ruleTagUrls.getRuleTagList}`;
  public getConditionsUrl = `${basePath.domain}${ruleTagUrls.getConditions}`;
  public getOperatorTypeList = `${basePath.domain}${ruleTagUrls.getOperatorTypeList}`;
  public getImfMessageListUrl = `${basePath.domain}${ruleTagUrls.getImfMessageList}`;
  public getNewTagsUrl = `${basePath.domain}${tagUrls.getTags}`;
  public createTagsUrl = `${basePath.domain}${tagUrls.createTag}`;
  public editTagsUrl = `${basePath.domain}${tagUrls.editTags}`;
  public updateTagsUrl = `${basePath.domain}${tagUrls.updateTag}`;
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

  public getRuleTagList(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getRuleTagListUrl, this.variable);
  }

  public deleteRuleTag(id: any): Observable<any> {
    return this._http.delete<any>(this.deleteRuleTagUrl + '/' + id);
  }

  public postRuleTag(payload): Observable<any> {
    payload = JSON.parse(JSON.stringify(payload));
    payload.nodes = this.transformData(payload.nodes);
    return this._http.post<any>(this.postRuleTagUrl, payload);
  }

  public getRuleTagId(payload: any): Observable<any> {
    return this._http.get<any>(this.getRuleTagIdUrl + '/' + payload.payload);
  }

  public updateRuleTag(payload): Observable<any> {
    return this._http.put<any>(this.putRuleTagUrl + '/' + payload.id, payload);
  }

  public getTags(): Observable<any> {
    return this._http.get<any>(this.getRuleTagIdUrl);
  }

  public getConditions(): Observable<any> {
    return this._http.get<any>(this.getConditionsUrl);
  }

  public getOperatorList(): Observable<any> {
    return this._http.get<any>(this.getOperatorTypeList);
  }

  public getImfMessageList(): Observable<any> {
    return this._http.get<any>(this.getImfMessageListUrl);
  }

  public getNewTags(payload?: any): Observable<any> {
    const variable = {
      params: {},
    };
    if (payload.payload !== undefined) {
      variable.params['page-no'] = payload.payload.page;
      variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getNewTagsUrl, variable);
  }

  public createTag(payload): Observable<any> {
    return this._http.post<any>(this.createTagsUrl, payload);
  }

  public editTagId(payload: any): Observable<any> {
    return this._http.get<any>(this.editTagsUrl + payload);
  }
  public updateTag(payload): Observable<any> {
    return this._http.put<any>(this.updateTagsUrl + payload.id, payload);
  }

  public transformData(nodes) {
    return nodes.map(item => {
      delete item.typeList;
      delete item.operators;
      delete item.dataList;
      if (item.nodes.length) {
        this.transformData(item.nodes);
      }
      return item;
    });
  }

  public getSelectRuleTagList() {
    return this._store.pipe(select(selectNewTagList));
  }

  public getSelectPermissionsData() {
    return this._store.pipe(select(selectPermissionsData));
  }
}
