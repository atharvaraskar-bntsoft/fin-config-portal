import { IIsBtnDisabled } from './../services/alert.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '@app/services/alert.service';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import * as FileSaver from 'file-saver';

@Injectable({ providedIn: 'root' })
export class CommonRequestInsterceotor implements HttpInterceptor {
  public reqCounter = 0;
  public resCounter = 0;

  constructor(
    private _cookieService: CookieService,
    private _router: Router,
    private keycloakService: KeycloakService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestBody = request;
    if (
      !this.keycloakService.isLoggedIn() &&
      requestBody.url.split(environment.serviceCoreUrl)[1] !== '/logout'
    ) {
      this.spinner.hide();
      this._401();
      return EMPTY;
    }
    requestBody = requestBody.clone({
      setHeaders: {
        'role-id': '1',
        kcemail: this._cookieService.get('kcemail'),
        kcfirstname: this._cookieService.get('kcfirstname'),
        kclastname: this._cookieService.get('kclastname'),
        kcpreferredusername: this._cookieService.get('kcpreferredusername'),
        'x-auth-token': this._cookieService.get('token'),
        kcrole: this._cookieService.get('kcrole'),
        refreshToken: this._cookieService.get('refreshToken'),
        logIn: this._cookieService.get('logIn'),
        exp: this._cookieService.get('expiresIn'),
        refreshExp: this._cookieService.get('refreshExpiresIn'),
      },
    });
    if (requestBody.method === 'POST') {
      const isBtnObj: IIsBtnDisabled = {
        isEnable: false,
        url: requestBody.url,
      };
      this.alertService.setIsBtnDisable(isBtnObj);
    }
    return next.handle(requestBody).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (requestBody.url.includes('/rest/export-snapshot/download')) {
            let contentType = 'application/octet-stream';
            const ContentDisposition = event.headers.get('Content-Disposition');
            let fileName = ContentDisposition.replace('attachment; filename=', '');
            fileName = this.string_to_slug(fileName);
            var blob = new Blob([event.body], { type: contentType });
            FileSaver.saveAs(blob, fileName);
            return;
          }
          const date = new Date();
          const minutes = 60 * 24;
          date.setTime(date.getTime() + minutes * 60 * 1000);
          const ssl = window.location.protocol === 'http:' ? false : true;
          if (event.headers.has('x-auth-token')) {
            console.log(event.headers.get('x-auth-token'));
            this._cookieService.set(
              'token',
              event.headers.get('x-auth-token'),
              date,
              environment.path,
              window.location.hostname,
              ssl,
              'Strict',
            );
          }
          if (
            requestBody.url.split(environment.serviceCoreUrl)[1] === '/logout' ||
            (event.body.message && event.body.message.toLowerCase() === 'token not found')
          ) {
            this._401();
          } else if (
            event.body.status === 'failure' &&
            requestBody.url.split(environment.serviceCoreUrl)[1] !== '/logout'
          ) {
            this.alertService.responseMessage(event.body);
            this.alertService.setLoader(false);
            return;
          }
          if (event) {
            this.setIsBtnEnable(event);
          }
          if (event.body.message && event.body.message.toLowerCase() === 'token expired') {
            this._router.navigateByUrl('/access/token-expired');
          }
          if (event.body.message && event.body.message.toLowerCase() === 'Token Not Match') {
            this._router.navigateByUrl('/access/token-expired');
          }
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        if (error) {
          this.setIsBtnEnable(error);
        }
        this.alertService.setLoader(false);
        switch (error && error.status) {
          case 404:
            this._401();
            break;

          case 401:
            this._401();
            break;

          case 403:
            this._403();
            break;

          default:
            break;
        }
        return throwError(error.message);
      }),
    );
  }

  string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    // remove accents, swap ñ for n, etc
    var from = 'àáäâèéëêìíïîòóöôùúüûñç/_,:;';
    var to = 'aaaaeeeeiiiioooouuuunc------';
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str
      .replace(/[^a-z0-9 - .]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
    return str;
  }

  private setIsBtnEnable(event) {
    if (event.url) {
      this.alertService.getIsBtnDisable().subscribe((res: any) => {
        const splittedPassedUrls = event.url.split('/');
        const value = splittedPassedUrls[splittedPassedUrls.length - 1];
        if (res?.url?.includes(value)) {
          this.alertService.setIsBtnDisable({ isEnable: true, url: '' });
        }
      });
    }
  }

  private _401() {
    this._cookieService.delete('token', environment.path, window.location.hostname);
    this._cookieService.deleteAll(environment.path, window.location.hostname);
    this.delete_cookie('token');
    this.keycloakService.clearToken();
    this._router.navigateByUrl('/access/denied');
  }

  private delete_cookie(name) {
    document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }

  private _403() {
    this._router.navigateByUrl('/access/denied');
  }
}
