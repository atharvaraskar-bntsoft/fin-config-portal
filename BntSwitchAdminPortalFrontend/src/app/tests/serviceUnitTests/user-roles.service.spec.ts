import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserRolesService } from '@app/services/user-roles.service';
import { AcquirerIdConfigUrls, basePath, UsersUrls, VelocityLimitsEditUrls, VelocityLimitsUrls } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';

const velocityLimitJson= {
    "status": "success",
    "message": "Find all velocityLimitsList Limits",
    "data": {
      "total-record": 2,
      "velocityLimitsList": [
        {
          "id": 5,
          "merchantInstitutionId": {
            "id": 1,
            "institution": {
              "id": 1,
              "name": "Institution_1"
            },
            "acquirer": {
              "id": 1,
              "code": "00000000001",
              "description": "Test Aquirer",
              "active": true,
              "deleted": "0",
              "adviceMatch": "1",
              "name": "Aquirer-One",
              "onusValidate": "1",
              "refundOffline": "1",
              "country": {
                "id": 1,
                "code": "GBR",
                "countryName": "UK",
                "currency": {
                  "id": 16,
                  "code": "GBP",
                  "isoCode": "826",
                  "currencyName": "Sterling Pound",
                  "active": true,
                  "currencyMinorUnit": "2",
                  "deleted": "0"
                },
                "isoCode": "826",
                "shortCode": "GB",
                "isdCode": "44",
                "active": true,
                "deleted": null
              },
              "pos_sms": null,
              "pos_dms": null,
              "txntype_sms": null,
              "txntype_dms": null,
              "accounttype_sms": null,
              "accounttype_dms": null
            },
            "code": "00000000001",
            "name": "Future-Group",
            "description": "",
            "activateOn": 1613484000000,
            "expiryOn": 1765900800000,
            "totalMerchant": 1,
            "totalLocation": null,
            "totalDevice": null,
            "merchantInstitutionDetail": {
              "id": 1,
              "address1": "NOIDA",
              "address2": "",
              "city": "NOIDA",
              "zip": "201301",
              "country": {
                "id": 1,
                "countryName": "UK"
              },
              "countryState": {
                "id": 57,
                "stateName": "Default"
              },
              "phone": "475828258",
              "fax": "0125482745",
              "email": "bigbazar@gip.com"
            },
            "locked": "0"
          },
          "merchantId": {
            "id": 1,
            "merchantInstitution": {
              "id": 1,
              "name": "Future-Group"
            },
            "code": "000000000000001",
            "name": "GIP Noida",
            "description": "",
            "activateOn": 1613484000000,
            "expiryOn": 1739714400000,
            "totalLocation": 1,
            "totalDevice": 1,
            "locked": "0",
            "posSafetyFlag": "1",
            "reversalTimeout": null,
            "merchantProfile": {
              "id": 1,
              "partialAuth": "Y",
              "velocity": null,
              "category": "5411",
              "services": "AUTH_SERVICE",
              "additionalServices": null
            },
            "acquirerID": null,
            "merchantDetail": {
              "id": 1,
              "address1": "noida",
              "address2": "NOIDA",
              "city": "NOIDA",
              "zip": "201301",
              "country": {
                "id": 1,
                "countryName": "UK"
              },
              "countryState": {
                "id": 57,
                "stateName": "Default"
              },
              "phone": "021452",
              "fax": "012545785",
              "email": "gip@future.com"
            },
            "currency": null,
            "bankName": null,
            "accountNumber": null,
            "additionalAttribute": null
          },
          "locationId": {
            "id": 1,
            "totalDevice": 1,
            "code": "000000000000001",
            "name": "GIP Noida",
            "merchant": {
              "id": 1,
              "name": "GIP Noida"
            },
            "merchantInstitution": null,
            "description": "",
            "activateOn": 1613484000000,
            "expiryOn": 1739714400000,
            "storeId": null,
            "posSafetyFlag": "1",
            "reversalTimeout": null,
            "locked": "0",
            "locationDetail": {
              "id": 1,
              "email": "loc@gip.com",
              "phone": "01245256897",
              "fax": "01205658478",
              "address1": "Noida",
              "address2": "Noida",
              "city": "NOIDA",
              "country": {
                "id": 1,
                "countryName": "UK"
              },
              "countryState": {
                "id": 57,
                "stateName": "Default"
              },
              "zip": "201301"
            },
            "coordinates": null,
            "additionalAttribute": null
          },
          "deviceId": {
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
          },
          "baseCurrencyId": {
            "id": 1,
            "code": "AED",
            "isoCode": "784",
            "currencyName": "UAE Dirham",
            "active": true,
            "currencyMinorUnit": "2",
            "deleted": "0"
          },
          "transactionTypes": {
            "id": null,
            "name": "Cash Withdrawal"
          },
          "minutesCount": "1",
          "limitAmount": {
            "singleTransaction": "23333.0000",
            "perTime": null,
            "perDay": null,
            "perMonth": null
          },
          "limitCount": {
            "singleTransaction": null,
            "perTime": null,
            "perDay": null,
            "perMonth": null
          },
          "locked": "0",
          "deleted": "0",
          "type": {
            "id": 4,
            "name": "Device",
            "code": "DEVICES"
          }
        },
        {
          "id": 1,
          "merchantInstitutionId": {
            "id": 2,
            "institution": {
              "id": 1,
              "name": "Institution_1"
            },
            "acquirer": {
              "id": 2,
              "code": "002",
              "description": "Pine Lab for Pos",
              "active": true,
              "deleted": "0",
              "adviceMatch": "1",
              "name": "Pine Lab",
              "onusValidate": "0",
              "refundOffline": "0",
              "country": {
                "id": 12,
                "code": "IND",
                "countryName": "India",
                "currency": {
                  "id": 22,
                  "code": "INR",
                  "isoCode": "356",
                  "currencyName": "Indian Rupee",
                  "active": true,
                  "currencyMinorUnit": "2",
                  "deleted": "0"
                },
                "isoCode": "356",
                "shortCode": "IN",
                "isdCode": "91",
                "active": true,
                "deleted": null
              },
              "pos_sms": null,
              "pos_dms": null,
              "txntype_sms": null,
              "txntype_dms": null,
              "accounttype_sms": null,
              "accounttype_dms": null
            },
            "code": "0000002",
            "name": "Reliance Industries Limt",
            "description": "Reliance Industries Limt group",
            "activateOn": 1489822800000,
            "expiryOn": 1803022800000,
            "totalMerchant": 1,
            "totalLocation": null,
            "totalDevice": null,
            "merchantInstitutionDetail": {
              "id": 2,
              "address1": "Mumbai",
              "address2": "Mumbai India",
              "city": "Mumbai",
              "zip": "400004",
              "country": {
                "id": 12,
                "countryName": "India"
              },
              "countryState": {
                "id": 67,
                "stateName": "Default"
              },
              "phone": "1800 102 7382",
              "fax": "3100 102 7382",
              "email": "reliance@info.com"
            },
            "locked": "0"
          },
          "merchantId": {
            "id": 2,
            "merchantInstitution": {
              "id": 2,
              "name": "Reliance Industries Limt"
            },
            "code": "00000002",
            "name": "Reliance Digital",
            "description": "Reliance digital under Reliance Industries",
            "activateOn": 1521359280000,
            "expiryOn": 1773906480000,
            "totalLocation": 1,
            "totalDevice": 1,
            "locked": "0",
            "posSafetyFlag": "0",
            "reversalTimeout": null,
            "merchantProfile": {
              "id": 2,
              "partialAuth": "Y",
              "velocity": null,
              "category": "6011",
              "services": "LOYALTY_SERVICE",
              "additionalServices": null
            },
            "acquirerID": null,
            "merchantDetail": {
              "id": 2,
              "address1": "Ghaziabad",
              "address2": "Indirapuram Ghaziabad UP",
              "city": "Ghaziabad",
              "zip": "201012",
              "country": {
                "id": 12,
                "countryName": "India"
              },
              "countryState": {
                "id": 67,
                "stateName": "Default"
              },
              "phone": "1800 889 1044",
              "fax": " 1800 889 1044",
              "email": "digital@info.com"
            },
            "currency": null,
            "bankName": null,
            "accountNumber": null,
            "additionalAttribute": null
          },
          "locationId": {
            "id": 2,
            "totalDevice": 1,
            "code": "000000002",
            "name": "Indirapuram, Ghaziabad",
            "merchant": {
              "id": 2,
              "name": "Reliance Digital"
            },
            "merchantInstitution": null,
            "description": "Reliance digital Indirapuram, Ghaziabad, Uttar Pradesh",
            "activateOn": 1521359760000,
            "expiryOn": 1771315020000,
            "storeId": null,
            "posSafetyFlag": "1",
            "reversalTimeout": "5",
            "locked": "0",
            "locationDetail": {
              "id": 2,
              "email": "digitalreliance@info.com",
              "phone": "1800-2390-23",
              "fax": "1800-2390-32",
              "address1": "Indirapuram,Ghaziabad",
              "address2": "Ghaziabad, Uttar Pradesh ",
              "city": "Ghaziabad",
              "country": {
                "id": 12,
                "countryName": "India"
              },
              "countryState": {
                "id": 67,
                "stateName": "Default"
              },
              "zip": "201012"
            },
            "coordinates": null,
            "additionalAttribute": null
          },
          "deviceId": null,
          "baseCurrencyId": {
            "id": 5,
            "code": "BRL",
            "isoCode": "986",
            "currencyName": "Brazilian Real",
            "active": true,
            "currencyMinorUnit": "2",
            "deleted": "0"
          },
          "transactionTypes": {
            "id": null,
            "name": "Cash Withdrawal"
          },
          "minutesCount": "1",
          "limitAmount": {
            "singleTransaction": "123456.0000",
            "perTime": null,
            "perDay": "123456.0000",
            "perMonth": null
          },
          "limitCount": {
            "singleTransaction": null,
            "perTime": null,
            "perDay": "10",
            "perMonth": null
          },
          "locked": "0",
          "deleted": "0",
          "type": {
            "id": 3,
            "name": "Location",
            "code": "LOCATIONS"
          }
        }
      ],
      "page-no": 1,
      "total-filtered-record": 2
    }
  }
describe('UserRolesService', () => {
    let userRolesService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserRolesService,
                provideMockStore()],
            
        }),
            (userRolesService = TestBed.get(UserRolesService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: UserRolesService = TestBed.get(UserRolesService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getUserRoles', () => {
        userRolesService.getUserRoles(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${UsersUrls.getUserRoles}`);
            expect(req.request.method).toEqual('GET');
        req.flush({velocityLimitJson});
        });
    });
    it('should retrieve getAdminRoleCheck', () => {
        userRolesService.getAdminRoleCheck(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${UsersUrls.getAdminRoleCheck}`); //TODO :: extract URL to const and reuse in spev and service
            expect(req.request.method).toEqual('GET');
            req.flush({velocityLimitJson}); 
        });
    });
    it('should retrieve getUserRolesDetails', () => {
        userRolesService.getUserRolesDetails(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${UsersUrls.getUserRoles}`); //TODO :: extract URL to const and reuse in spev and service
            expect(req.request.method).toEqual('GET');
            req.flush({velocityLimitJson}); 
        });
    });
    it('should retrieve deleteUserRoles', () => {
        userRolesService.deleteUserRoles(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${UsersUrls.getUserRoles}`); //TODO :: extract URL to const and reuse in spev and service
            expect(req.request.method).toEqual('DELETE');
            req.flush({velocityLimitJson}); 
        });
    });
    it('should retrieve postUserRoles', () => {
        let id = 1;
        userRolesService.postUserRoles(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${UsersUrls.getUserRoles}${id}`); //TODO :: extract URL to const and reuse in spev and service
            expect(req.request.method).toEqual('POST');
            req.flush({velocityLimitJson});
        });
    });
    it('should retrieve getRoleHidden', () => {
        let id = 1;
        userRolesService.getRoleHidden(corePrperties => {
          expect(corePrperties).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${UsersUrls.roleHiddenLink}${id}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
      it('should retrieve putUserRoles', () => {
        let id = 1;
        userRolesService.putUserRoles(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${UsersUrls.getUserRoles}${id}`);
            expect(req.request.method).toEqual('PUT');
            req.flush({velocityLimitJson});
        });
    });
    it('should retrieve putUserRolesStatus', () => {
        let id = 1;
        userRolesService.putUserRolesStatus(limit => {
            expect(limit).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${UsersUrls.getUserRoles}${id}`);
            expect(req.request.method).toEqual('PUT');
            req.flush({velocityLimitJson});
        });
    }); 
    afterEach(() => {
        httpTestingController.verify();
    });
});
