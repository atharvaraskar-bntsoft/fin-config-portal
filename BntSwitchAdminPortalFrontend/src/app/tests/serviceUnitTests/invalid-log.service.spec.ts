import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InvalidLogService } from '@app/services/invalid-log.service';
import { basePath, InvalidLogUrls } from '@app/config/i18n/services/request.url.config';
import { url } from 'inspector';

xdescribe('InvalidLogService', () => {
    let invalidLogService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [InvalidLogService],
        }),
            (invalidLogService = TestBed.get(InvalidLogService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: InvalidLogService = TestBed.get(InvalidLogService);
        expect(service).toBeTruthy();
    });
    it('should retrieve  getSafProcessorList', () => {
        invalidLogService.getSafProcessorList(url => {
          expect(url).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${InvalidLogUrls.safProcessorList}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getSafStatusDDL', () => {
        invalidLogService.getSafStatusDDL(url => {
          expect(url).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${InvalidLogUrls.safQueueList}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve deleteExceptionalQueue', () => {
        invalidLogService.deleteExceptionalQueue(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${InvalidLogUrls.deleteSaf}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve moveToSafQueue', () => {
        invalidLogService.moveToSafQueue(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${InvalidLogUrls.moveToSaf}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getExceptionQueueList', () => {
        invalidLogService.getExceptionQueueList(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${InvalidLogUrls.exceptionList}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getSAFQueue', () => {
        invalidLogService.getSAFQueue(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${InvalidLogUrls.safList}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve deleteMultiple', () => {
        invalidLogService.deleteMultiple(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${InvalidLogUrls.deleteMultiple}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getInvalidLogs', () => {
        invalidLogService.getInvalidLogs(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${InvalidLogUrls.getInvalidLogs}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
});