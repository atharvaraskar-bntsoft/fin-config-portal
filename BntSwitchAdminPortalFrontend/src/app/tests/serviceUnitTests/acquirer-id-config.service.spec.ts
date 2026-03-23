import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AcquirerIdConfigService } from '@app/services/acquirer-id-config.service';
import { AcquirerIdConfigUrls, basePath } from '../../config/i18n/services/request.url.config';

const acquirerJson =
    { status: "success", message: "Find all Acquirer", data: { "total-record": 7, acquirerMappingList: [{ id: 9, code: "00004321", description: "VISA Acquirer", active: true, deleted: "0", adviceMatch: "0", name: "VISA Acquirer", onusValidate: "1", refundOffline: "1", country: { id: 12, code: null, countryName: "India", currency: null, isoCode: null, shortCode: null, isdCode: null, active: false, deleted: null }, pos_sms: null, pos_dms: null, txntype_sms: null, txntype_dms: null, "accounttype_sms": null, accounttype_dms: null }], "page-no": 1 } }


xdescribe('AcquirerIdConfigService', () => {
    let acquirerIdConfigService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AcquirerIdConfigService],
        }),
            (acquirerIdConfigService = TestBed.get(AcquirerIdConfigService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: AcquirerIdConfigService = TestBed.get(AcquirerIdConfigService);
        expect(service).toBeTruthy();
    });

    it('should retrieve getAcquirerIdConfig', () => {
        acquirerIdConfigService.getAcquirerIdConfig(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${AcquirerIdConfigUrls.getAcquirerIdConfig}`);
            expect(req.request.method).toEqual('GET');
        req.flush({acquirerJson});
        });
    });
 
    it('should retrieve getAcquirerIdConfigDetails', () => {
        acquirerIdConfigService.getAcquirerIdFlagDetails(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${AcquirerIdConfigUrls.getAcquirerIdConfig}`); //TODO :: extract URL to const and reuse in spev and service
            expect(req.request.method).toEqual('GET');
            req.flush({acquirerJson}); //TODO:: json required
        });
    });

    it('should retrieve Acquirer ById', () => {
        let id = '9'; //TODO get some valid id from backend or as per json
        acquirerIdConfigService.getAcquirerIdConfigDetails(acquirer => {
          expect(acquirer).toBeTruthy();
          const req = httpTestingController.expectOne(
            reqObj => reqObj.url == `${basePath.domain}${AcquirerIdConfigUrls.getAcquirerIdConfig}`,
          );
          expect(req.request.params.get('id')).toEqual(id);
          req.flush({}); //@TODO :: add JSON data here
        });
      });

    // TODO:: requets parameters tests
    afterEach(() => {
        httpTestingController.verify();
    });


});
