import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IAcquirerState } from '../state/aquirer.state';

const selectInstitutionAcquirer = (state: IAppState) => state.acquirer;

export const selectAcquirer = createSelector(
  selectInstitutionAcquirer,
  (state: IAcquirerState) => state.acquirer,
);

export const selectInstitutionAcquirerProcessor = createSelector(
  selectInstitutionAcquirer,
  (state: IAcquirerState) => state.InstitutionAcquirerProcessorList,
);

export const selectInstitutionAcquirerResponse = createSelector(
  selectInstitutionAcquirer,
  (state: IAcquirerState) => state.acquirerResponse,
);
export const selectAcquirerRowData = createSelector(
  selectInstitutionAcquirer,
  (state: IAcquirerState) => state.acquirerRowData,
);
