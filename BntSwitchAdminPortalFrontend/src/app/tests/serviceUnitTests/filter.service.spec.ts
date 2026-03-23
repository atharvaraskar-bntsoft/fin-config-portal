import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FilterService } from '@app/services/filter.service';
import { AcquirerIdConfigUrls, basePath, UsersUrls, VelocityLimitsEditUrls, VelocityLimitsUrls } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';


describe('FilterService', () => {
    let filterService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FilterService,
                provideMockStore()],
            
        }),
            (filterService = TestBed.get(FilterService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: FilterService = TestBed.get(FilterService);
        expect(service).toBeTruthy();
    });
    it('should retrieve populateFilterData', () => {
        let id =1 ;
        filterService.populateFilterData(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${id}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
   
    afterEach(() => {
        httpTestingController.verify();
    });
});
