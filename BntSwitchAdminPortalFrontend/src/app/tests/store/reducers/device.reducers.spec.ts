import { DeviceTypeGetObject } from '@app/models/device-types.interface';
import { EDeviceTypesActions } from '@app/store/actions/device-types.action';
import { ClearState, GetDeviceDetail, GetDeviceTypes, GetDeviceTypesSuccess } from '@app/store/actions/device.action';
import { DeviceTypesReducers } from '@app/store/reducers/device-types.reducers';
import { initialDeviceTypesState } from '@app/store/state/device-types.state';

xdescribe('Device Reducer', () => {
  xdescribe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      } as any;
      const state = DeviceTypesReducers(initialDeviceTypesState, action);

      expect(state).toBe(initialDeviceTypesState);
    });
  });

  xdescribe('GetDeviceTypes action', () => {
    it('should retrieve all devices and update the state in an immutable way', () => {
      //   const { initialState } = fromReducer;
      const newState: any = {
        deviceTypes: {
          status: '',
          message: '',
          data: {
            'total-record': 3,
            'page-no': 1,
            devicesList: [
              {
                id: 3,
                location: {
                  id: 3,
                  name: 'New Delhi',
                },
                merchant: {
                  id: 3,
                  name: 'Croma Retail Company',
                },
                merchantInstitution: null,
                code: '00000090',
                type: {
                  id: 1,
                  code: 'POS-TERMINAL',
                  locked: '0',
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
        },
      };
      //   const action = retrievedBookList({ Book: newState });
      const action: any = new GetDeviceTypesSuccess({});
      const state = DeviceTypesReducers(initialDeviceTypesState, action);

      expect(state).toEqual(newState); //TODO :: change action to get rifght data
      //   expect(state).not.toBe(initialDeviceTypesState);
    });
  });
  xdescribe('GetDeviceTypes action', () => {
    it('should clear all devices and update the state in an immutable way', () => {
      //   const { initialState } = fromReducer;
      const newState: any = {
        deviceTypes: null,
      };
      //   const action = retrievedBookList({ Book: newState });
      const action: any = new ClearState();
      const state = DeviceTypesReducers(initialDeviceTypesState, action);

      expect(state).toEqual(newState);
      //   expect(state).not.toBe(initialDeviceTypesState);
    });
  });
});
