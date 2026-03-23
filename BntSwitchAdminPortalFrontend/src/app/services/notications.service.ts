import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { basePath, NotificationsUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class NotificationsService {
  AlertsUrl = `${basePath.domain}${NotificationsUrls.getAlerts}`;
  NotificationsUrl = `${basePath.domain}${NotificationsUrls.getNotification}`;
  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(private _http: HttpClient) {}

  getAlerts(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.AlertsUrl, this.variable);
  }

  getNotifications(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.NotificationsUrl, this.variable);
  }
}
