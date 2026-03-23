import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeviceService } from '@app/services/device.service';
import { AcquirerIdConfigUrls, basePath, DeviceUrls, UsersUrls, VelocityLimitsEditUrls, VelocityLimitsUrls } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';


describe('DeviceService', () => {
    let deviceService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DeviceService,
                provideMockStore()],
            
        }),
            (deviceService = TestBed.get(DeviceService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: DeviceService = TestBed.get(DeviceService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getDevices', () => {
        let id =1 ;
        deviceService.getDevices(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.getDevice}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getTreeDeepDevices', () => {
        deviceService.getTreeDeepDevices(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.getTreeDeepDevice}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getDeviceDetail', () => {
        deviceService.getDeviceDetail(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.getDeviceDetail}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getDeviceTypes', () => {
        deviceService.getDeviceTypes(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.getDeviceTypes}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getInstitution', () => {
        deviceService.getInstitution(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.getInstitutionList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getInstitutionGroup', () => {
        deviceService.getInstitutionGroup(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.getInstitutionGroupList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve getLocation', () => {
        deviceService.getLocation(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.getLocationList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve deleteDevice', () => {
        deviceService.deleteDevice(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.deleteDevice}`);
            expect(req.request.method).toEqual('DELETE');
        req.flush({});
        });
    });
    it('should retrieve getDeviceModelMapping', () => {
        deviceService.getDeviceModelMapping(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.getLocationList}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve postDevice', () => {
        deviceService.postDevice(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${DeviceUrls.getLocationList}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    afterEach(() => {
        httpTestingController.verify();
    });
});
