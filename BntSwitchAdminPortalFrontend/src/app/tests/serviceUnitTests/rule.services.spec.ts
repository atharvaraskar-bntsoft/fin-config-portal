import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RulesService } from '@app/services/rule.service';
import { basePath, RuleEngine } from '@app/config/i18n/services/request.url.config';
xdescribe('RulesService', () => {
    let rulesService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RulesService],
        }),
            (rulesService = TestBed.get(RulesService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: RulesService = TestBed.get(RulesService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getRuleItem', () => {
        rulesService.getRuleItem(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${RuleEngine.getRuleItem}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve putRule', () => {
        rulesService.putRule(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${RuleEngine.postRule}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve postRule', () => {
        rulesService.postRule(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${RuleEngine.postRule}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
});