import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IViewSettingsState } from '../state/viewsettings.state';

const selectViewSettings = (state: IAppState) => state.viewsettings;
const selectViewSettingsSuccess = (state: IAppState) => state.viewsettings;

export const selectViewSettingsList = createSelector(
  selectViewSettings,
  (state: IViewSettingsState) => state.viewsettings,
);

export const selectViewSettingsSucces = createSelector(
  selectViewSettingsSuccess,
  (state: IViewSettingsState) => state.viewsettingsResponse,
);
