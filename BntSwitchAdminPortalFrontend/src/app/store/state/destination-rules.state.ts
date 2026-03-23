export interface IDestinationRulesState {
  destination: [];
  destinationCondition: [];
  destinationRuleTypes: [];
  destinationRules: [];
  selectDestinationCondition: any;
  selectDestinationRuleTypes: any;
  selectDestinationRules: any;
  selectedDestination: any;
  updRule: any;
  confrimUpdateRuleResponse: any;
  confrimRuleResponse: any;
}

export const initialDestinationRulesState: IDestinationRulesState = {
  confrimRuleResponse: null,
  confrimUpdateRuleResponse: null,
  destination: null,
  destinationCondition: null,
  destinationRuleTypes: null,
  destinationRules: null,
  selectDestinationCondition: null,
  selectDestinationRuleTypes: null,
  selectDestinationRules: null,
  selectedDestination: null,
  updRule: null,
};
