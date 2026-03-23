import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DeviceUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class DeviceService {
  DevicesUrl = `${basePath.domain}${DeviceUrls.getDevice}`;
  TreeDeepDevicesUrl = `${basePath.domain}${DeviceUrls.getTreeDeepDevice}`;
  DeviceDetailUrl = `${basePath.domain}${DeviceUrls.getDeviceDetail}`;
  DevicetypesUrl = `${basePath.domain}${DeviceUrls.getDeviceTypes}`;
  DeleteDeviceUrl = `${basePath.domain}${DeviceUrls.deleteDevice}`;
  InstitutionUrl = `${basePath.domain}${DeviceUrls.getInstitutionList}`;
  InstitutionGroupUrl = `${basePath.domain}${DeviceUrls.getInstitutionGroupList}`;
  LocationUrl = `${basePath.domain}${DeviceUrls.getLocationList}`;
  PostDeviceUrl = `${basePath.domain}${DeviceUrls.postDevice}`;

  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(private _http: HttpClient) {}

  getDevices(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.DevicesUrl, this.variable);
  }

  getTreeDeepDevices(payload?: any): Observable<any> {
    return this._http.get<any>(this.TreeDeepDevicesUrl);
  }

  getDeviceDetail(id: any): Observable<any> {
    return this._http.get<any>(this.DeviceDetailUrl + '/' + id);
  }

  getDeviceTypes(): Observable<any> {
    return this._http.get<any>(this.DevicetypesUrl, this.variable);
  }

  getInstitution(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload;
    }

    return this._http.get<any>(this.InstitutionUrl, this.variable);
  }

  getInstitutionGroup(): Observable<any> {
    return this._http.get<any>(this.InstitutionGroupUrl, this.variable);
  }

  getLocation(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload;
    }

    return this._http.get<any>(this.LocationUrl, this.variable);
  }
  deleteDevice(id): Observable<any> {
    return this._http.delete<any>(this.DeleteDeviceUrl + '/' + id.payload);
  }
  putDevice(payload): Observable<any> {
    return this._http.put<any>(this.PostDeviceUrl + '/' + payload.id, payload);
  }
  postDevice(payload): Observable<any> {
    return this._http.post<any>(this.PostDeviceUrl, payload);
  }

  getDeviceModelMapping(): Observable<any> {
    const url = `${basePath.domain}${DeviceUrls.deviceModelUrl}`;
    return this._http.get(url);
  }
}
