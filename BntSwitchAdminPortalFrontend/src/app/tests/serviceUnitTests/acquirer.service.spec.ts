import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AcquirerService } from '@app/services/acquirer.service';
import { AcquirersUrls, basePath } from '@app/config/i18n/services/request.url.config';

xdescribe('AcquirerService', () => {
  let acquirerService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AcquirerService],
    }),
      (acquirerService = TestBed.get(AcquirerService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: AcquirerService = TestBed.get(AcquirerService);
    expect(service).toBeTruthy();
  });

  it('should retrieve getLogs', () => {
    acquirerService.getLogs(logs => {
      expect(logs).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${AcquirersUrls.getAcquirer}`); //TODO :: extract URL to const and reuse in spev and service
      expect(req.request.method).toEqual('GET');
      req.flush({}); //TODO:: json required
    });
  });

  it('should retrieve getInstitutionAcquirerProcessorList', () => {
    acquirerService.getInstitutionAcquirerProcessorList(processorList => {
      expect(processorList).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${AcquirersUrls.getInstitutionAcquirerProcessorList}`); //TODO :: extract URL to const and reuse in spev and service
      expect(req.request.method).toEqual('GET');
      req.flush({}); //TODO:: json required
    });
  });

  it('should retrieve getAcquirerRowData', () => {
    acquirerService.getAcquirerRowData(rowData => {
      expect(rowData).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${AcquirersUrls.getAcquirerRowData}`); //TODO :: extract URL to const and reuse in spev and service
      expect(req.request.method).toEqual('GET');
      req.flush({}); //TODO:: json required
    });
  });

  it('should put request update data...', () => {
    let data = 1; //TODO:: check how requets goes based on that update data
    acquirerService.putAcquirer(data).subscribe(data => {
      expect(data).not.toBeNull();
    });
  });


  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
