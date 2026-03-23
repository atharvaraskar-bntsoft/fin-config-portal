import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, CorePropertiesUrls } from '@app/config/i18n/services/request.url.config';
import { CorePropertiesService } from '@app/services/core-properties.service';

const coreJson =  {
    status: "success",
    message: null,
    data: {
        corePropertiesList: [
            {
                type: "L2",
                name: "May_Test",
                subType: "Core",
                corePropertiesDetails: [
                    {
                        id: 1,
                        version: 0
                    }
                ]
            }
        ]
    }
}

xdescribe('CorePropertiesService', () => {
  let coreService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CorePropertiesService],
    }),
      (coreService = TestBed.get(CorePropertiesService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: CorePropertiesService = TestBed.get(CorePropertiesService);
    expect(service).toBeTruthy();
  });

  it('should retrieve getCorePropetiesList', () => {
    coreService.getCorePropetiesList(corePrperties => {
      expect(corePrperties).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CorePropertiesUrls.getCorePropertiesScreen}`);
      expect(req.request.method).toEqual('GET');
      req.flush({coreJson});
    });
  });

  it('should retrieve deleteCoreProperties', () => {
    let id = 1;
    coreService.deleteCoreProperties(corePrperties => {
      expect(corePrperties).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CorePropertiesUrls.getCorePropertiesScreen} + '/corepropertydetail/' + ${id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });

  it('should retrieve  getDefaultProperties', () => {
    coreService. getDefaultProperties(corePrperties => {
      expect(corePrperties).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CorePropertiesUrls.getCorePropertiesScreen + '/getDefaultCoreProperties'}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  it('should retrieve getCorePropertiesById', () => {
    let id = 1;
    coreService.getCorePropertiesById(corePrperties => {
      expect(corePrperties).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CorePropertiesUrls.getCorePropertiesScreen} + '/' + ${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  it('should retrieve validateCorePropertiesName', () => {
    let name = 'data';
    coreService.validateCorePropertiesName(corePrperties => {
      expect(corePrperties).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${CorePropertiesUrls.getCorePropertiesScreen} + '/validate-coreProperties-name/' + ${name}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });


  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
