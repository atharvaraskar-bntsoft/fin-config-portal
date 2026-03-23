import { initialApprovalsState, IApprovalsState } from '../state/approvals.state';
import { ApprovalsActions, EApprovalsActions } from '../actions/approvals.actions';
import { initialNotificationsState, INotificationsState } from '../state/notifications.state';
import { NotificationsActions, ENotificationsActions } from '../actions/notifications.actions';
import { initialViewSettingsState, IViewSettingsState } from '../state/viewsettings.state';
import { ViewSettingsActions, EViewSettingsActions } from '../actions/view-settings.actions';

export function ViewSettingsReducers(
  state = initialViewSettingsState,
  action: ViewSettingsActions,
): IViewSettingsState {
  switch (action.type) {
    case EViewSettingsActions.GetViewSettingsSuccess: {
      return {
        ...state,
        viewsettings: action.payload,
      };
    }

    case EViewSettingsActions.UpdateViewSettingsSuccess: {
      return {
        ...state,
        viewsettingsResponse: action.payload,
      };
    }

    default:
      return state;
  }
}
