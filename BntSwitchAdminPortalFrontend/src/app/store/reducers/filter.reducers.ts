import { EFilterActions, FilterActions } from '@app/store/actions/filter.actions';
import { IFilterState, initialFilterState } from '@app/store/state/filter.state';

export function FilterReducers(state = initialFilterState, action: FilterActions): IFilterState {
  switch (action.type) {
    case EFilterActions.GetFilterDataSuccess: {
      return {
        ...state,
        filterState: action.payload,
      };
    }
    case EFilterActions.ClearFilterData: {
      return {
        ...state,
        filterState: null,
      };
    }
    default:
      return state;
  }
}
