import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, BinTableUrls } from '@app/config/i18n/services/request.url.config';
import { BinTableService } from '@app/services/bin-table.service';

xdescribe('BinTableService', () => {
  let binTableService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BinTableService],
    }),
      (binTableService = TestBed.get(BinTableService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: BinTableService = TestBed.get(BinTableService);
    expect(service).toBeTruthy();
  });

  it('should retrieve getBinTable', () => {
    binTableService.getBinTable(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${BinTableUrls.getBinTable}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});//insert expected JSON
    });
  });

  it('should retrieve getBinTableAll', () => {
    binTableService.getBinTableAll(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${BinTableUrls.getBinTableAll}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});//insert expected JSON
    });
  });

  it('should retrieve getAccountType', () => {
    binTableService.getAccountType(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${BinTableUrls.getAccountType}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});//insert expected JSON
    });
  });

  it('should retrieve getBinTableData', () => {
    binTableService.getBinTableData(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${BinTableUrls.getBinTableData}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});//insert expected JSON
    });
  });

  /*it('should retrieve binDataDetails', () => {
    binTableService.binDataDetails(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${BinTableUrls.getBinTableData}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});//insert expected JSON
    });
  });*/

  it('should retrieve getBinMasterAll', () => {
    binTableService.getBinMasterAll(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${BinTableUrls.getBinMasterAll}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});//insert expected JSON
    });
  });

  /*it('should retrieve getAccountTypeDetails', () => {
    //let id = 1;
    binTableService.getAccountTypeDetails(approval => {
      expect(approval).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${BinTableUrls.getAccountTypeDetails}`);
      //const req1 = httpTestingController.expectOne(`${basePath.domain}${BinTableUrls.getAccountTypeDetails}/${id}`);
      expect(req.request.method).toEqual('GET');
      //expect(req1.request.method).toEqual('GET');
      req.flush({});//insert expected JSON
    });
  });*/

  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
