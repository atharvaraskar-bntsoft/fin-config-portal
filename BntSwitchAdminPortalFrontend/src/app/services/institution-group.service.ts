import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InstitutionGroupUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class InstitutionGroupService {
  getInstitutionGroupsUrl = `${basePath.domain}${InstitutionGroupUrls.getInstitutionGroups}`;
  getInstitutionGroupListUrl = `${basePath.domain}${InstitutionGroupUrls.getInstitutionGroupList}`;
  getInstitutionGroupDetailsUrl = `${basePath.domain}${InstitutionGroupUrls.getInstitutionGroupDetails}`;
  validateInstitutionGroupsUrl = `${basePath.domain}${InstitutionGroupUrls.validate}`;
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
  getInstitutionGroups(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }

    return this._http.get<any>(this.getInstitutionGroupsUrl, this.variable);
  }
  getInstitutionGroupList(): Observable<any> {
    return this._http.get<any>(this.getInstitutionGroupListUrl, this.variable);
  }
  getInstitutionGroupDetails(id): Observable<any> {
    return this._http.get<any>(
      this.getInstitutionGroupDetailsUrl + '/' + id.payload,
      this.variable,
    );
  }
  getRowDataInstitutionGroups(id): Observable<any> {
    return this._http.get<any>(this.getInstitutionGroupsUrl + '/' + id.payload);
  }
}
