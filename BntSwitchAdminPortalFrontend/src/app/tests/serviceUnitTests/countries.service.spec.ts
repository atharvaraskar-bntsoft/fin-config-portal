import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, CountriesUrls } from '@app/config/i18n/services/request.url.config';
import { CountriesService } from '@app/services/countries.service';

const countryJson = {
    status: "success",
    message: "Find all Country",
    data: {
        "total-record": 248,
        "page-no": 1,
        "countryList": [
            {
                "id": 251,
                "code": "GEA",
                "countryName": "AbKhazia",
                "currency": {
                    "id": 40,
                    "code": "RUB",
                    "isoCode": "643",
                    "currencyName": "Russian Ruble",
                    "active": true,
                    "currencyMinorUnit": "2",
                    "deleted": "0"
                },
                "isoCode": "643",
                "shortCode": "AB",
                "isdCode": "840",
                "active": true,
                "deleted": null
            },
        ],
        "total-filtered-record": 20
    }
}

xdescribe('CountriesService', () => {
  let countriesService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService],
    }),
      (countriesService = TestBed.get(CountriesService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: CountriesService = TestBed.get(CountriesService);
    expect(service).toBeTruthy();
  });

  it('should retrieve getCountries', () => {
    countriesService.getCountries(countries => {
      expect(countries).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CountriesUrls.getCountries}`);
      expect(req.request.method).toEqual('GET');
      req.flush({countryJson});
    });
  });

  it('should retrieve getCountryList', () => {
    countriesService.getCountryList(countries => {
      expect(countries).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CountriesUrls.getCountryList}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  it('should retrieve getStateList', () => {
    let id = 9;
    countriesService.getStateList(corePrperties => {
      expect(corePrperties).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CountriesUrls.getStateListbyCountry} '/' + ${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
