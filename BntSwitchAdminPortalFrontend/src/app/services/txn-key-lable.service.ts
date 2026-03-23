import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TxnKeyLableUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class TxnKeyLableService {
  getTxnKeyLableTypeUrl = `${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypeGet}`;
  getbyidTxnKeyLableTypeUrl = `${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypeGetById}`;
  deleteTxnKeyLableTypeUrl = `${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypeDelete}`;
  postTxnKeyLableTypeUrl = `${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypePost}`;
  updateTxnKeyLableTypeUrl = `${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypeUpdate}`;
  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'des',
    },
  };
  constructor(private _http: HttpClient) {}
  getTxnKeyLableType(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.getTxnKeyLableTypeUrl, this.variable);
  }

  getbyidTxnKeyLableType(id: any): Observable<any> {
    return this._http.get<any>(this.getbyidTxnKeyLableTypeUrl + '/' + id.payload);
  }
  deleteTxnKeyLableType(id: any): Observable<any> {
    return this._http.delete<any>(this.deleteTxnKeyLableTypeUrl + '/' + id);
  }
  updateTxnKeyLableType(payload): Observable<any> {
    return this._http.put<any>(this.updateTxnKeyLableTypeUrl + '/' + payload.id, payload);
  }
  postTxnKeyLableType(payload): Observable<any> {
    return this._http.post<any>(this.postTxnKeyLableTypeUrl, payload);
  }
}
