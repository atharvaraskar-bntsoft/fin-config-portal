import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuditLogService } from '@app/services/audit-log.service';
import { AuditLogUrls, basePath } from '@app/config/i18n/services/request.url.config';

xdescribe('AccessLogService', () => {
  let auditLogService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuditLogService],
    }),
      (auditLogService = TestBed.get(AuditLogService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: AuditLogService = TestBed.get(AuditLogService);
    expect(service).toBeTruthy();
  });

  it('should retrieve getLogs', () => {
    auditLogService.getLogs(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${AuditLogUrls.getLogs}`);
      expect(req.request.method).toEqual('GET');
      expect(req.request.url).toEqual('http://172.16.23.37:8080/bswitchadm/rest/logs-audit?page-no=1&page-size=20&sort-column=&sort-order=des&filters=period:1660761000-1660802100')
      req.flush({});//insert expected JSON
    });
  });

  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
