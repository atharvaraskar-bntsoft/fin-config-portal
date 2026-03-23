import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { selectGetDeploymentStatus } from '@app/store/selectors/deployment-status.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { basePath, deploymentStatusUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class DeploymentStatusService {
  getDeploymentStatus = `${basePath.domain}${deploymentStatusUrls.getDeploymentStatusUrl}`;
  public variable: any = {
    params: {
      filters: null,
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };
  constructor(private _http: HttpClient, private _store: Store<IAppState>) {}
  getDeploymentStatusUrl(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getDeploymentStatus, this.variable);
  }

  updateAction(url): Observable<any> {
    return this._http.delete(url);
  }

  public getselectGetDeploymentStatus() {
    return this._store.pipe(select(selectGetDeploymentStatus));
  }

  public getselectViewSettingsList() {
    return this._store.pipe(select(selectViewSettingsList));
  }

  public getselectPermissionsData() {
    return this._store.pipe(select(selectPermissionsData));
  }
}
