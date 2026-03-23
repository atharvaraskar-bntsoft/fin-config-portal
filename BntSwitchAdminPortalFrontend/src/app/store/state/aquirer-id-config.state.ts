import { AcquirerIdGetObject } from '@app/models/acquirer-id-config.interface';

export interface IAcquirerIdConfigState {
  acquirerIdConfig: AcquirerIdGetObject;
  acquirerIdConfigDetails: any;
  acquireIdFlag: any;
}

export const initialAcquirerIdConfigState: IAcquirerIdConfigState = {
  acquirerIdConfig: null,
  acquirerIdConfigDetails: null,
  acquireIdFlag: null,
};
