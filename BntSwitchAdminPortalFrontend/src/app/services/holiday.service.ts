import { currentItem } from './../models/schedule-router.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basePath, HolidayUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class HolidayService {
  getHolidayList = `${basePath.domain}${HolidayUrls.getHolidayList}`;
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
  getHoliday(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this. getHolidayList, this.variable);
  }
 
}
