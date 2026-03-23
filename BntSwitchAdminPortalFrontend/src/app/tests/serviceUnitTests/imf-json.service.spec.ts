import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImfJsonService } from '@app/services/imf-json.service';
import { AcquirerIdConfigUrls, basePath, DeviceUrls, imfJsonUrl, UsersUrls, VelocityLimitsEditUrls, VelocityLimitsUrls } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';


describe('ImfJsonService', () => {
    let imfJsonService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ImfJsonService,
                provideMockStore()],
            
        }),
            (imfJsonService = TestBed.get(ImfJsonService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: ImfJsonService = TestBed.get(ImfJsonService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getAllVersion', () => {
        let id =1 ;
        imfJsonService.getAllVersion(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.imfJson}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getLatestVersion', () => {
        let id =1 ;
        imfJsonService.getLatestVersion(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.imfJson}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getTypeList', () => {
        let id =1 ;
        imfJsonService.getTypeList(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve deleteImf', () => {
        let id =1 ;
        imfJsonService.deleteImf(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.imfJson}`);
            expect(req.request.method).toEqual('DELETE');
        req.flush({});
        });
    });
    it('should retrieve getImfList', () => {
        let id =1 ;
        imfJsonService.getImfList(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.imfJson}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve singleImfJson', () => {
        let id =1 ;
        imfJsonService.singleImfJson(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.imfJson}${id}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve GetTemplateJson', () => {
        let id =1 ;
        imfJsonService.GetTemplateJson(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve singleTemplateJson', () => {
        let id =1 ;
        imfJsonService.singleTemplateJson(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.imfJson}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve imfJsonById', () => {
        let id =1 ;
        imfJsonService.imfJsonById(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.imfJson}${id}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve putImfJson', () => {
        let id =1 ;
        imfJsonService.putImfJson(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.imfJson}${id}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    it('should retrieve postImfJson', () => {
        let id =1 ;
        imfJsonService.postImfJson(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.imfJsonDraft}${id}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    it('should retrieve userViewJson', () => {
        let id =1 ;
        imfJsonService.userViewJson(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${imfJsonUrl.userViewJson}${id}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    afterEach(() => {
        httpTestingController.verify();
    });
});
