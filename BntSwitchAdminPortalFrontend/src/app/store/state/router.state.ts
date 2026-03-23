import { IrouterResponse } from '@app/models/router.interface';

export interface IRouterState {
  routerList: [];
  routerResponse: IrouterResponse[];
  serviceTypeList: [];
  ruleList: [];
  saveRule: any;
  getById: any;
  updatbyId: any;
  commitList: any;
  updRouter: any;
  addRouter: any;
  ruleConditionList: any;
}
export const initialRouterState: IRouterState = {
  addRouter: null,
  commitList: null,
  getById: null,
  routerList: null,
  routerResponse: null,
  ruleConditionList: null,
  ruleList: null,
  saveRule: null,
  serviceTypeList: null,
  updRouter: null,
  updatbyId: null,
};
