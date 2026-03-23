import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RuleTagService } from '@app/services/rule-tag.service';
import { AcquirerIdConfigUrls, basePath, ruleTagUrls, tagUrls, UsersUrls, VelocityLimitsEditUrls, VelocityLimitsUrls } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';


const data = [
    {
      name: 'TAG_NAME',
      service_type: 'AUTH_SERVICE',
      service: 'request',
      condition: {
        type: 'or',
        conditions: [
          {
            type: 'equal',
            fieldName: '${payment_method}',
            value: 'CARD',
          },
          {
            type: 'equal',
            fieldName: '${payment_method}',
            value: 'ECOM',
          },
        ],
      },
      active: 1,
      deleted: 0,
      tag: 'HIGH_RISK',
    },
    {
      name: 'New Tag',
      service_type: 'AUTH_SERVICE',
      service: 'request',
      condition: {
        type: 'or',
        conditions: [
          {
            type: 'equal',
            fieldName: '${payment_method}',
            value: 'CARD',
          },
        ],
      },
      active: 0,
      deleted: 0,
      tag: 'HIGH_RISK',
    },
  ];
  
describe('RuleTagService', () => {
    let ruleTagService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RuleTagService,
                provideMockStore()],
            
        }),
            (ruleTagService = TestBed.get(RuleTagService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: RuleTagService = TestBed.get(RuleTagService);
        expect(service).toBeTruthy();
    });
    
    it('should retrieve getRuleTagList', () => {
        ruleTagService.getRuleTagList(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ruleTagUrls.getRuleTagList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({data});
        });
    });
    it('should retrieve deleteRuleTag', () => {
        ruleTagService.deleteRuleTag(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ruleTagUrls.updateRuleTag}`);
            expect(req.request.method).toEqual('DELETE');
        req.flush({data});
        });
    });
    it('should retrieve getRuleTagId', () => {
        ruleTagService.getRuleTagId(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ruleTagUrls.updateRuleTag}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getTags', () => {
        ruleTagService.getTags(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ruleTagUrls.getRuleTagList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({data});
        });
    });
    it('should retrieve getConditions', () => {
        ruleTagService.getConditions(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ruleTagUrls.getConditions}`);
            expect(req.request.method).toEqual('GET');
        req.flush({data});
        });
    });
    it('should retrieve getOperatorList', () => {
        ruleTagService.getOperatorList(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ruleTagUrls.getOperatorTypeList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({data});
        });
    });
    it('should retrieve getImfMessageList', () => {
        ruleTagService.getImfMessageList(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ruleTagUrls.getImfMessageList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({data});
        });
    });
    // it('should retrieve postRuleTag', () => {
    //     let id=1;
    //     ruleTagService.postRuleTag(limit => {
    //         expect(limit).toBeTruthy();
    //         const req = httpTestingController.expectOne(`${basePath.domain}${ruleTagUrls.getImfMessageList}${id}`);
    //         expect(req.request.method).toEqual('POST');
    //     req.flush({data});
    //     });
    // });
    it('should retrieve updateRuleTag', () => {
        let id=1;
        ruleTagService.updateRuleTag(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${ruleTagUrls.updateRuleTag}${id}`);
            expect(req.request.method).toEqual('PUT');
        req.flush({data});
        });
    });
    it('should retrieve getNewTags', () => {
        let id=1;
        ruleTagService.getNewTags(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${tagUrls.getTags}${id}`);
            expect(req.request.method).toEqual('GET');
        req.flush({data});
        });
    });
    it('should retrieve createTag', () => {
        let id=1;
        ruleTagService.createTag(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${tagUrls.createTag}${id}`);
            expect(req.request.method).toEqual('POST');
        req.flush({data});
        });
    });
    it('should retrieve editTagId', () => {
        let id=1;
        ruleTagService.editTagId(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${tagUrls.editTags}${id}`);
            expect(req.request.method).toEqual('GET');
        req.flush({data});
        });
    });
    
    afterEach(() => {
        httpTestingController.verify();
    });
});
