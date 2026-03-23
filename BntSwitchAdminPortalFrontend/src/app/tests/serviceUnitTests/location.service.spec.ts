import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationService } from '@app/services/location.service';
import { basePath, LocationUrls } from '@app/config/i18n/services/request.url.config';

xdescribe('LocationService', () => {
    let locationService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LocationService],
        }),
            (locationService = TestBed.get(LocationService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: LocationService= TestBed.get(LocationService);
        expect(service).toBeTruthy();
    });
    it('should retrieve  getLogs', () => {
        locationService.getLogs(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${LocationUrls.getLocation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });

      it('should retrieve  getLocationDetailUrl', () => {
        locationService.getLocationDetail(id => {
          expect(id).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${LocationUrls.getLocation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
});