import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MerchantCodeMappingService } from '@app/services/merchant-code-mapping.service';
import { provideMockStore } from '@ngrx/store/testing';
import { basePath, MerchantCodeMappingUrls } from '@app/config/i18n/services/request.url.config';
xdescribe('MerchantCodeMappingService', () => {
    let merchantCodeMappingService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MerchantCodeMappingService, provideMockStore()],
        }),
            (merchantCodeMappingService = TestBed.get(MerchantCodeMappingService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: MerchantCodeMappingService = TestBed.get(MerchantCodeMappingService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getRowErrorCodeMapping', () => {
        merchantCodeMappingService.getRowErrorCodeMapping(id => {
          expect(id).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });

      it('should retrieve  deleteMechantCodeMapping', () => {
        merchantCodeMappingService.deleteMechantCodeMapping(id => {
          expect(id).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping} + '/deleteMerchantCodeMappingUrl/' + ${id}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });

      it('should retrieve  getMerchantConfigueData', () => {
        merchantCodeMappingService.getMerchantConfigueData(id => {
          expect(id).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MerchantCodeMappingUrls.getMerchantConfigUrl}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve postErrorCodeMapping', () => {
        merchantCodeMappingService.postErrorCodeMapping(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve updateErrorCodeMapping', () => {
        merchantCodeMappingService.updateErrorCodeMapping(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getMerchantCodeMapping', () => {
        merchantCodeMappingService.getMerchantCodeMapping(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MerchantCodeMappingUrls.getMerchantCodeMapping}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
});