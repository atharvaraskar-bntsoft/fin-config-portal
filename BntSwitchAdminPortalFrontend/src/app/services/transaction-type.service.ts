import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basePath, transactionTypeUrls } from '../config/i18n/services/request.url.config';

@Injectable()
export class TransactionTypeService {
  getTransactionTypeUrl = `${basePath.domain}${transactionTypeUrls.getTransactionType}`;
  getByIdTransactionTypeUrl = `${basePath.domain}${transactionTypeUrls.getTransactionType}`;
  postTransactionTypeUrl = `${basePath.domain}${transactionTypeUrls.getTransactionType}`;
  updateTransactionTypeUrl = `${basePath.domain}${transactionTypeUrls.getTransactionType}`;
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
  getTransactionType(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getTransactionTypeUrl, this.variable);
  }

  getByIdTransactionType(id: any): Observable<any> {
    return this._http.get<any>(this.getByIdTransactionTypeUrl + '/' + id);
  }
  postTransactionType(payload): Observable<any> {
    return this._http.post<any>(this.postTransactionTypeUrl, payload);
  }
  updateTransactionType(payload): Observable<any> {
    return this._http.put<any>(this.updateTransactionTypeUrl + '/' + payload.id, payload);
  }
}
