export interface IDestinationRouterList {
  id?: number;
  name?: string;
  routeDesc: string;
  routeName: string;
  routetype: string;
  routingVersion: IDestinationRoutingVersion;
  ruleActive: boolean;
  routetypevalue: any;
}

export interface IDestinationRoutingVersion {
  id: number;
  version: number;
  live: boolean;
  configuredRoutes: any;
  selectedRuleList: ISelectRouteList[];
}

export interface ISelectRouteList {
  name: string;
  description: string;
  priority: string | number;
  version: string | number;
}

export interface IService {
  name: string;
  id?: number | string;
}
