import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstitutionGroupUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class ImportFileService {
  validateInstitutionGroupsUrl = `${basePath.domain}`;
  public dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(public _http: HttpClient) {}
  public validateCsvFileToInstitutionGroups(payload): Observable<any> {
    const formData = new FormData();
    formData.append(
      'file',
      payload.payload.payloadObject.file,
      payload.payload.payloadObject.file.name,
    );
    const url = this.validateInstitutionGroupsUrl + '/import';
    return this._http.post<any>(url, formData, {
      observe: 'response',
      reportProgress: true,
    });
  }

  public postCsvFileToInstitutionGroups(payload): Observable<any> {
    const url = this.validateInstitutionGroupsUrl + '/institution/import';
    return this._http.post<any>(url, payload.payload);
  }

  public clearData(): void {
    this.dataSubject.next('Trigger');
  }
}
