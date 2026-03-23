import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { emvDataUrls, basePath } from '@app/config/i18n/services/request.url.config';

@Injectable({
  providedIn: 'root',
})
export class EmvDataService {
  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };
  constructor(private _http: HttpClient) {}

  getEMVData(payload?) {
    if (payload && payload.payload !== undefined) {
      // this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    const url = `${basePath.domain}${emvDataUrls.getList}`;
    return this._http.get(url, this.variable);
  }

  createEMV(payload) {
    const url = `${basePath.domain}${emvDataUrls.saveEMV}`;
    return this._http.post(url, payload);
  }

  updateEMV(data) {
    console.log('data is', data);
    return of([]);
  }

  uniqueModelName(name) {
    const url = `${basePath.domain}${emvDataUrls.validateModelName}/${name}`;
    return this._http.get(url);
  }
}
