import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from '@app/services/profile.service';
import { AcquirerIdConfigUrls, basePath, ProfileUrls, RuleEngine, switchClustersUrls, TxnKeyLableUrls } from '../../config/i18n/services/request.url.config';

const ProfileServiceJSon =
    { status: "success", message: "Find all Acquirer", data: { "total-record": 7, acquirerMappingList: [{ id: 9, code: "00004321", description: "VISA Acquirer", active: true, deleted: "0", adviceMatch: "0", name: "VISA Acquirer", onusValidate: "1", refundOffline: "1", country: { id: 12, code: null, countryName: "India", currency: null, isoCode: null, shortCode: null, isdCode: null, active: false, deleted: null }, pos_sms: null, pos_dms: null, txntype_sms: null, txntype_dms: null, "accounttype_sms": null, accounttype_dms: null }], "page-no": 1 } }


describe('ProfileService', () => {
    let profileService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProfileService],
        }),
            (profileService = TestBed.get(ProfileService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: ProfileService = TestBed.get(ProfileService);
        expect(service).toBeTruthy();
    });
    it('should retrieve GetLogout', () => {
        profileService.GetLogout(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ProfileUrls.getLogout}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getRuleCondition', () => {
        profileService.getProfile(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ProfileUrls.getUsers}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    afterEach(() => {
        httpTestingController.verify();
    });


});
