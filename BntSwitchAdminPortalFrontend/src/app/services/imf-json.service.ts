import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { imfJsonUrl, basePath, TemplateUrl } from '../config/i18n/services/request.url.config';
import { TreeviewItem } from 'ngx-treeview';

@Injectable()
export class ImfJsonService {
  baseUrl = `${basePath.domain}`;
  imfJson = `${basePath.domain}${imfJsonUrl.imfJson}`;
  imfJsonVersion = `${basePath.domain}${imfJsonUrl.imfJsonVersion}`;
  userViewVersion = `${basePath.domain}${imfJsonUrl.userViewJson}`;
  imfJsonDraft = `${basePath.domain}${imfJsonUrl.imfJsonDraft}`;
  templateListUrl = `${TemplateUrl.TemplateList}`;
  templateJsonUrl = `${TemplateUrl.TemplateDetails}`;
  downloadImfUrl = `${basePath.domain}${imfJsonUrl.downloadImf}`;
  uploadImfUrl = `${basePath.domain}${imfJsonUrl.imfJsonUpload}`;

  public variable: any = {
    params: {
      'page-no': 1,
      'page-size': '15',
      'sort-column': '',
      'sort-order': 'des',
    },
  };
  private data = new BehaviorSubject('');
  currentData = this.data.asObservable();
  private newData = new BehaviorSubject('');
  getData = this.data.asObservable();
  constructor(private _http: HttpClient) {}
  setData(data) {
    this.data.next(data);
  }
  setnewData(data) {
    this.newData.next(data);
  }

  getAllVersion(): Observable<any> {
    return this._http.get<any>(this.imfJson);
  }

  getLatestVersion(): Observable<any> {
    return this._http.get<any>(this.imfJson + '/version');
  }

  getTypeList(): Observable<any> {
    return this._http.get<any>(this.baseUrl + '/imf-field/type-list');
  }

  deleteImf(payload): Observable<any> {
    return this._http.delete<any>(this.imfJson + '/' + payload.payload);
  }
  
  downloadImfByVersion(version: number): Observable<any> {
    return this._http.get<any>(
      `${this.downloadImfUrl}/${version}`
    );
  }
  
  uploadImf(payload: any): Observable<any> {
      return this._http.post<any>(this.uploadImfUrl, payload);
    }


  getImfList(payload?: any): Observable<any> {
    if (payload && payload.payload !== undefined) {
      this.variable.params.filters = payload.payload.filter;
      this.variable.params['page-no'] = payload.payload.page;
    }
    //  this.variable.params['page-size'] = 10;

    return this._http.get<any>(this.imfJson);
  }

  putImfJson(payload): Observable<any> {
    return this._http.post<any>(this.imfJsonDraft, payload.payload);
  }

  postImfJson(payload): Observable<any> {
    return this._http.post<any>(this.imfJsonVersion, payload.payload);
  }

  userViewJson(payload): Observable<any> {
    return this._http.post<any>(this.userViewVersion, payload.payload);
  }

  singleImfJson(payload): Observable<any> {
    return this._http.get<any>(this.imfJson + '/' + payload.id);
  }

  GetTemplateJson(): Observable<any> {
    return this._http.get<any>(this.baseUrl + '/' + this.templateListUrl);
  }
  singleTemplateJson(payload): Observable<any> {
    return this._http.get<any>(this.imfJson + this.templateJsonUrl + '/' + payload.payload);
  }
  imfJsonById(payload): Observable<any> {
    return this._http.get<any>(this.imfJson + '/' + payload.payload);
  }

  getImfJsonObj(): TreeviewItem[] {
    const childrenCategory = new TreeviewItem({
      text: 'Children',
      value: 1,
      collapsed: true,
      children: [
        { text: 'Baby 3-5', value: 11 },
        { text: 'Baby 6-8', value: 12 },
        { text: 'Baby 9-12', value: 13 },
      ],
    });
    const itCategory = new TreeviewItem({
      text: 'IT',
      value: 9,
      children: [
        {
          text: 'Programming',
          value: 91,
          children: [
            {
              text: 'Frontend',
              value: 911,
              children: [
                { text: 'Angular 1', value: 9111 },
                { text: 'Angular 2', value: 9112 },
                { text: 'ReactJS', value: 9113, disabled: true },
              ],
            },
            {
              text: 'Backend',
              value: 912,
              children: [
                { text: 'C#', value: 9121 },
                { text: 'Java', value: 9122 },
                { text: 'Python', value: 9123, checked: false, disabled: true },
              ],
            },
          ],
        },
        {
          text: 'Networking',
          value: 92,
          children: [
            { text: 'Internet', value: 921 },
            { text: 'Security', value: 922 },
          ],
        },
      ],
    });
    const teenCategory = new TreeviewItem({
      text: 'Teen',
      value: 2,
      collapsed: true,
      disabled: true,
      children: [
        { text: 'Adventure', value: 21 },
        { text: 'Science', value: 22 },
      ],
    });
    const othersCategory = new TreeviewItem({
      text: 'Others',
      value: 3,
      checked: false,
      disabled: true,
    });
    return [childrenCategory, itCategory, teenCategory, othersCategory];
  }
}
