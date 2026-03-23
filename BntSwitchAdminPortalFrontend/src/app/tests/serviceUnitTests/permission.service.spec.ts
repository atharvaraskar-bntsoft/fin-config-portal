import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PermissionService } from '@app/services/permission.service';
import { AcquirerIdConfigUrls, basePath, PermissionUrls, RuleEngine, switchClustersUrls, TxnKeyLableUrls } from '../../config/i18n/services/request.url.config';

const PermissionServiceJson =
    { status: "success", message: "Find all Acquirer", data: { "total-record": 7, acquirerMappingList: [{ id: 9, code: "00004321", description: "VISA Acquirer", active: true, deleted: "0", adviceMatch: "0", name: "VISA Acquirer", onusValidate: "1", refundOffline: "1", country: { id: 12, code: null, countryName: "India", currency: null, isoCode: null, shortCode: null, isdCode: null, active: false, deleted: null }, pos_sms: null, pos_dms: null, txntype_sms: null, txntype_dms: null, "accounttype_sms": null, accounttype_dms: null }], "page-no": 1 } }


describe('PermissionService', () => {
    let permissionService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PermissionService],
        }),
            (permissionService = TestBed.get(PermissionService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: PermissionService = TestBed.get(PermissionService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getPermission', () => {
        permissionService.getPermission(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${PermissionUrls.getPermission}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    afterEach(() => {
        httpTestingController.verify();
    });


});
