import { initialNotificationsState, INotificationsState } from '../state/notifications.state';
import { NotificationsActions, ENotificationsActions } from '../actions/notifications.actions';

export function NotificationsReducers(
  state = initialNotificationsState,
  action: NotificationsActions,
): INotificationsState {
  switch (action.type) {
    case ENotificationsActions.GetAlertsSuccess: {
      return {
        ...state,
        alerts: action.payload,
      };
    }

    case ENotificationsActions.GetNotificationsSuccess: {
      return {
        ...state,
        notifications: action.payload,
      };
    }

    default:
      return state;
  }
}
