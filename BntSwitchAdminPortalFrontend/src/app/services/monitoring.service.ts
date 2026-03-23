import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MonitoringUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class MonitoringService {
  MonitoringUrl = `${basePath.domain}${MonitoringUrls.getMonitoringScreen}`;
  MonitoringOperation = `${basePath.domain}${MonitoringUrls.monitoringOperation}`;
  isSpinning = false;
  prevText;
  constructor(private _http: HttpClient) {}

  changeLoggerLogLevel(payload: any): Observable<any> {
    return this._http.put<any>(
      this.MonitoringOperation +
        '/' +
        payload.restURL +
        '/' +
        'logging' +
        '/' +
        payload.loggerName +
        '/' +
        payload.loggerLevel,
      {},
    );
  }

  getMonitoringScreen(): Observable<any> {
    return this._http.get<any>(this.MonitoringUrl);
  }

  getLoggerLogLevel(payload: any): Observable<any> {
    return this._http.get<any>(
      this.MonitoringOperation + '/' + payload.restURL + '/' + payload.loggerName + '/' + 'logging',
    );
  }

  killInstance(url: any): Observable<any> {
    return this._http.get<any>(this.MonitoringOperation + '/' + url + '/' + 'kill');
  }

  networkDumpInstance(payload: any): Observable<any> {
    return this._http.get<any>(
      this.MonitoringOperation +
        '/' +
        payload.dataObject.restURL +
        '/' +
        'toggleNetworkRequestResponse' +
        '/' +
        payload.flag,
    );
  }

  startInstance(url: any, componentName): Observable<any> {
    return this._http.get<any>(`${this.MonitoringOperation}/${url}/start/${componentName}`);
  }

  stopInstance(url: any, componentName): Observable<any> {
    return this._http.get<any>(`${this.MonitoringOperation}/${url}/stop/${componentName}`);
  }

  networkStatusForConnectionName(url: any, connectionName: any): Observable<any> {
    return this._http.get<any>(
      this.MonitoringUrl + '/networkStatusForConnectionName' + '/' + url + '/' + connectionName,
    );
  }

  ExecuteOperation(payload: any): Observable<any> {
    return this._http.put<any>(this.MonitoringOperation + '/methodcall', payload);
  }

  ExecutePropertyOperation(payload: any): Observable<any> {
    return this._http.put<any>(this.MonitoringOperation + '/updateproperty', payload);
  }

  toggleMaintenance(payload: any): Observable<any> {
    return this._http.put<any>(this.MonitoringOperation + '/toggleMaintenance', payload);
  }

  secretManagerOperation(payload: any): Observable<any> {
    return this._http.post<any>(this.MonitoringUrl + '/secretManager/status', payload);
  }

  showData(payload: any): Observable<any> {
    return this._http.post<any>(this.MonitoringUrl + '/component-monitoring-data', payload);
  }
}
