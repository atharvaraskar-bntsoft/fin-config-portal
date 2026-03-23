import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImportFileService } from '@app/services/import-file.service';
import { basePath } from '@app/config/i18n/services/request.url.config';
xdescribe('ImportFileService', () => {
    let importFileService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ImportFileService],
        }),
            (importFileService = TestBed.get(ImportFileService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: ImportFileService = TestBed.get(ImportFileService);
        expect(service).toBeTruthy();
    });

    it('should retrieve postCsvFileToInstitutionGroups', () => {
        importFileService.postCsvFileToInstitutionGroups(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain} + '/institution/import'`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve clearData()', () => {
        importFileService.clearData(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain} + '/institution/import'`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve validateCsvFileToInstitutionGroups', () => {
        importFileService.validateCsvFileToInstitutionGroups(payload => {
          expect(payload).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain} + '/institution/import'`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
});