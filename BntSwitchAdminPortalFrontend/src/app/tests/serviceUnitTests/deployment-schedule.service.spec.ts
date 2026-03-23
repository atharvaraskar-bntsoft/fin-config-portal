import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, DashboardUrls, deploymentSchedule } from '@app/config/i18n/services/request.url.config';
import { DeploymentScheduleService } from '@app/services/deployment-schedule.service';


xdescribe('DeploymentScheduleService', () => {
  let deploymentScheduleService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeploymentScheduleService],
    }),
      (deploymentScheduleService = TestBed.get(DeploymentScheduleService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: DeploymentScheduleService = TestBed.get(DeploymentScheduleService);
    expect(service).toBeTruthy();
  });

  it('should retrieve  getCurrentNonScheduledDeployments', () => {
    deploymentScheduleService. getCurrentNonScheduledDeployments(deployment => {
      expect(deployment).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${deploymentSchedule.getNewlyDeployedComponents}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
