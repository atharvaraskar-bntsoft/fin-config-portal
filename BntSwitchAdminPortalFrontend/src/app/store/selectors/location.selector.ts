import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ILocationState } from '../state/location.state';

const selectLocations = (state: IAppState) => state.Location;

export const selectLocation = createSelector(
  selectLocations,
  (state: ILocationState) => state.Location,
);
export const selectLocationResponse = createSelector(
  selectLocations,
  (state: ILocationState) => state.locationResponse,
);

export const selectLocationDetail = createSelector(
  selectLocations,
  (state: ILocationState) => state.LocationDetail,
);
