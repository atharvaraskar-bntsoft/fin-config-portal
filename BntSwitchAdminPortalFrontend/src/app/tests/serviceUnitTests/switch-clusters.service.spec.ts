import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwitchClustersService } from '@app/services/switch-clusters.service';
import { AcquirerIdConfigUrls, basePath, switchClustersUrls, TxnKeyLableUrls } from '../../config/i18n/services/request.url.config';

const switchClusters =
    { status: "success", message: "Find all Acquirer", data: { "total-record": 7, acquirerMappingList: [{ id: 9, code: "00004321", description: "VISA Acquirer", active: true, deleted: "0", adviceMatch: "0", name: "VISA Acquirer", onusValidate: "1", refundOffline: "1", country: { id: 12, code: null, countryName: "India", currency: null, isoCode: null, shortCode: null, isdCode: null, active: false, deleted: null }, pos_sms: null, pos_dms: null, txntype_sms: null, txntype_dms: null, "accounttype_sms": null, accounttype_dms: null }], "page-no": 1 } }


describe('switchClustersService', () => {
    let switchClustersService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SwitchClustersService],
        }),
            (switchClustersService = TestBed.get(SwitchClustersService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: SwitchClustersService = TestBed.get(SwitchClustersService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getSwitchClustersUrl', () => {
        let variable = {
            params: {
              filters: null,
              'page-no': 1,
              'page-size': '15',
              'sort-column': '',
              'sort-order': 'asc',
            },
          };
        switchClustersService.getSwitchClustersUrl(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${switchClustersUrls.getSwitchClustersUrl} '/' + ${variable}`);
            expect(req.request.method).toEqual('GET');
        req.flush({switchClusters});
        });
    });
    it('should retrieve getByIdSwitchClustersUrl', () => {
        switchClustersService.getByIdSwitchClustersUrl(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${switchClustersUrls.getByIdSwitchClustersUrl}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve postSwitchClustersUrl', () => {
        switchClustersService.postSwitchClustersUrl(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${switchClustersUrls.postSwitchClustersUrl}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    it('should retrieve putSwitchClustersUrl', () => {
        switchClustersService.putSwitchClustersUrl(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${switchClustersUrls.putSwitchClustersUrl}`);
            expect(req.request.method).toEqual('PUT');
        req.flush({});
        });
    });
    afterEach(() => {
        httpTestingController.verify();
    });


});
