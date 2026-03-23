import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GMapsService } from '@app/services/locations-geocoding.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('GMapsService', () => {
    let gMapsService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GMapsService,provideMockStore()],
        }),
            (gMapsService = TestBed.get(GMapsService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: GMapsService = TestBed.get(GMapsService);
        expect(service).toBeTruthy();
    });
});