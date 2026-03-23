import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  basePath,
  l1AdapterUrls,
  LookUpConfigurationUrls,
} from '../config/i18n/services/request.url.config';

@Injectable()
export class L1AdapterService {
  getL1AdapterUrl = `${basePath.domain}${l1AdapterUrls.getL1Adapter}`;
  copyL1AdapterUrl = `${basePath.domain}${l1AdapterUrls.copyL1Adapter}`;
  downloadTemplate = `${basePath.domain}${l1AdapterUrls.downloadTemplate}`;
  downloadTemplateById = `${basePath.domain}${l1AdapterUrls.downloadTemplateById}`;
  uploadTemplate = `${basePath.domain}${l1AdapterUrls.uploadTemplate}`;
  deleteL1AdapterUrl = `${basePath.domain}${l1AdapterUrls.getL1Adapter}`;
  postL1AdapterUrl = `${basePath.domain}${l1AdapterUrls.postL1Adapter}`;
  getRowL1AdapterUrl = `${basePath.domain}${l1AdapterUrls.getL1Adapterbyid}`;
  putL1AdapterUrl = `${basePath.domain}${l1AdapterUrls.getL1Adapter}`;
  getTemplateUrl = `${basePath.domain}${l1AdapterUrls.getTemplate}`;
  getInternalCodeUrl = `${basePath.domain}${l1AdapterUrls.getInternalCode}`;
  getFormatUrl = `${basePath.domain}${l1AdapterUrls.getFormat}`;
  getSchemaUrl = `${basePath.domain}${l1AdapterUrls.getSchema}`;
  draftSchemaUrl = `${basePath.domain}${l1AdapterUrls.draftSchema}`;
  transformpackager = `${basePath.domain}${l1AdapterUrls.transformpackager}`;
  nextSchemaUrl = `${basePath.domain}${l1AdapterUrls.nextSchema}`;
  getNetworkUrl = `${basePath.domain}${l1AdapterUrls.getNetwork}`;
  draftNetworkUrl = `${basePath.domain}${l1AdapterUrls.draftNetwork}`;
  getL1AdapterEntityListUrl = `${basePath.domain}${l1AdapterUrls.getL1AdapterEntityMappingList}`;
  getL1AdapterEntityIMFListUrl = `${basePath.domain}${l1AdapterUrls.getL1AdapterEntityIMFList}`;
  getL1AdapterTransactionTypeUrl = `${basePath.domain}${l1AdapterUrls.getL1AdapterTransactionType}`;
  getL1AdapterRuleListUrl = `${basePath.domain}${l1AdapterUrls.getL1AdapterRuleList}`;
  draftTransformUrl = `${basePath.domain}${l1AdapterUrls.draftTransform}`;
  getL1AdapterByIdUrl = `${basePath.domain}${l1AdapterUrls.getAdapterById}`;
  getL1AdapterMenuUrl = `${basePath.domain}${l1AdapterUrls.getMenu}`;
  getSchemeImfMapperUrl = `${basePath.domain}${l1AdapterUrls.getSchemeImfMapper}`;
  getAdapterDataMapUrl = `${basePath.domain}${l1AdapterUrls.getAdapterDataMap}`;
  versionDataUrl = `${basePath.domain}${l1AdapterUrls.versionData}`;
  deleteRowUrl = `${basePath.domain}${l1AdapterUrls.deleteRowUrl}`;
  getLookUpTypeUrl = `${basePath.domain}${LookUpConfigurationUrls.lookUpTypeUrl}`;
  getMessageContextListUrl = `${basePath.domain}${l1AdapterUrls.getMessageContextImListbyVersion}`;
  getNameValidationUrl = `${basePath.domain}${l1AdapterUrls.getNameValidation}`;
  public getPaymentUrl = `${basePath.domain}${l1AdapterUrls.getPaymentMethod}`;
  getPostActionMethodUrl = `${basePath.domain}${l1AdapterUrls.postActionMethodUrl}`;
  getPreActionMethodUrl = `${basePath.domain}${l1AdapterUrls.preActionMethodUrl}`;
  getStepListMethodUrl = `${basePath.domain}${l1AdapterUrls.StepListMethodUrl}`;
  downloadAdapterConfigUrl = `${basePath.domain}${l1AdapterUrls.downloadL1Config}`;
  uploadAdapterConfigUrl = `${basePath.domain}${l1AdapterUrls.uploadL1Config}`;

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

  copyL1Adapter(payload: any): Observable<any> {
    return this._http.post<any>(this.copyL1AdapterUrl, payload);
  }

  getL1Adapter(payload: any): Observable<any> {
    return this._http.get<any>(this.getL1AdapterUrl + '/' + payload.template);
  }

  public uploadL1Adapter(payload: any): Observable<any> {
    return this._http.post<any>(this.uploadTemplate, payload.formData);
  }

  public downloadL1AdapterbyId(payload: any): Observable<any> {
    this.variable.responseType = 'blob';
    return this._http.get<any>(this.downloadTemplateById + '/' + payload.fileType + '/' + payload.id, this.variable);
  }
  
  public downloadL1Adapter(payload: any): Observable<any> {
    return this._http.post<any>(this.downloadAdapterConfigUrl, payload);
  }
  
  public uploadL1AdapterFiles(payload: any): Observable<any> {
    return this._http.post<any>(this.uploadAdapterConfigUrl, payload);
  }

  public versionData(payload: any): Observable<any> {
    payload = this.transformData(payload);
    return this._http.post<any>(this.versionDataUrl, payload);
  }
  public deleteLocation(id: any): Observable<any> {
    return this._http.delete<any>(this.deleteL1AdapterUrl + '/' + id);
  }
  public postL1Adapter(payload): Observable<any> {
    return this._http.post<any>(this.postL1AdapterUrl, payload);
  }
  public getRowL1Adapter(id): Observable<any> {
    return this._http.get<any>(this.getRowL1AdapterUrl);
  }
  public getL1AdapterById(payload: any): Observable<any> {
    return this._http.get<any>(this.getL1AdapterUrl + '/' + payload.payload);
  }
  public updateL1Adapter(payload): Observable<any> {
    return this._http.put<any>(this.putL1AdapterUrl + '/' + payload.id, payload);
  }
  public getL1AdapterEntityMappingList(): Observable<any> {
    return this._http.get<any>(this.getL1AdapterEntityListUrl);
  }
  public getL1AdapterEntityIMFList(): Observable<any> {
    return this._http.get<any>(this.getL1AdapterEntityIMFListUrl);
  }
  public getL1AdapterTransactionType(): Observable<any> {
    return this._http.get<any>(this.getL1AdapterTransactionTypeUrl);
  }
  public getL1AdapterRuleList(payload: any): Observable<any> {
    return this._http.get<any>(
      this.getL1AdapterRuleListUrl + '/' + payload.template + '/' + payload.format,
    );
  }
  public getTemplates(): Observable<any> {
    return this._http.get<any>(this.getTemplateUrl);
  }
  public getInternalCode(): Observable<any> {
    return this._http.get<any>(this.getInternalCodeUrl);
  }
  public getFormat(): Observable<any> {
    return this._http.get<any>(this.getFormatUrl);
  }
  public getschema(payload: any): Observable<any> {
    return this._http.get<any>(this.getSchemaUrl + '/' + payload.template);
  }

  public postSchemaDraft(payload: any): Observable<any> {
    payload = this.transformData(payload);
    return this._http.post<any>(this.draftSchemaUrl, payload);
  }


  public transformXmlpackager(payload: any): Observable<any> {
    return this._http.post<any>(this.transformpackager, payload);
  }

  public postNextSchemaDraft(payload: any): Observable<any> {
    payload = this.transformData(payload);
    return this._http.post<any>(this.nextSchemaUrl, payload);
  }

  public dataTypeFilter(data, typeFilter: string) {
    return data
      .map(item => {
        if (item.value !== '' && item.mtype === typeFilter) {
          item.field = item.field.replaceAll(item.mtype + '--', '');
          delete item.mtype;
          delete item.custom;
          return item;
        } else {
          return item;
        }
      })
      .filter(item => item);
  }

  public transformData(adapterData) {
    if ('networkData' in adapterData) {
      adapterData = JSON.parse(JSON.stringify(adapterData));
      if (adapterData.networkData.properties.network) {
        adapterData.networkData.properties.network = this.dataTypeFilter(
          adapterData.networkData.properties.network,
          'network',
        );
      }
      if (adapterData.networkData.properties.message) {
        adapterData.networkData.properties.message = this.dataTypeFilter(
          adapterData.networkData.properties.message,
          'message',
        );
      }
    }
    return adapterData;
  }

  public getNetwork(payload: any): Observable<any> {
    return this._http.get<any>(this.getNetworkUrl + '/' + payload.template);
  }
  public postNetwrokDraft(payload: any): Observable<any> {
    payload = this.transformData(payload);
    return this._http.post<any>(this.draftNetworkUrl, payload);
  }

  public postTransformDraft(payload: any): Observable<any> {
    payload = this.transformData(payload);
    return this._http.post<any>(this.draftTransformUrl, payload);
  }

  public getAdapterById(payload: any): Observable<any> {
    return this._http.get<any>(this.getL1AdapterByIdUrl + '/' + payload);
  }

  public getAdapterMenu(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getL1AdapterMenuUrl, this.variable);
  }

  public getSchemeImfMapper(payload: any): Observable<any> {
    return this._http.get<any>(
      this.getSchemeImfMapperUrl + '/' + payload.templateId + '/' + payload.fieldId,
    );
  }

  public upload(file) {
    const uploadURL = `${basePath.domain}/data-files/upload`;
    return this._http
      .post<any>(uploadURL, file, {
        observe: 'events',
      })
      .pipe(
        map(event => {
          if (event) {
            switch (event.type) {
              case HttpEventType.Response:
                return event.body;
              default:
                return null;
            }
          }
        }),
      );
  }

  public getAdapterDataMap(): Observable<any> {
    return this._http.get<any>(this.getAdapterDataMapUrl);
  }

  public deleteRow(payload: any): Observable<any> {
    return this._http.delete<any>(this.deleteRowUrl + '/' + payload);
  }
  public getLookUpList(): Observable<any> {
    return this._http.get<any>(this.getLookUpTypeUrl);
  }
  public getMessageContextList(imfid): Observable<any> {
    return this._http.get<any>(this.getMessageContextListUrl + '/' + imfid);
  }

  public getNameValidation(payloadUrl) {
    return this._http.get<any>(this.getNameValidationUrl + payloadUrl.payload);
  }
  public getPaymentMethodService() {
    return this._http.get<any>(this.getPaymentUrl);
  }
  public getPostActionMethod(): Observable<any> {
    return this._http.get<any>(this.getPostActionMethodUrl);
  }

  public getPreActionMethod(): Observable<any> {
    return this._http.get<any>(this.getPreActionMethodUrl);
  }
  public GetStepListMethod(): Observable<any> {
    return this._http.get<any>(this.getStepListMethodUrl);
  }
}
