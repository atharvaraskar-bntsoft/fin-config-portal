import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IDestinationRulesState } from '../state/destination-rules.state';

const selectDestination = (state: IAppState) => state.destination;

export const selectDestinations = createSelector(
  selectDestination,
  (state: IDestinationRulesState) => state.destination,
);
export const selectDestinationRules = createSelector(
  selectDestination,
  (state: IDestinationRulesState) => state.destinationRules,
);
export const selectDestinationCondition = createSelector(
  selectDestination,
  (state: IDestinationRulesState) => state.destinationCondition,
);
export const selectDestinationRuleTypes = createSelector(
  selectDestination,
  (state: IDestinationRulesState) => state.destinationRuleTypes,
);
export const updRuleResponse = createSelector(
  selectDestination,
  (state: IDestinationRulesState) => state.updRule,
);
export const confrimRuleResponse = createSelector(
  selectDestination,
  (state: IDestinationRulesState) => state.confrimRuleResponse,
);
export const confrimUpdateRuleResponse = createSelector(
  selectDestination,
  (state: IDestinationRulesState) => state.confrimUpdateRuleResponse,
);
