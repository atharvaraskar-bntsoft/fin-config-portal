import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SchemeImfMapperService } from '@app/services/scheme-imf-mapper.service';
import { basePath, schemeImfMapperUrls } from '@app/config/i18n/services/request.url.config';
xdescribe('SchemeImfMapperService', () => {
    let schemeImfMapperService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SchemeImfMapperService],
        }),
            (schemeImfMapperService = TestBed.get(SchemeImfMapperService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: SchemeImfMapperService = TestBed.get(SchemeImfMapperService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getSchemeImfMapper', () => {
        schemeImfMapperService.getSchemeImfMapper(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${schemeImfMapperUrls.gerSchemeImfMapper}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve  getField', () => {
        schemeImfMapperService. getField(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${schemeImfMapperUrls.getField}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve  getIMF', () => {
        schemeImfMapperService.getIMF(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${schemeImfMapperUrls.getIMF}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve  getIPC', () => {
        schemeImfMapperService.getIPC(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${schemeImfMapperUrls.getIPC}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getMap', () => {
        schemeImfMapperService.getMap(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${schemeImfMapperUrls.getMap}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve postSchemeImfMapper', () => {
        schemeImfMapperService.postSchemeImfMapper(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${schemeImfMapperUrls.saveSchemeImfMapper}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getElFunction', () => {
        schemeImfMapperService.getElFunction(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${schemeImfMapperUrls.getFlFunction}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getBuiltMapperList', () => {
        schemeImfMapperService.getBuiltMapperList(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${schemeImfMapperUrls.getMapperList}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getServiceType', () => {
        schemeImfMapperService.getServiceType(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${schemeImfMapperUrls.getService}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
});