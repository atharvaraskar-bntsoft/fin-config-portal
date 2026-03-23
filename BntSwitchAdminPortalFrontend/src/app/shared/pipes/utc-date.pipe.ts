import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';

@Pipe({
  name: 'utc',
})
export class UtcDatePipe implements PipeTransform {
  constructor(private _cookieService: CookieService) {}

  transform(value: any, args?: any): string {
    // Using the current date/time
    const getTime = this._cookieService.get('timezone');
    if (getTime !== 'undefined') {
      const ctimezone = JSON.parse(this._cookieService.get('timezone'));
      /**
       * Altering the return value of pipe from ```lll``` to ll h:mm:ss A becase of INNERMVP-989
       */
      let uTCDatetime = moment.tz(value, ctimezone.name).format('MMM DD, YYYY, HH:mm:ss');
      return uTCDatetime + ' (' + ctimezone.name + ')';
    }
  }
}
