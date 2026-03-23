import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, deploymentStatusUrls } from '@app/config/i18n/services/request.url.config';
import { DeploymentStatusService } from '@app/services/deployment-status.service';
import { data } from 'jquery';
import { provideMockStore } from '@ngrx/store/testing';
import { selectGetDeploymentStatus } from '@app/store/selectors/deployment-status.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { RouterTestingModule } from '@angular/router/testing';
import { any } from 'underscore';

describe('DeploymentStatusService', () => {
    let deploymentStatusService ;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,RouterTestingModule],
            providers: [DeploymentStatusService,
                provideMockStore() ],
        }),
            (deploymentStatusService  = TestBed.get(DeploymentStatusService ));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: DeploymentStatusService = TestBed.get(DeploymentStatusService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getDeploymentStatus', () => {
        deploymentStatusService.getDeploymentStatusUrl(data => {
          expect(data).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${deploymentStatusUrls.getDeploymentStatusUrl}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve ViewSettingsList', () => {
        deploymentStatusService.getselectViewSettingsList(response => {
          expect(response).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${deploymentStatusUrls.getDeploymentStatusUrl}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getselectPermissionsData', () => {
        deploymentStatusService.getselectPermissionsData(response => {
          expect(response).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${deploymentStatusUrls.getDeploymentStatusUrl}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getselectGetDeploymentStatus', () => {
        deploymentStatusService.getselectGetDeploymentStatus(response => {
          expect(response).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${deploymentStatusUrls.getDeploymentStatusUrl}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
    afterEach(() => {
        httpTestingController.verify();
      });
});