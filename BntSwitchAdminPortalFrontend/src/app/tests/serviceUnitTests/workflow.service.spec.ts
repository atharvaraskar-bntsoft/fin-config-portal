import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkflowService } from '@app/services/workflow.service';
import { AcquirerIdConfigUrls, basePath, VelocityLimitsEditUrls, VelocityLimitsUrls, WorkflowsUrls } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
const workflowJSon =
    { status: "success", message: "Find all Acquirer", data: { "total-record": 7, acquirerMappingList: [{ id: 9, code: "00004321", description: "VISA Acquirer", active: true, deleted: "0", adviceMatch: "0", name: "VISA Acquirer", onusValidate: "1", refundOffline: "1", country: { id: 12, code: null, countryName: "India", currency: null, isoCode: null, shortCode: null, isdCode: null, active: false, deleted: null }, pos_sms: null, pos_dms: null, txntype_sms: null, txntype_dms: null, "accounttype_sms": null, accounttype_dms: null }], "page-no": 1 } }
describe('WorkflowService', () => {
    let workflowService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,HttpClientModule],
            providers: [WorkflowService,
                provideMockStore()],
            
        }),
            (workflowService = TestBed.get(WorkflowService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: WorkflowService = TestBed.get(WorkflowService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getWorkflows', () => {
        workflowService.getWorkflows(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getServiceList', () => {
        workflowService.getServiceList(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getLatestWorkflowService', () => {
        workflowService.getLatestWorkflowService(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({workflowJSon});
        });
    });
    it('should retrieve getPaymentMethod', () => {
        workflowService.getPaymentMethod(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve isNameValid', () => {
        workflowService.isNameValid(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getReversalDropDown', () => {
        workflowService.getReversalDropDown(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve SingleLatestWorkflow', () => {
        workflowService.SingleLatestWorkflow(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve deleteWorkflowGroup', () => {
        workflowService.deleteWorkflowGroup(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve deleteWorkflow', () => {
        workflowService.deleteWorkflow(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('DELETE');
        req.flush({});
        });
    });
    it('should retrieve makeAsDefault', () => {
        workflowService.makeAsDefault(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('PUT');
        req.flush({});
        });
    });
    it('should retrieve enableDisableWorkflow', () => {
        workflowService.enableDisableWorkflow(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('PUT');
        req.flush({});
        });
    });
    
    it('should retrieve PublishLatestWorkflow', () => {
        workflowService.PublishLatestWorkflow(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    it('should retrieve AddLatestWorkflow', () => {
        workflowService.AddLatestWorkflow(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    it('should retrieve AddWorkflow', () => {
        workflowService.AddWorkflow(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    it('should retrieve postPaymentMethod', () => {
        workflowService.postPaymentMethod(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    it('should retrieve getLatestWorkflows', () => {
        workflowService.getLatestWorkflows(acquirer => {
            expect(acquirer).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getServicesList}`);
            expect(req.request.method).toEqual('POST');
        req.flush({workflowJSon});
        });
    });
    it('should retrieve  getWorkflows', () => {
      workflowService.getWorkflows(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${WorkflowsUrls.getWorkflows}`);
          expect(req.request.method).toEqual('POST');
      req.flush({workflowJSon});
      });
  });
    
    afterEach(() => {
        httpTestingController.verify();
    });
});
