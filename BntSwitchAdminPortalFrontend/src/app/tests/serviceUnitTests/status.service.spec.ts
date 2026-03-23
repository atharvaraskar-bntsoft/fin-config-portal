import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StatusService } from '@app/services/status.service';
import { AcquirerIdConfigUrls, basePath, transactionTypeUrls, VelocityLimitsEditUrls, VelocityLimitsUrls, WorkflowsUrls } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';
const StatusServiceJson =
    { status: "success", message: "Find all Acquirer", data: { "total-record": 7, acquirerMappingList: [{ id: 9, code: "00004321", description: "VISA Acquirer", active: true, deleted: "0", adviceMatch: "0", name: "VISA Acquirer", onusValidate: "1", refundOffline: "1", country: { id: 12, code: null, countryName: "India", currency: null, isoCode: null, shortCode: null, isdCode: null, active: false, deleted: null }, pos_sms: null, pos_dms: null, txntype_sms: null, txntype_dms: null, "accounttype_sms": null, accounttype_dms: null }], "page-no": 1 } }
describe('statusService', () => {
    let statusService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [StatusService,
                provideMockStore()],
            
        }),
            (statusService = TestBed.get(StatusService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: StatusService = TestBed.get(StatusService);
        expect(service).toBeTruthy();
    });   
  
    afterEach(() => {
        httpTestingController.verify();
    });
});
