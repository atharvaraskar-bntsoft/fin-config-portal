import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MonitoringService } from '@app/services/monitoring.service';
import { basePath, MonitoringUrls } from '@app/config/i18n/services/request.url.config';

xdescribe('MonitoringService', () => {
    let monitoringService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MonitoringService],
        }),
            (monitoringService = TestBed.get(MonitoringService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: MonitoringService = TestBed.get(MonitoringService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getMonitoringScreen', () => {
        monitoringService.getMonitoringScreen(url => {
          expect(url).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.getMonitoringScreen}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });

      it('should retrieve getLoggerLogLevel', () => {
        monitoringService.getLoggerLogLevel(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.monitoringOperation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve killInstance', () => {
        monitoringService.killInstance(url => {
          expect(url).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.monitoringOperation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });

      it('should retrieve startInstance', () => {
        monitoringService.startInstance(url => {
          expect(url).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.monitoringOperation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve stopInstance', () => {
        monitoringService.stopInstance(url => {
          expect(url).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.monitoringOperation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve networkStatusForConnectionName', () => {
        monitoringService.networkStatusForConnectionName(connectionName => {
          expect(connectionName).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.monitoringOperation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve ExecuteOperation', () => {
        monitoringService.ExecuteOperation(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.monitoringOperation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve ExecutePropertyOperation', () => {
        monitoringService.ExecutePropertyOperation(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.monitoringOperation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve toggleMaintenance', () => {
        monitoringService.toggleMaintenance(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.monitoringOperation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve secretManagerOperation', () => {
        monitoringService.secretManagerOperation(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${MonitoringUrls.monitoringOperation}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
});