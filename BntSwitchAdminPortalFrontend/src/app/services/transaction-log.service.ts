import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TransactionLogUrls, basePath } from '../config/i18n/services/request.url.config';

@Injectable()
export class TransactionLogService {
  LogsUrl = `${basePath.domain}${TransactionLogUrls.getLogs}`;
  getSourceAcquirerUrl = `${basePath.domain}${TransactionLogUrls.getSourceAcquirer}`;
  getSourceDevicerUrl = `${basePath.domain}${TransactionLogUrls.getSourceDevice}`;
  getSourceMerchantrUrl = `${basePath.domain}${TransactionLogUrls.getSourceMerchant}`;
  getSourceDestinationEndpointNameUrl = `${basePath.domain}${TransactionLogUrls.getSourceDestinationEndpointName}`;
  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'des',
    },
  };

  constructor(private _http: HttpClient) {}
  getLogs(payload?: any): Observable<any> {
    if (payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
      this.variable.params['page-size'] = payload.payload['page-size'];
    }
    return this._http.get<any>(this.LogsUrl, this.variable);
  }
  getJson(payload: any): Observable<any> {
    return this._http.get<any>(this.LogsUrl + '/' + payload.payload.id + '/' + 'json');
  }
  
  getRequestMatrix(payload: any): Observable<any> {
    return this._http.get<any>(
      this.LogsUrl +
        '/' +
        payload.payload.txnId +
        '/' +
        'request-row-matrix' +
        '?destination=' +
        this.replaceBase1(payload.payload.destination),
    );
  }
  getResponseMatrix(payload: any): Observable<any> {
    return this._http.get<any>(
      this.LogsUrl +
        '/' +
        payload.payload.txnId +
        '/' +
        'response-row-matrix' +
        '?destination=' +
        this.replaceBase1(payload.payload.destination),
    );
  }

  getSourceAcquirer(payload): Observable<any> {
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
      if (payload['filters']) {
        this.variable.params['filters'] = 'code:' + payload['filters'];
      }
    }
    return this._http.get<any>(this.getSourceAcquirerUrl, this.variable);
  }

  getSourceDevice(payload): Observable<any> {
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
      if (payload['filters']) {
        this.variable.params['filters'] = 'code:' + payload['filters'];
      }
    }
    return this._http.get<any>(this.getSourceDevicerUrl, this.variable);
  }

  getSourceMerchant(payload): Observable<any> {
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
      if (payload['filters']) {
        this.variable.params['filters'] = 'code:' + payload['filters'];
      }
    }
    return this._http.get<any>(this.getSourceMerchantrUrl, this.variable);
  }

  getSourceDestinationEndpointName(payload): Observable<any> {
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
      if (payload['filters']) {
        this.variable.params['filters'] = 'name:' + payload['filters'];
      }
    }
    return this._http.get<any>(this.getSourceDestinationEndpointNameUrl, this.variable);
  }

  getTransactionLogsById(payload: any): Observable<any> {
    return this._http.get<any>(this.LogsUrl + '/' + payload.payload);
  }
  postTransactionLogReview(payload: any): Observable<any> {
    return this._http.put<any>(
      this.LogsUrl + '/' + payload.payload.id + '/' + 'review',
      payload.payload.forReview,
    );
  }

  replaceBase1(str) {
    // str = str.replace("Euro Net", "EuroNet");
    str = str.replace('Base I', 'BaseI');
    str = str.replace('Master Card', 'MasterCard');
    // var�newStr�=�str.replace(/\s/g,"");
    return str.replace(/\s+/g, '');
  }

  replaceAccents(str) {
    // Verifies if the String has accents and replace them
    str = str.toLowerCase();
    if (str.search(/[\xC0-\xFF]/g) > -1) {
      str = str
        .replace(/[\xC0-\xC5]/g, 'A')
        .replace(/[\xC6]/g, 'AE')
        .replace(/[\xC7]/g, 'C')
        .replace(/[\xC8-\xCB]/g, 'E')
        .replace(/[\xCC-\xCF]/g, 'I')
        .replace(/[\xD0]/g, 'D')
        .replace(/[\xD1]/g, '0')
        .replace(/[\xD2-\xD6\xD8]/g, 'O')
        .replace(/[\xD9-\xDC]/g, 'U')
        .replace(/[\xDD]/g, '1')
        .replace(/[\xDE]/g, 'P')
        .replace(/[\xE0-\xE5]/g, 'a')
        .replace(/[\xE6]/g, 'ae')
        .replace(/[\xE7]/g, 'c')
        .replace(/[\xE8-\xEB]/g, 'e')
        .replace(/[\xEC-\xEF]/g, 'i')
        .replace(/[\xF1]/g, '0')
        .replace(/[\xF2-\xF6\xF8]/g, 'o')
        .replace(/[\xF9-\xFC]/g, 'u')
        .replace(/[\xFE]/g, 'p')
        .replace(/[\xFD\xFF]/g, '1');
    }
    return str.replace(/[^A-Z0-9]+/gi, '');
  }
}
