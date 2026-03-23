import { CookieService } from 'ngx-cookie-service';
import { inject, TestBed } from '@angular/core/testing';
import { UtcDatePipe } from './utc-date.pipe';
import { BrowserModule } from '@angular/platform-browser';
import moment from 'moment-timezone';

describe('UtcDatePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      providers: [CookieService, moment],
    });
  });

  it('create an instance', inject([CookieService, moment], (cookieService: CookieService) => {
    let pipe = new UtcDatePipe(cookieService);
    expect(pipe).toBeTruthy();
  }));

  it('transforms "Sep 02, 2022, 12:06:08" to "Sep 02, 2022, 12:06:48 (IST)"', inject(
    [CookieService],
    (cookieService: CookieService) => {
      spyOn(cookieService, 'get').and.returnValue('{"name":"Africa/Blantyre","value":"GMT+02:00"}');
      let pipe = new UtcDatePipe(cookieService);

      expect(pipe.transform(new Date('Fri Sep 02 2022 12:09:55'))).toBe(
        'Sep 02, 2022, 08:39:55 (GMT+02:00)',
      );
    },
  ));
});

