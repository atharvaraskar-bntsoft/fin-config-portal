import {
  IProcessorAdapterCurd,
  IProcessorAdapterData,
} from '../../models/processor-adapter.interface';

export interface IProcessorAdapterState {
  get13List: any;
  getServiceList: any;
  processorAdapterCreate: IProcessorAdapterCurd;
  processorAdapterData: IProcessorAdapterData[];
  processorAdapterDetails: IProcessorAdapterCurd;
  processorAdapterEdit: IProcessorAdapterCurd;
}

export const initialProcessorAdapterState: IProcessorAdapterState = {
  get13List: null,
  getServiceList: null,
  processorAdapterCreate: null,
  processorAdapterData: null,
  processorAdapterDetails: null,
  processorAdapterEdit: null,
};
