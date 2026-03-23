import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IProcessorAdapterState } from '../state/processor-adapter.state';

const selectProcessorAdapter = (state: IAppState) => state.processorAdapter;

export const selectprocessorAdapterList = createSelector(
  selectProcessorAdapter,
  (state: IProcessorAdapterState) => state.processorAdapterData,
);

export const selectGet13List = createSelector(
  selectProcessorAdapter,
  (state: IProcessorAdapterState) => state.get13List,
);

export const selectGetServiceList = createSelector(
  selectProcessorAdapter,
  (state: IProcessorAdapterState) => state.getServiceList,
);

export const selectprocessorAdapterCreate = createSelector(
  selectProcessorAdapter,
  (state: IProcessorAdapterState) => state.processorAdapterCreate,
);
export const selectprocessorAdapterDetails = createSelector(
  selectProcessorAdapter,
  (state: IProcessorAdapterState) => state.processorAdapterDetails,
);
export const selectprocessorAdapterEdit = createSelector(
  selectProcessorAdapter,
  (state: IProcessorAdapterState) => state.processorAdapterEdit,
);
