import { IAppState } from '@app/store/state/app.state';
import { IMasterConfiguration } from './../state/master-configuration.state';
import { createSelector } from '@ngrx/store';
import { state } from '@angular/animations';

const masterConfigurationSelector = (state: IAppState) => state.masterConfiguration;

export const configurationMasterList = createSelector(
  masterConfigurationSelector,
  state => state && state.masterConfigurationList,
);

export const configurationUpdated = createSelector(
  masterConfigurationSelector,
  state => state && state.masterUpdated,
);
