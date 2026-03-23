import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, CountryStateUrls } from '@app/config/i18n/services/request.url.config';
import { CountryStatesService } from '@app/services/country-states.service';

const countryJson = {
    "status": "success",
    "message": "Find all countries",
    "data": {
        "total-record": 311,
        "page-no": 1,
        "stateList": [
            {
                "id": 20,
                "code": "KY",
                "deleted": "0",
                "stateName": "Kentucky",
                "country": {
                    "id": 2,
                    "code": "USA",
                    "countryName": "USA",
                    "currency": {
                        "id": 48,
                        "code": "USD",
                        "isoCode": "840",
                        "currencyName": "US Dollar",
                        "active": true,
                        "currencyMinorUnit": "2",
                        "deleted": "0"
                    },
                    "isoCode": "840",
                    "shortCode": "US",
                    "isdCode": "1",
                    "active": true,
                    "deleted": null
                },
                "active": true
            }
        ],
        "total-filtered-record": 20
    }
}

xdescribe('CountryStatesService', () => {
  let countryStateService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryStatesService],
    }),
      (countryStateService = TestBed.get(CountryStatesService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: CountryStatesService = TestBed.get(CountryStatesService);
    expect(service).toBeTruthy();
  });

  it('should retrieve getCountryStates', () => {
    countryStateService.getCountryStates(country => {
      expect(country).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CountryStateUrls.countryStates}`);
      expect(req.request.method).toEqual('GET');
      expect(country.pagenumber).toBe(countryJson.data['page-no']);
      req.flush({countryJson});//insert expected JSON
    });
  });

  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
