import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, DashboardUrls } from '@app/config/i18n/services/request.url.config';
import { DashboardService } from '@app/services/dashboard.service';


xdescribe('DashboardService', () => {
  let dashboardService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    }),
      (dashboardService = TestBed.get(DashboardService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });

  it('should retrieve getDashboard', () => {
    dashboardService.getDashboard(dashboard => {
      expect(dashboard).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${DashboardUrls.getDashboard}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
