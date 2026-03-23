import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, historyUrls } from '@app/config/i18n/services/request.url.config';
import { HistoryService } from '@app/services/history.service';

describe('HistoryService', () => {
let historyService;
let httpTestingController: HttpTestingController;
beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [HistoryService],
    }),
        (historyService = TestBed.get(HistoryService));
    httpTestingController = TestBed.get(HttpTestingController);
});
it('should be created', () => {
    const service: HistoryService = TestBed.get(HistoryService);
    expect(service).toBeTruthy();
});

it('should retrieve getHistoryUrl', () => {
    historyService.getHistoryUrl(payload => {
      expect(payload).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${historyUrls.getHistoryUrl}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });
  // it('should retrieve getByIdHistoryUrl', () => {
  //   let req;
  //   historyService.getByIdHistoryUrl(id => {
  //     expect(id).toBeTruthy();
  //      req = httpTestingController.expectOne(`${basePath.domain}${historyUrls.getByIdHistoryUrl}`);
     
  //     req.flush({});
  //   });
  //   expect(req.request.method).toEqual('GET');
  // });
});