import { currentItem } from './../models/schedule-router.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basePath, deploymentWorkflowUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class DeploymentWorkflowService {
  getDeploymentWorkflow = `${basePath.domain}${deploymentWorkflowUrls.getDeploymentWorkflowUrl}`;
  getByIdDeploymentWorkflow = `${basePath.domain}${deploymentWorkflowUrls.getByIdDeploymentWorkflowUrl}`;
  downloadL2WorkflowUrl = `${basePath.domain}${deploymentWorkflowUrls.downloadL2Workflow}`; 
  uploadWorkflowUrl = `${basePath.domain}${deploymentWorkflowUrls.uploadWorkflow}`;

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
  getDeploymentWorkflowUrl(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getDeploymentWorkflow, this.variable);
  }

  getByIdDeploymentWorkflowUrl(id: any): Observable<any> {
    return this._http.get<any>(this.getByIdDeploymentWorkflow + '/' + id);
  }
  
  public downloadL2Workflow(deploymentId: number): Observable<any> {
    return this._http.get<any>(`${this.downloadL2WorkflowUrl}/${deploymentId}`);
  }
  
  uploadWorkflow(payload: any): Observable<any> {
    return this._http.post<any>(this.uploadWorkflowUrl, payload);
  }

}
