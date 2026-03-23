import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IRouterState } from '../state/router.state';

const Routers = (state: IAppState) => state.routersList;
export const routers = createSelector(Routers, (state: IRouterState) => state.routerList);
export const routerServiceType = createSelector(
  Routers,
  (state: IRouterState) => state.serviceTypeList,
);
export const routerRuleList = createSelector(Routers, (state: IRouterState) => state.ruleList);
export const getRouterById = createSelector(Routers, (state: IRouterState) => state.getById);
export const updateRouter = createSelector(Routers, (state: IRouterState) => state.updatbyId);
export const commitRouter = createSelector(Routers, (state: IRouterState) => state.commitList);

export const commitRouterResponse = createSelector(
  Routers,
  (state: IRouterState) => state.routerResponse,
);
export const deleteRouterResponse = createSelector(
  Routers,
  (state: IRouterState) => state.routerResponse,
);

export const updRouterResponse = createSelector(Routers, (state: IRouterState) => state.updRouter);
export const addRouterResponse = createSelector(Routers, (state: IRouterState) => state.addRouter);
export const selectGetRuleCondition = createSelector(
  Routers,
  (state: IRouterState) => state.ruleConditionList,
);
