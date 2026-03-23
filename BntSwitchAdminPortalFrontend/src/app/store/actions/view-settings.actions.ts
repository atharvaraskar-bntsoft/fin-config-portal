import { Action } from '@ngrx/store';
import { ViewSettingGetObject, UpdateViewSettingObject } from '@app/models/view-settings.interface';

export enum EViewSettingsActions {
  GetViewSettings = '[ViewSettings] Get ViewSettings List',
  GetViewSettingsSuccess = '[ViewSettings] Get ViewSettings List Success',
  UpdateViewSettings = '[ViewSettings] Update View Settings',
  UpdateViewSettingsSuccess = '[ViewSettings] Update View Settings Success',
}
export class GetViewSettings implements Action {
  public readonly type = EViewSettingsActions.GetViewSettings;
}
export class GetViewSettingsSuccess implements Action {
  public readonly type = EViewSettingsActions.GetViewSettingsSuccess;
  constructor(public payload: ViewSettingGetObject) {}
}

export class UpdateViewSettings implements Action {
  public readonly type = EViewSettingsActions.UpdateViewSettings;
  constructor(public payload: any) {}
}

export class UpdateViewSettingsSuccess implements Action {
  public readonly type = EViewSettingsActions.UpdateViewSettingsSuccess;
  constructor(public payload: UpdateViewSettingObject) {}
}

export type ViewSettingsActions =
  | GetViewSettings
  | GetViewSettingsSuccess
  | UpdateViewSettings
  | UpdateViewSettingsSuccess;
