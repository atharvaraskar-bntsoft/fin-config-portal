import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionTypeService } from '@app/services/transaction-type.service';
import { AcquirerIdConfigUrls, basePath, transactionTypeUrls, VelocityLimitsEditUrls, VelocityLimitsUrls, WorkflowsUrls } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';
const workflowJSon =
    { status: "success", message: "Find all Acquirer", data: { "total-record": 7, acquirerMappingList: [{ id: 9, code: "00004321", description: "VISA Acquirer", active: true, deleted: "0", adviceMatch: "0", name: "VISA Acquirer", onusValidate: "1", refundOffline: "1", country: { id: 12, code: null, countryName: "India", currency: null, isoCode: null, shortCode: null, isdCode: null, active: false, deleted: null }, pos_sms: null, pos_dms: null, txntype_sms: null, txntype_dms: null, "accounttype_sms": null, accounttype_dms: null }], "page-no": 1 } }
describe('transaction-type', () => {
    let workflowService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TransactionTypeService,
                provideMockStore()],
            
        }),
            (workflowService = TestBed.get(TransactionTypeService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: TransactionTypeService = TestBed.get(TransactionTypeService);
        expect(service).toBeTruthy();
    });   
    it('should retrieve getTransactionType', () => {
        workflowService.getTransactionType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${transactionTypeUrls.getTransactionType}`);
            expect(req.request.method).toEqual('GET');
        req.flush({workflowJSon});
        });
    });
    it('should retrieve getByIdTransactionType', () => {
        workflowService.getByIdTransactionType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${transactionTypeUrls.getTransactionType}`);
            expect(req.request.method).toEqual('GET');
        req.flush({workflowJSon});
        });
    });
    it('should retrieve postTransactionType', () => {
        workflowService.postTransactionType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${transactionTypeUrls.getTransactionType}`);
            expect(req.request.method).toEqual('POST');
        req.flush({workflowJSon});
        });
    });
    afterEach(() => {
        httpTestingController.verify();
    });
});
