import { InstitutionAcquirerGetObject } from '@app/models/acquirer.interface';

export interface IAcquirerState {
  acquirer: InstitutionAcquirerGetObject;
  selectedAcquirer: any;
  InstitutionAcquirerProcessorList: any;
  acquirerResponse: any;
  acquirerRowData: any;
}

export const initialAcquirerState: IAcquirerState = {
  InstitutionAcquirerProcessorList: null,
  acquirer: null,
  acquirerResponse: null,
  acquirerRowData: null,
  selectedAcquirer: null,
};
