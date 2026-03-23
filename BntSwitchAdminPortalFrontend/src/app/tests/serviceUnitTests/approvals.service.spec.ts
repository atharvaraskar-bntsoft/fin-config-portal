import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApprovalsService } from '@app/services/approvals.service';
import { ApprovalsUrls, basePath } from '@app/config/i18n/services/request.url.config';

describe('ApprovalsService', () => {
  let approvalService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApprovalsService],
    }),
      (approvalService = TestBed.get(ApprovalsService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ApprovalsService = TestBed.get(ApprovalsService);
    expect(service).toBeTruthy();
  });

  it('should retrieve getApprovals', () => {
    approvalService.getApprovals(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${ApprovalsUrls.getChecker}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  it('should retrieve getApprovalsCount', () => {
    approvalService.getApprovalCount(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${ApprovalsUrls.getCheckerCount}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
