import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RulesService } from '@app/services/rule.service';
import { AcquirerIdConfigUrls, basePath, RuleEngine, switchClustersUrls, TxnKeyLableUrls } from '../../config/i18n/services/request.url.config';

const RulesServiceJson =
    { status: "success", message: "Find all Acquirer", data: { "total-record": 7, acquirerMappingList: [{ id: 9, code: "00004321", description: "VISA Acquirer", active: true, deleted: "0", adviceMatch: "0", name: "VISA Acquirer", onusValidate: "1", refundOffline: "1", country: { id: 12, code: null, countryName: "India", currency: null, isoCode: null, shortCode: null, isdCode: null, active: false, deleted: null }, pos_sms: null, pos_dms: null, txntype_sms: null, txntype_dms: null, "accounttype_sms": null, accounttype_dms: null }], "page-no": 1 } }


describe('RulesService', () => {
    let rulesService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RulesService],
        }),
            (rulesService = TestBed.get(RulesService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: RulesService = TestBed.get(RulesService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getRuleItem', () => {
        rulesService.getRuleItem(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${RuleEngine.getRuleItem}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getRuleCondition', () => {
        rulesService.getRuleCondition(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${RuleEngine.getRuleCondition}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    afterEach(() => {
        httpTestingController.verify();
    });


});
