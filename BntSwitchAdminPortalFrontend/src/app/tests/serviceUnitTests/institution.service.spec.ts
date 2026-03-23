import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InstitutionService } from '@app/services/institution.service';
import { AcquirerIdConfigUrls, basePath, InstitutionUrls, LookUpConfigurationUrls, ViewSettingsUrls } from '../../config/i18n/services/request.url.config';

const InstitutionServiceJSon = {
    data: {
      pagination: [
      ],
      language: [
      ],
      settingDto: {
        id: 1,
        systemUserId: 'SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
        search: 'contain',
        language: 'en_EN1',
        pagination: '20'
      },
      searchOption: [
      ]
    }
  };
describe('InstitutionService', () => {
    let institutionService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [InstitutionService],
        }),
            (institutionService = TestBed.get(InstitutionService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: InstitutionService = TestBed.get(InstitutionService);
        expect(service).toBeTruthy();
    });

    it('should retrieve getCategoryCode', () => {
        institutionService.getCategoryCode(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionUrls.getCategoryCode}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getCurrency', () => {
        institutionService.getCurrency(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionUrls.getCurrency}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getInstitution', () => {
        institutionService.getInstitution(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionUrls.getInstitution}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve InstitutionDetail', () => {
        institutionService.InstitutionDetail(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionUrls.getInstitutionDetail}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getInstitutionGroupList', () => {
        institutionService.getInstitutionGroupList(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionUrls.getInstitutionGroupList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve InstitutionService', () => {
        institutionService.InstitutionService(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionUrls.getInstitutionService}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve InstitutionAdditionalService', () => {
        institutionService.InstitutionAdditionalService(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionUrls.getInstitutionAdditionalServiceList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getInstitutionList', () => {
        institutionService.getInstitutionList(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionUrls.getInstitutionAdditionalServiceList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getInstitutionRowData', () => {
        institutionService.getInstitutionRowData(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionUrls.getInstitutionAdditionalServiceList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    afterEach(() => {
        httpTestingController.verify();
    });


});
