import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { L3AdapterService } from '@app/services/l3-adapter.service';
import { basePath, l3AdapterUrls } from '@app/config/i18n/services/request.url.config';
import { data } from 'jquery';

describe('L3AdapterService', () => {
    let l3AdapterService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [L3AdapterService],
        }),
            (l3AdapterService = TestBed.get(L3AdapterService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: L3AdapterService = TestBed.get(L3AdapterService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getPostActionMethod', () => {
        l3AdapterService.getPostActionMethod(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${l3AdapterUrls.postActionMethodUrl}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getPreActionMethod()', () => {
        l3AdapterService.getPreActionMethod(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${l3AdapterUrls.preActionMethodUrl}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve  GetStepListMethod', () => {
        l3AdapterService. GetStepListMethod(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${l3AdapterUrls.StepListMethodUrl}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve  transformData', () => {
        l3AdapterService.transformData(adapterData => {
          expect(adapterData).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${l3AdapterUrls.getL3Network}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getL3AdapterList', () => {
        l3AdapterService.getL3AdapterList(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${l3AdapterUrls.getL3AdapterList}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getL3Adapter', () => {
        l3AdapterService.getL3Adapter(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${l3AdapterUrls.getL3Adapter}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getL3AdapterById', () => {
        l3AdapterService.getL3AdapterById(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${l3AdapterUrls.getL3AdapterById}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve copyL3Adapter', () => {
        l3AdapterService.copyL3Adapter(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${l3AdapterUrls.copyL3Adapter}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getL3Network', () => {
        l3AdapterService.getL3Network(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${l3AdapterUrls.getL3Network}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve upload', () => {
        l3AdapterService.upload(file => {
          expect(file).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain} + '/data-files/upload`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });

    //   it('should retrieve dataTypeFilter', () => {
    //     const data =[];
    //     l3AdapterService.dataTypeFilter(data => {
    //       expect(data).toBeTruthy();
    //       const req = httpTestingController.expectOne(`${basePath.domain} + '`);
    //       expect(req.request.method).toEqual('GET');
    //       req.flush({});
    //     });
    //   });
});