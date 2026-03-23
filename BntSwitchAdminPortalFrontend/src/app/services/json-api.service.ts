import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { basePath, StatusUrls } from '@app/config/i18n/services/request.url.config';

@Injectable()
export class JsonApiService {
  AppHealthUrl = `${basePath.domain}${StatusUrls.getAppHealth}`;
  constructor(private http: HttpClient) {}

  public fetch(url): Observable<any> {
    return this.http.get(this.getBaseUrl() + url).pipe(
      delay(100),
      map((data: any) => data.data || data),
      catchError(this.handleError),
    );
  }

  public loadJosn(): Observable<any> {
    return this.http.get(this.AppHealthUrl).pipe(
      delay(100),
      map((data: any) => data),
      catchError(this.handleError),
    );
  }

  private getBaseUrl() {
    return (
      location.protocol +
      '//' +
      location.hostname +
      (location.port ? ':' + location.port : '') +
      '/'
    );
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    console.error(errMsg); // log to console instead
    // tslint:disable-next-line: deprecation
    return Observable.throw(errMsg);
  }
}
