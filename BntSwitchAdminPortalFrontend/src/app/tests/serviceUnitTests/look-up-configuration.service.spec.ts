import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LookUpConfigurationService } from '@app/services/look-up-configuration.service';
import { AcquirerIdConfigUrls, basePath, LookUpConfigurationUrls, ViewSettingsUrls } from '../../config/i18n/services/request.url.config';

const lookUpConfigurationServiceJSON = {
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
describe('LookUpConfigurationService', () => {
    let lookUpConfigurationService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LookUpConfigurationService],
        }),
            (lookUpConfigurationService = TestBed.get(LookUpConfigurationService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: LookUpConfigurationService = TestBed.get(LookUpConfigurationService);
        expect(service).toBeTruthy();
    });

    it('should retrieve getLookUpType', () => {
        lookUpConfigurationService.getLookUpType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${LookUpConfigurationUrls.lookUpType}`);
            expect(req.request.method).toEqual('GET');
        req.flush({lookUpConfigurationServiceJSON});
        });
    });
    it('should retrieve getLookUpValue', () => {
        lookUpConfigurationService.getLookUpValue(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${LookUpConfigurationUrls.lookUpValue}`);
            expect(req.request.method).toEqual('GET');
        req.flush({lookUpConfigurationServiceJSON});
        });
    });
    it('should retrieve deleteLookUpType', () => {
        lookUpConfigurationService.deleteLookUpType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${LookUpConfigurationUrls.lookUpValue}`);
            expect(req.request.method).toEqual('DELETE');
        req.flush({});
        });
    });
    it('should retrieve postLookUpType', () => {
        lookUpConfigurationService.postLookUpType(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${LookUpConfigurationUrls.lookUpValue}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    
    afterEach(() => {
        httpTestingController.verify();
    });


});
