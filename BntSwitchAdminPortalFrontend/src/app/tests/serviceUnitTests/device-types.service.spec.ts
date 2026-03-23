import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { basePath, DashboardUrls, deploymentSchedule, DeviceTypesUrls } from '@app/config/i18n/services/request.url.config';
import { DeviceTypesService } from '@app/services/device-types.service';

const selectDeviceJson ={
    status: "success",
    message: "Find all Devices",
    data: {
      "total-record": 3,
      "page-no": 1,
      devicesList: [
        {
          "id": 3,
          "location": {
            "id": 3,
            "name": "New Delhi"
          },
          "merchant": {
            "id": 3,
            "name": "Croma Retail Company"
          },
          "merchantInstitution": null,
          "code": "00000090",
          "type": {
            "id": 1,
            "code": "POS-TERMINAL",
            "locked": "0"
          },
          "reversalTimeout": "8",
          "posSafetyFlag": "1",
          "pedSerialNo": null,
          "name": null,
          "activateOn": 1520413200000,
          "locked": "0",
          "hostCapture": false,
          "pedId": "6",
          "deviceModelId": null,
          "additionalAttribute": null
        },
        {
          "id": 2,
          "location": {
            "id": 2,
            "name": "Indirapuram, Ghaziabad"
          },
          "merchant": {
            "id": 2,
            "name": "Reliance Digital"
          },
          "merchantInstitution": null,
          "code": "0000002",
          "type": {
            "id": 1,
            "code": "POS-TERMINAL",
            "locked": "0"
          },
          "reversalTimeout": null,
          "posSafetyFlag": "0",
          "pedSerialNo": null,
          "name": null,
          "activateOn": 1489824120000,
          "locked": "0",
          "hostCapture": false,
          "pedId": "3",
          "deviceModelId": null,
          "additionalAttribute": null
        },
        {
          "id": 1,
          "location": {
            "id": 1,
            "name": "GIP Noida"
          },
          "merchant": {
            "id": 1,
            "name": "GIP Noida"
          },
          "merchantInstitution": null,
          "code": "00000001",
          "type": {
            "id": 1,
            "code": "POS-TERMINAL",
            "locked": "0"
          },
          "reversalTimeout": null,
          "posSafetyFlag": "1",
          "pedSerialNo": null,
          "name": null,
          "activateOn": 1613484000000,
          "locked": "0",
          "hostCapture": false,
          "pedId": null,
          "deviceModelId": null,
          "additionalAttribute": null
        }
      ],
      "total-filtered-record": 3
    }
  };
describe('DeviceTypesService', () => {
  let deviceTypesService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeviceTypesService],
    }),
      (deviceTypesService = TestBed.get(DeviceTypesService));
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: DeviceTypesService = TestBed.get(DeviceTypesService);
    expect(service).toBeTruthy();
  });

  it('should retrieve  getLogs', () => {
    deviceTypesService. getLogs(deployment => {
      expect(deployment).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${DeviceTypesUrls.getLogs}`);
      expect(req.request.method).toEqual('GET');
      req.flush({selectDeviceJson});
    });
  });

  //TODO:: requets parameters tests
  afterEach(() => {
    httpTestingController.verify();
  });
});
