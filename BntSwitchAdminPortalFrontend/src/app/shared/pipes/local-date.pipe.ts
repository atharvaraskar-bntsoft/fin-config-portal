import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';

@Pipe({
  name: 'local',
})
export class LocalDatePipe implements PipeTransform {
  transform(value: any, args?: any): string {
    // Using the current date/time
    const now_local = new Date(value);
    const timezone = moment.tz(moment.tz.guess()).zoneAbbr();
    return moment(now_local).format('MMM DD, YYYY, HH:mm:ss') + ' (' + timezone + ')';
  }
}
