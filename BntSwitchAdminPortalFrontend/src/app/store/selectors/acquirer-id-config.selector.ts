import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IAcquirerState } from '../state/aquirer.state';
import { IAcquirerIdConfigState } from '../state/aquirer-id-config.state';

const selectAcquirerIdConfigData = (state: IAppState) => state.acquirerIdConfig;

export const selectAcquirerIdConfig = createSelector(
  selectAcquirerIdConfigData,
  (state: IAcquirerIdConfigState) => state.acquirerIdConfig,
);

export const selectAcquirerIdConfigDetails = createSelector(
  selectAcquirerIdConfigData,
  (state: IAcquirerIdConfigState) => state.acquirerIdConfigDetails,
);

export const selectAcquirerIdFlag = createSelector(
  selectAcquirerIdConfigData,
  (state: IAcquirerIdConfigState) => state.acquireIdFlag,
);
