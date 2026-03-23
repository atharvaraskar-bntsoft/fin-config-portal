import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { EDeviceActions, GetDeviceSuccess } from '@app/store/actions/device.action';
import { DeviceEffects } from '@app/store/effects/device.effects';
import { DeviceService } from '@app/services/device.service';
import { AlertService } from '@app/services/alert.service';
import { AlertModule } from 'library/bnt/src/lib/alert/alert.module';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { provideMockStore } from '@ngrx/store/testing';
import { DeviceGetObject } from '@app/models/device.interface';

const initialState = {
  devices: null,

  //other state
};
const mockDevices: any = {
  // const mockDevices: DeviceGetObject = {
  status: 'success',
  message: '',
  data: {
    'total-record': 3,
    'page-no': 1,
    devicesList: [
      {
        id: 3,
        location: {
          id: '3',
          name: 'New Delhi',
        },
        merchant: {
          id: '3',
          name: 'Croma Retail Company',
        },
        merchantInstitution: null,
        code: '00000090',
        type: {
          id: 1,
          code: 'POS-TERMINAL',
          deleted: 'string',
          active: true,
          // locked: '0',
        },
        reversalTimeout: '8',
        posSafetyFlag: '1',
        pedSerialNo: null,
        name: null,
        activateOn: 1520413200000,
        locked: '0',
        hostCapture: false,
        pedId: '6',
        deviceModelId: null,
        additionalAttribute: null,
      },
      {
        id: 2,
        location: {
          id: 2,
          name: 'Indirapuram, Ghaziabad',
        },
        merchant: {
          id: 2,
          name: 'Reliance Digital',
        },
        merchantInstitution: null,
        code: '0000002',
        type: {
          id: 1,
          code: 'POS-TERMINAL',
          locked: '0',
        },
        reversalTimeout: null,
        posSafetyFlag: '0',
        pedSerialNo: null,
        name: null,
        activateOn: 1489824120000,
        locked: '0',
        hostCapture: false,
        pedId: '3',
        deviceModelId: null,
        additionalAttribute: null,
      },
      {
        id: 1,
        location: {
          id: 1,
          name: 'GIP Noida',
        },
        merchant: {
          id: 1,
          name: 'GIP Noida',
        },
        merchantInstitution: null,
        code: '00000001',
        type: {
          id: 1,
          code: 'POS-TERMINAL',
          locked: '0',
        },
        reversalTimeout: null,
        posSafetyFlag: '1',
        pedSerialNo: null,
        name: null,
        activateOn: 1613484000000,
        locked: '0',
        hostCapture: false,
        pedId: null,
        deviceModelId: null,
        additionalAttribute: null,
      },
    ],
    'total-filtered-record': 3,
  },
};

class DevicesServiceMock {
  getDevices(payload?: any): Observable<any> {
    return of(mockDevices);
  }
}
xdescribe('Deviceeffects', () => {
  // let actions$: Observable<any>;
  let actions$: Observable<EDeviceActions>;
  let effects: DeviceEffects;
  let deviceService: jasmine.SpyObj<DeviceService>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        DeviceEffects,
        AlertService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        {
          provide: DeviceService,
          useClass: DevicesServiceMock,
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
      imports: [AlertModule],
    });
    effects = TestBed.get(DeviceEffects);
    deviceService = TestBed.get(DeviceService);
  });

  it('should fire if devices is null', (done) => {
    // const action = EDeviceActions.GetDevice;
    // const outcome = new GetDeviceSuccess(device);

    const spy = spyOn(deviceService, 'getDevices')
      .withArgs({
        params: {
          filters: '',
          'page-no': 1,
          'page-size': '20',
          'sort-column': '',
          'sort-order': 'asc',
        },
      })
      .and.returnValue(mockDevices);
    // const spy = spyOn(deviceService, 'getDevices').and.callThrough();
    actions$ = of(EDeviceActions.GetDevice);
    // this._store.dispatch(
    //   new GetDevice({
    //     filter: this._transFilters(),
    //     page: pagenumber,
    //     'page-size': this.currentPagination,
    //   }),
    // );
    effects.GetDevice$.subscribe(res => {
      // expect(res).toEqual(new GetDeviceSuccess({data:mockDevices}));
      expect(res).toEqual(new GetDeviceSuccess(mockDevices));
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  // Testing API interaction
  // xdescribe('onFetchUsers$', () => {
  //   it('should fire if users is null', done => {
  //     const spy = spyOn(httpService, 'fetchUsers').and.callThrough();
  //     actions$ = of(AppActions.fetchUsers);
  //     effects.onFetchUsers$.subscribe(res => {
  //       expect(res).toEqual(AppActions.fetchUsersSuccess({ data: mockUsers }));
  //       expect(spy).toHaveBeenCalledTimes(1);
  //       done();
  //     });
  //   });
  // });
});
