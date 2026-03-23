import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { basePath, DekUrls } from "@app/config/i18n/services/request.url.config";

@Injectable()
export class DekService {
    dekUrl = `${basePath.domain}${DekUrls.getDek}`
    postDekUrl = `${basePath.domain}${DekUrls.postDek}`

    public variable: any = {
        params: {
            filters: null,
            'page-no': 1,
            'page-size': '15',
            'sort-column': '',
            'sort-order': 'asc'
        }
    }
    
    constructor(private _http: HttpClient) {}

    getDek(payload?: any): Observable<any> {
        if(payload.payload !== undefined) {
            this.variable.params.filters = payload.payload.filter;
            this.variable.params['page-no'] = payload.payload.page;
            this.variable.params['page-size'] = payload.payload['page-size'];
        }
        return this._http.get<any>(this.dekUrl);
    }

    postDek(payload: any): Observable<any> {
        return this._http.post<any>(this.postDekUrl, payload);
    }
}