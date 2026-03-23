import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstitutionGroupUrls, basePath } from '@app/config/i18n/services/request.url.config';

@Injectable()
export class FilterService {
  filterUrl = `${basePath.domain}`;
  constructor(public http: HttpClient) {}
  public populateFilterData(payloadUrl) {
    return this.http.get<any>(this.filterUrl + payloadUrl.payload);
  }
}
