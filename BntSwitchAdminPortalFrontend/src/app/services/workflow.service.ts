import { Injectable } from '@angular/core';
import {
  basePath,
  InstitutionGroupUrls,
  WorkflowsUrls,
} from '../config/i18n/services/request.url.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WorkflowService {
  getServiceListUrl = `${basePath.domain}${WorkflowsUrls.getServicesList}`;
  getWorkflowsUrl = `${basePath.domain}${WorkflowsUrls.getWorkflows}`;
  getPaymentMethodUrl = `${basePath.domain}${WorkflowsUrls.getPaymentMethod}`;
  postPaymentMethodUrl = `${basePath.domain}${WorkflowsUrls.postPaymentMethod}`;
  adddeleteWorkflowsUrl = `${basePath.domain}${WorkflowsUrls.deleteWorkflow}`;
  makeAsDefaultWorkflowsUrl = `${basePath.domain}${WorkflowsUrls.makeAsDefault}`;

  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'asc',
    },
  };

  constructor(public _http: HttpClient) {}

  getServiceList(): Observable<any> {
    return this._http.get<any>(this.getServiceListUrl);
  }

  getWorkflows(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getWorkflowsUrl, this.variable);
  }

  getLatestWorkflows(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(`${basePath.domain}/workflow/getworkflowlist`, this.variable);
  }

  getLatestWorkflowService(): Observable<any> {
    return this._http.get<any>(`${basePath.domain}/workflow/service-list`);
  }

  getPaymentMethod(): Observable<any> {
    return this._http.get<any>(this.getPaymentMethodUrl);
  }
  postPaymentMethod(payload: any): Observable<any> {
    return this._http.post<any>(this.postPaymentMethodUrl, payload);
  }
  deleteWorkflowGroup(payload: any): Observable<any> {
    return this._http.delete<any>(this.getWorkflowsUrl + '/' + payload, payload);
  }
  deleteWorkflow(payload: any): Observable<any> {
    return this._http.delete<any>(this.adddeleteWorkflowsUrl + '/' + payload, payload);
  }

  enableDisableWorkflow(payload: any): Observable<any> {
    return this._http.put<any>(this.adddeleteWorkflowsUrl + '/' + payload.id, payload);
  }

  AddWorkflow(payload: any): Observable<any> {
    if (payload.id !== null) {
      return this._http.put<any>(this.adddeleteWorkflowsUrl + '/' + payload.id, payload);
    } else {
      return this._http.post<any>(this.adddeleteWorkflowsUrl, payload);
    }
  }

  AddLatestWorkflow(payload: any): Observable<any> {
    return this._http.post<any>(`${basePath.domain}/workflow/create-workflow`, payload);
  }

  PublishLatestWorkflow(payload: any): Observable<any> {
    return this._http.post<any>(`${basePath.domain}/workflow/create-workflow/version-it`, payload);
  }

  SingleLatestWorkflow(payload: any): Observable<any> {
    return this._http.get<any>(`${basePath.domain}/workflow/getworkflow/` + payload.id);
  }

  makeAsDefault(payload: any): Observable<any> {
    return this._http.put<any>(this.makeAsDefaultWorkflowsUrl + '/' + payload.id, payload.putData);
  }

  getReversalDropDown(): Observable<any> {
    const url = `${basePath.domain}/inputfields/reverse-condition`;
    return this._http.get(url);
  }

  isNameValid(payload): Observable<any> {
    const url = `${basePath.domain}/workflow/validate-workflow-name/${payload}`;
    return this._http.get(url);
  }
}
