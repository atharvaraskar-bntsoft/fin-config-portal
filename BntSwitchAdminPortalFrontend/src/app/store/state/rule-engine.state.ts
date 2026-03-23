export interface IRuleEngineState {
  getRuleCondition: any;
  getRuleItem: any;
  postRule: any;
  putRule: any;
}

export const initialRuleEngine: IRuleEngineState = {
  getRuleCondition: null,
  getRuleItem: null,
  postRule: null,
  putRule: null,
};
