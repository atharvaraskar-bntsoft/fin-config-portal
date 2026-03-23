import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@app/services/auth.service';
import { AuthURL, basePath } from '../../config/i18n/services/request.url.config';
import { provideMockStore } from '@ngrx/store/testing';
import { CookieService } from 'ngx-cookie-service';

const permissionJSON = [
    {
      data: {
        ' page-no': 1,
        'total-filtered-record': 3,
        'total-record': 3,
        velocityLimitsList: {
          baseCurrencyId: {},
          deleted: '0',
          deviceId: null,
          id: 4,
          limitAmount: {},
          limitCount: {},
          locationId: null,
          locked: '1',
          merchantId: {},
          merchantInstitutionId: {
            acquirer: {
              accounttype_dms: null,
              accounttype_sms: null,
              active: true,
              adviceMatch: '1',
              code: '00000000001',
            },
            activateOn: 1613484000000,
            code: '00000000001',
            description: '',
            expiryOn: 1765900800000,
            id: 1,
            institution: {
              id: 1,
              name: 'Institution_1',
            },
            locked: '0',
            merchantInstitutionDetail: {
              address1: 'NOIDA',
              address2: '',
              city: 'NOIDA',
              country: {
                countryName: 'UK',
                id: 1,
              },
              countryState: {
                id: 57,
                stateName: 'Default',
              },
              email: 'bigbazar@gip.com',
              fax: '0125482745',
              id: 1,
              phone: '475828258',
              zip: '201301',
            },
            name: 'Future-Group',
            totalDevice: null,
            totalLocation: null,
            totalMerchant: 1,
          },
          minutesCount: '1',
          transactionTypes: {
            id: null,
            name: 'Cash Withdrawal',
          },
          type: {
            code: 'INSTITUTIONS',
            id: 2,
            name: 'Merchant',
          },
        },
      },
    },
  ];
describe('AuthService', () => {
    let authService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService,CookieService,
                provideMockStore()],
            
        }),
            (authService = TestBed.get(AuthService));
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
    it('should retrieve metaInformation', () => {
        authService.metaInformation(auth => {
            expect(auth).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${AuthURL.login}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve permissions', () => {
        authService.permissions(auth => {
            expect(auth).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${AuthURL.login}`);
            expect(req.request.method).toEqual('GET');
        req.flush({});
        });
    });
    it('should retrieve login', () => {
        authService.login(auth => {
            expect(auth).toBeTruthy();
            const req = httpTestingController.expectOne(`${basePath.domain}${AuthURL.login}`);
            expect(req.request.method).toEqual('POST');
        req.flush({});
        });
    });
    
    afterEach(() => {
        httpTestingController.verify();
    });
});
