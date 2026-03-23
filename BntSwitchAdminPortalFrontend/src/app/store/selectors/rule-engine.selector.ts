import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IRuleEngineState } from '../state/rule-engine.state';

const selectgetRuleItem = (state: IAppState) => state.ruleEngine;
const selectpostRule = (state: IAppState) => state.ruleEngine;
const selectputRule = (state: IAppState) => state.ruleEngine;

export const selectGetRuleItem = createSelector(
  selectgetRuleItem,
  (state: IRuleEngineState) => state.getRuleItem,
);

export const selectPostRule = createSelector(
  selectpostRule,
  (state: IRuleEngineState) => state.postRule,
);

export const selectPutRule = createSelector(
  selectputRule,
  (state: IRuleEngineState) => state.putRule,
);

export const selectGetRuleCondition = createSelector(
  selectputRule,
  (state: IRuleEngineState) => state.getRuleCondition,
);
