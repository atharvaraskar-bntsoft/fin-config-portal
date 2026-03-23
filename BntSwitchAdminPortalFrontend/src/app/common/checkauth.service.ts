import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class CheckauthService {
  constructor(private cookieService: CookieService) {}
  Init() {
    return new Promise<void>((resolve, reject) => {
      if (document.cookie === undefined) {
        window.location.href = '/access';
        resolve();
      } else {
        resolve();
      }
    });
  }
}
