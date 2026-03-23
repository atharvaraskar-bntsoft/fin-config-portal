import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TxnKeyLableService } from '@app/services/txn-key-lable.service';
import { AcquirerIdConfigUrls, basePath, TxnKeyLableUrls } from '../../config/i18n/services/request.url.config';

const acquirerJson =
    { status: "success", message: "Find all Acquirer", data: { "total-record": 7, acquirerMappingList: [{ id: 9, code: "00004321", description: "VISA Acquirer", active: true, deleted: "0", adviceMatch: "0", name: "VISA Acquirer", onusValidate: "1", refundOffline: "1", country: { id: 12, code: null, countryName: "India", currency: null, isoCode: null, shortCode: null, isdCode: null, active: false, deleted: null }, pos_sms: null, pos_dms: null, txntype_sms: null, txntype_dms: null, "accounttype_sms": null, accounttype_dms: null }], "page-no": 1 } }


describe('TxnKeyLableService', () => {
    let txnKeyLableService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TxnKeyLableService],
        }),
            (txnKeyLableService = TestBed.get(TxnKeyLableService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: TxnKeyLableService = TestBed.get(TxnKeyLableService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getTxnKeyLableType', () => {
        txnKeyLableService.getTxnKeyLableType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypeGet}`);
            expect(req.request.method).toEqual('GET');
        req.flush({txnKeyLableService});
        });
    });
    it('should retrieve getbyidTxnKeyLableType', () => {
        txnKeyLableService.getbyidTxnKeyLableType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypeGet}`);
            expect(req.request.method).toEqual('GET');
        req.flush({txnKeyLableService});
        });
    });
    it('should retrieve deleteTxnKeyLableType', () => {
        txnKeyLableService.deleteTxnKeyLableType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypeGet}`);
            expect(req.request.method).toEqual('DELETE');
        req.flush({txnKeyLableService});
        });
    });
    it('should retrieve updateTxnKeyLableType', () => {
        txnKeyLableService.updateTxnKeyLableType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypeGet}`);
            expect(req.request.method).toEqual('PUT');
        req.flush({txnKeyLableService});
        });
    });
    it('should retrieve postTxnKeyLableType', () => {
        txnKeyLableService.postTxnKeyLableType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${TxnKeyLableUrls.TxnKeyLableTypeGet}`);
            expect(req.request.method).toEqual('POST');
        req.flush({txnKeyLableService});
        });
    });
    afterEach(() => {
        httpTestingController.verify();
    });


});
