export enum IMFTableButtonActions {
  SUBMIT,
  CANCEL,
  DELETE,
}

export interface ButtonAction {
  actions?: IMFTableButtonActions;
  payload?: IMFNode;
}

import { IMFNode } from './../imf-json/imf-json-create/imf-hierarchy-tree/imf-hierarchy-tree.component';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getFiltersData, basePath } from '../config/i18n/services/request.url.config';


@Injectable({ providedIn: 'root' })
export class SubscribeService {
  getFiltersData = `${basePath.domain}${getFiltersData.getRouter}`;
  variable: any;
  private selectedService = new Subject<any>();
  public token: BehaviorSubject<string> = new BehaviorSubject(null);
  private resetFile = new Subject<any>();
  private subject = new Subject<any>();
  private serviceType = new Subject<any>();
  private tcpMode: BehaviorSubject<string> = new BehaviorSubject(null);
  private groupMode: BehaviorSubject<any> = new BehaviorSubject(null);
  private usedList = new Subject<any>();
  private filterTxnData = new Subject<any>();
  private addSchemaApiData = new Subject<any>();
  private currentIMF = new BehaviorSubject<any>({ type: '' });
  private currentButtonAction = new BehaviorSubject<ButtonAction>({});
  private currentTabValue = new BehaviorSubject(null);

  constructor(private _http: HttpClient) { }
  public subsucribeToken(callback) {
    this.token.subscribe(callback);
  }
  public passNextToken(value: string) {
    this.token.next(value);
  }

  sendItems(items: any) {
    this.subject.next(items);
  }

  setCurrentTabValue(item: any){
    this.currentTabValue.next(item);
  }

  getCurrentTabValue(){
    return this.currentTabValue.asObservable();
  }

  sendReadOnlyFlag(items: any) {
    this.subject.next(items);
  }

  getReadOnlyFlag(): Observable<any> {
    return this.subject.asObservable();
  }

  setServiceType(items: any) {
    this.serviceType.next(items);
  }

  getServiceType(): Observable<any> {
    return this.serviceType.asObservable();
  }

  setTcpMode(items: any) {
    this.tcpMode.next(items);
  }

  getTcpMode(): Observable<any> {
    return this.tcpMode.asObservable();
  }


  setWorkFlowGroupMode(items: any) {
    this.groupMode.next(items);
  }

  getWorkFlowGroupMode(): Observable<any> {
    return this.groupMode.asObservable();
  }

  sendUsedItems(items: any) {
    this.usedList.next(items);
  }

  updateSelectedIMF(imfNode: any) {
    this.currentIMF.next(imfNode);
  }

  setButtonAction(buttonAction: ButtonAction) {
    this.currentButtonAction.next(buttonAction);
  }

  clearMessage() {
    this.subject.next();
  }

  getSelectedIMF() {
    return this.currentIMF.asObservable();
  }

  getButtonAction(): Observable<ButtonAction> {
    return this.currentButtonAction.asObservable();
  }

  getItems(): Observable<any> {
    return this.subject.asObservable();
  }

  sendApi(item: any) {
    this.selectedService.next(item);
  }

  getApi(): Observable<any> {
    return this.subject.asObservable();
  }

  getUsedItems(): Observable<any> {
    return this.usedList.asObservable();
  }

  sendServiceItems(item: any) {
    this.selectedService.next(item);
  }

  getServiceItems(): Observable<any> {
    return this.selectedService.asObservable();
  }

  sendResetFileItems(item: any) {
    this.resetFile.next(item);
  }

  getResetFileItems(): Observable<any> {
    return this.resetFile.asObservable();
  }

  setFilterTxnData(items: any) {
    this.filterTxnData.next(items);
  }

  getFilterTxnData(): Observable<any> {
    return this.filterTxnData.asObservable();
  }

  setAddApiSchemaData(items: any) {
    this.addSchemaApiData.next(items);
  }

  getAddApiSchemaData(): Observable<any> {
    return this.addSchemaApiData.asObservable();
  }

  getFilterData(payload): Observable<any> {
    if (payload !== undefined) {
      this.variable = {
        params: {
          'page-no': 1,
          'page-size': '15',
          'sort-column': '',
          'sort-order': 'des',
        },
      };
      this.variable.params['page-no'] = payload.page;
      this.variable.params['page-size'] = payload['page-size'];
      this.variable.params['smart-query-id'] = payload['smart-query-id'];
      if (payload['smart-query-params']) {
        this.variable.params['smart-query-params'] = payload['smart-query-params'];
      }
      if (payload['filters']) {
        this.variable.params['filters'] = payload['filters'];
      }
    }
    return this._http.get<any>(this.getFiltersData, this.variable);
  }
}
