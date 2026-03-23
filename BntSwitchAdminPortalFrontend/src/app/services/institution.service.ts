import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstitutionUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class InstitutionService {
  CategoryCodeUrl = `${basePath.domain}${InstitutionUrls.getCategoryCode}`;
  InstitutionUrl = `${basePath.domain}${InstitutionUrls.getInstitution}`;
  InstitutionDetailUrl = `${basePath.domain}${InstitutionUrls.getInstitutionDetail}`;
  InstitutionListUrl = `${basePath.domain}${InstitutionUrls.getInstitutionList}`;
  InstitutionGroupListUrl = `${basePath.domain}${InstitutionUrls.getInstitutionGroupList}`;
  InstitutionServiceUrl = `${basePath.domain}${InstitutionUrls.getInstitutionService}`;
  InstitutionAdditionalServiceUrl = `${basePath.domain}${InstitutionUrls.getInstitutionAdditionalServiceList}`;
  CurrencyUrl = `${basePath.domain}${InstitutionUrls.getCurrency}`;
  InstitutionRowData = `${basePath.domain}${InstitutionUrls.getInstitutionRowData}`;
  getCountryListUrl = `${basePath.domain}${InstitutionUrls.getCountryList}`;
  getStateListUrl = `${basePath.domain}${InstitutionUrls.getStateList}`;
  public variable: any = {
    params: {
      filters: null,
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(private _http: HttpClient) {}

  getCategoryCode(): Observable<any> {
    return this._http.get<any>(this.CategoryCodeUrl);
  }

  getCurrency(): Observable<any> {
    return this._http.get<any>(this.CurrencyUrl);
  }

  getInstitution(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.InstitutionUrl, this.variable);
  }

  InstitutionDetail(id: any): Observable<any> {
    return this._http.get<any>(this.InstitutionDetailUrl + '/' + id);
  }

  getInstitutionGroupList(): Observable<any> {
    return this._http.get<any>(this.InstitutionGroupListUrl);
  }

  InstitutionService(): Observable<any> {
    return this._http.get<any>(this.InstitutionServiceUrl);
  }

  InstitutionAdditionalService(): Observable<any> {
    return this._http.get<any>(this.InstitutionAdditionalServiceUrl);
  }

  getInstitutionList(): Observable<any> {
    return this._http.get<any>(this.InstitutionListUrl);
  }

  getInstitutionRowData(id): Observable<any> {
    return this._http.get<any>(this.InstitutionUrl + '/' + id.payload);
  }

  getCountryList(): Observable<any> {
    const urlParams: any = {
      params: {
        'page-no': 1,
        'page-size': '15',
        'sort-column': '',
        'sort-order': 'asc',
      },
    };
    return this._http.get<any>(this.getCountryListUrl, urlParams);
  }
  getStateList(id): Observable<any> {
    return this._http.get<any>(this.getStateListUrl + '/' + id.payload);
  }
}
