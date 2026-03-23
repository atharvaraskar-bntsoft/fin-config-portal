import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { basePath, masterConfigurationUrls } from '../config/i18n/services/request.url.config';

const response = {
  status: 'success',
  message: 'Find all StandardMessageSpecification',
};

@Injectable()
export class MasterConfigurationService {
  constructor(private _http: HttpClient) {}

  getAllMasterConfiguration() {
    const url = `${basePath.domain}${masterConfigurationUrls.getMasterAll}`;
    return this._http.get(url);
  }

  updateMasterConfiguration(body) {
    const url = `${basePath.domain}${masterConfigurationUrls.updateMasterConfig}/${body.payload.id}`;
    return this._http.put(url, body.payload);
  }
}
