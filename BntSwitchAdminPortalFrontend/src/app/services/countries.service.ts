import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CountriesUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class CountriesService {
  countriesUrl = `${basePath.domain}${CountriesUrls.getCountries}`;
  getCountryListUrl = `${basePath.domain}${CountriesUrls.getCountryList}`;
  getStateListUrl = `${basePath.domain}${CountriesUrls.getStateListbyCountry}`;
  getcountriesUrl = `${basePath.domain}${CountriesUrls.getCountries}`;
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

  getCountries(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getcountriesUrl, this.variable);
  }

  getCountryList(): Observable<any> {
    //  const urlParams: any = {
    //     params: {
    //       'page-no': 1,
    //       'page-size': '15',
    //       'sort-column': '',
    //       'sort-order': 'asc',
    //     }
    //   };
    return this._http.get<any>(this.getCountryListUrl, this.variable);
  }

  getStateList(id): Observable<any> {
    return this._http.get<any>(this.getStateListUrl + '/' + id.payload);
  }
}
