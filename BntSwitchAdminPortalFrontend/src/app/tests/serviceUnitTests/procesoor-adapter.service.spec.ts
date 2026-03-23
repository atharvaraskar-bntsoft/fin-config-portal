import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProcessorAdapterService } from '@app/services/procesoor-adapter.service';
import { basePath, ProcessorAdapterUrls } from '@app/config/i18n/services/request.url.config';

xdescribe('ProcessorAdapterService', () => {
let processorAdapterService;
let httpTestingController: HttpTestingController;
beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ProcessorAdapterService],
    }),
        (processorAdapterService = TestBed.get(ProcessorAdapterService));
    httpTestingController = TestBed.get(HttpTestingController);
});
it('should be created', () => {
    const service: ProcessorAdapterService = TestBed.get(ProcessorAdapterService);
    expect(service).toBeTruthy();
});
it('should retrieve getProcessorAdapter', () => {
    processorAdapterService.getProcessorAdapter(payload => {
      expect(payload).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${ProcessorAdapterUrls.multihopServices}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

it('should retrieve  get13List', () => {
    processorAdapterService.get13List(payload => {
      expect(payload).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${ProcessorAdapterUrls.get13List}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });
  it('should retrieve  getServiceList', () => {
    processorAdapterService. getServiceList(payload => {
      expect(payload).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${ProcessorAdapterUrls.getServiceList}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });
  it('should retrieve getProcessorAdapterDetails', () => {
    processorAdapterService.getProcessorAdapterDetails(id => {
      expect(id).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${ProcessorAdapterUrls.getServiceList + '/processorAdapterUr'}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });
});