import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InstitutionGroupService } from '@app/services/institution-group.service';
import { basePath, InstitutionGroupUrls } from '@app/config/i18n/services/request.url.config';
xdescribe('InstitutionGroupService', () => {
let institutionGroupService;
let httpTestingController: HttpTestingController;
beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [InstitutionGroupService],
    }),
        (institutionGroupService = TestBed.get(InstitutionGroupService));
    httpTestingController = TestBed.get(HttpTestingController);
});

it('should be created', () => {
    const service: InstitutionGroupService = TestBed.get(InstitutionGroupService);
    expect(service).toBeTruthy();
});
it('should retrieve getInstitutionGroups', () => {
    institutionGroupService.getInstitutionGroups(payload => {
      expect(payload).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionGroupUrls.getInstitutionGroups}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  it('should retrieve getInstitutionGroupList', () => {
    institutionGroupService.getInstitutionGroupList(payload => {
      expect(payload).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionGroupUrls.getInstitutionGroupList}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });
  it('should retrieve getInstitutionGroupDetails', () => {
    institutionGroupService.getInstitutionGroupDetails(id => {
      expect(id).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionGroupUrls.getInstitutionGroupDetails}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });

  it('should retrieve getRowDataInstitutionGroups', () => {
    institutionGroupService.getRowDataInstitutionGroups(id => {
      expect(id).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${InstitutionGroupUrls.validate}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });
});