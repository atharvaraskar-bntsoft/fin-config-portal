import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RuntimePropertiesService } from '@app/services/runtime-Properties.service';
import { basePath, RuntimePropertiesUrls } from '@app/config/i18n/services/request.url.config';
xdescribe('RuntimePropertiesService', () => {
    let runtimePropertiesService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RuntimePropertiesService],
        }),
            (runtimePropertiesService = TestBed.get(RuntimePropertiesService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: RuntimePropertiesService = TestBed.get(RuntimePropertiesService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getRuntimeProperty', () => {
        runtimePropertiesService.getRuntimeProperty(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${RuntimePropertiesUrls.runtimeProperty}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
});