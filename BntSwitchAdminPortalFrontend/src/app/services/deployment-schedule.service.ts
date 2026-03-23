import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { deploymentSchedule, basePath } from './../config/i18n/services/request.url.config';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { IApiResponse, IComponentDetails } from '@app/deployment/schedule/schedulte.interface';

const scheduledDeploymentUrls = `${basePath.domain}`;

export const TypeMapping = {
  route: 'L2(Router- destination)',
  workflow: 'L2(Router- workflow)',
  WORKFLOW: 'L2(workflow)',
};

@Injectable({
  providedIn: 'root',
})
export class DeploymentScheduleService {
  constructor(private http: HttpClient) { }

  getCurrentNonScheduledDeployments(): Observable<IApiResponse> {
    const url = `${scheduledDeploymentUrls}${deploymentSchedule.getNewlyDeployedComponents}`;
    return this.http.get<IApiResponse>(url);
  }

  getCurrentScheduledDeployments(): Observable<IApiResponse> {
    const url = `${scheduledDeploymentUrls}${deploymentSchedule.getCurrentScheduledDeployments}`;
    return this.http.get<IApiResponse>(url);
  }

  saveSelectedDeployment(body): Observable<IApiResponse> {
    const url = `${scheduledDeploymentUrls}${deploymentSchedule.updateCurrentDeployedComponents}`;
    return this.http.post<IApiResponse>(url, body);
  }

  fetchClusterList(): Observable<IApiResponse> {
    const url = `${scheduledDeploymentUrls}${deploymentSchedule.clusterListUrl}`;
    return this.http.get<IApiResponse>(url);
  }

  fetchCorePropertiesList(): Observable<IApiResponse> {
    const url = `${scheduledDeploymentUrls}${deploymentSchedule.corePropertiesUrl}`;
    return this.http.get<IApiResponse>(url);
  }

  updateComponent(body): Observable<IApiResponse> {
    const url = `${scheduledDeploymentUrls}${deploymentSchedule.updateCurrentDeployedComponents}/${body.id}`;
    return this.http.put<IApiResponse>(url, body);
  }

  renderType(item: IComponentDetails) {
    if (
      item.componentType === 'route' ||
      item.componentType === 'workflow' ||
      item.componentType === 'WORKFLOW'
    ) {
      return TypeMapping[item.componentType];
    } else {
      return item.componentType;
    }
  }

  getFormattedDate(item: IComponentDetails) {
    return moment(item.lastModifiedOn).format('dd MMM yyyy hh:mm:ss a');
  }
}
