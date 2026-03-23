import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterService } from '@app/services/router.service';
import { basePath, Router } from '@app/config/i18n/services/request.url.config';
import { id } from '@swimlane/ngx-datatable';
import { rule } from '@rxweb/reactive-form-validators';

xdescribe('RouterService', () => {
    let routerService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RouterService],
        }),
            (routerService = TestBed.get(RouterService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: RouterService = TestBed.get(RouterService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getServiceList', () => {
        routerService.getServiceList(router => {
          expect(router).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${Router.serviceType}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve  getruleListList', () => {
        routerService.getruleListList(router => {
          expect(router).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${Router.ruleList}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve addRuleListList', () => {
        routerService.addRuleListList(rule => {
          expect(rule).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${Router.getRuleCondition}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve update updateRuleList', () => {
        routerService.updateRuleList(rule => {
          expect(rule).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${Router.updateRouter}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve deleteRouteList', () => {
        routerService.deleteRouteList(rule => {
          expect(rule).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${Router.deleteRoute} + '/deleteRuleListUrl/' + ${id}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve getRuleCondition', () => {
        routerService.getRuleCondition(rule => {
          expect(rule).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${Router.getRuleCondition}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
    //   it('should retrieve updRouterList', () => {
    //     routerService.updRouterList(rule => {
    //       expect(rule).toBeTruthy();
    //       const req = httpTestingController.expectOne(`${basePath.domain}${Router.updateRouter} + '/updateRouterListUrl/' + ${id}`);
    //       expect(req.request.method).toEqual('GET');
    //       req.flush({});
    //     });
    //   });
    //   it('should retrieve saveRuleListList', () => {
    //     routerService.saveRuleListList(rule => {
    //       expect(rule).toBeTruthy();
    //       const req = httpTestingController.expectOne(`${basePath.domain}${Router.saveRule}`);
    //       expect(req.request.method).toEqual('GET');
    //       req.flush({});
    //     });
    //   });
    //   it('should retrieve commitRuleList', () => {
    //     routerService.commitRuleList(rule => {
    //       expect(rule).toBeTruthy();
    //       const req = httpTestingController.expectOne(`${basePath.domain}${Router.commitRule}`);
    //       expect(req.request.method).toEqual('GET');
    //       req.flush({});
    //     });
    //   });
    //   it('should retrieve getRouterList', () => {
    //     routerService.getRouterList(payload => {
    //       expect(payload).toBeTruthy();
    //       const req = httpTestingController.expectOne(`${basePath.domain}${Router.getRouter}`);
    //       expect(req.request.method).toEqual('GET');
    //       req.flush({});
    //     });
    //   });
});