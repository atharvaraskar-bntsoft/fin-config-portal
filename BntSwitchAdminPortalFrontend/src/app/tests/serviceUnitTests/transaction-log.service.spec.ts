import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionLogService } from '@app/services/transaction-log.service';
import { basePath, TransactionLogUrls } from '@app/config/i18n/services/request.url.config';
describe('TransactionLogService', () => {
    let transactionLogService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TransactionLogService],
        }),
            (transactionLogService = TestBed.get(TransactionLogService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: TransactionLogService = TestBed.get(TransactionLogService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getTransactionLogsById', () => {
        transactionLogService.getTransactionLogsById(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${TransactionLogUrls.getSourceMerchant}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });

      it('should retrieve getSourceDestinationEndpointName', () => {
        transactionLogService.getSourceDestinationEndpointName(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${TransactionLogUrls.getSourceDestinationEndpointName}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getSourceAcquirer', () => {
        transactionLogService.getSourceAcquirer(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${TransactionLogUrls.getSourceAcquirer}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getSourceDevice', () => {
        transactionLogService.getSourceDevice(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${TransactionLogUrls.getSourceDevice}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getLogs', () => {
        transactionLogService.getLogs(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${TransactionLogUrls.getLogs}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getSourceMerchant', () => {
        transactionLogService.getSourceMerchant(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${TransactionLogUrls.getSourceMerchant}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
    //   it('should retrieve postTransactionLogReview', () => {
    //     transactionLogService.postTransactionLogReview(payload => {
    //       expect(payload).toBeTruthy();
    //       const req = httpTestingController.expectOne(`${basePath.domain}${TransactionLogUrls.getLogs}`);
    //       expect(req.request.method).toEqual('GET');
    //       req.flush({});
    //     });
    //   });
});