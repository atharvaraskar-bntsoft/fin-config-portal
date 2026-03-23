import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { INetworkResponseState } from '../state/network-response.state';

const selectNetResponse = (state: IAppState) => state.networkResponse;

export const selectNetworkResponse = createSelector(
  selectNetResponse,
  (state: INetworkResponseState) => state.networkResponse,
);
