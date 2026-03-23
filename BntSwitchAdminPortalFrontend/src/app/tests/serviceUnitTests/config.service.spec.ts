import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '@app/services/config.service';
import { AcquirerIdConfigUrls, basePath, UsersUrls, VelocityLimitsEditUrls, VelocityLimitsUrls } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';


describe('UserRolesService', () => {
    let configService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConfigService,
                provideMockStore()],
            
        }),
            (configService = TestBed.get(ConfigService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: ConfigService = TestBed.get(ConfigService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getConfig', () => {
        configService.getConfig(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
   
    afterEach(() => {
        httpTestingController.verify();
    });
});
