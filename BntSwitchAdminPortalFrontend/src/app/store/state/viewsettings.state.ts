import { ViewSettingGetObject, UpdateViewSettingObject } from '@app/models/view-settings.interface';

export interface IViewSettingsState {
  viewsettings: ViewSettingGetObject;
  viewsettingsResponse: UpdateViewSettingObject;
}

export const initialViewSettingsState: IViewSettingsState = {
  viewsettings: null,
  viewsettingsResponse: null,
};
