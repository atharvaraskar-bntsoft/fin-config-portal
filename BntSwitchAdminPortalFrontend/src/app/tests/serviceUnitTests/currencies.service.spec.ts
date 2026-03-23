import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, CurrenciesUrls } from '@app/config/i18n/services/request.url.config';
import { CurrenciesService } from '@app/services/currencies.service';

xdescribe('CurrenciesService', () => {
  let currenciesService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrenciesService],
    }),
      (currenciesService = TestBed.get(CurrenciesService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: CurrenciesService = TestBed.get(CurrenciesService);
    expect(service).toBeTruthy();
  });

  it('should retrieve getCurrencies', () => {
    currenciesService.getCurrencies(currencies => {
      expect(currencies).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CurrenciesUrls.cuurencies}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});//insert expected JSON
    });
  });

  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
