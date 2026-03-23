export interface IScheduled {
  name: string;
  scheduledOn: string;
  select?: boolean;
  id?: any;
  switchCluster?: any;
}

interface IDeploymentHistory {
  versionDeployed: number | null;
  deployedOn: number | null;
  message: string;
}

export interface IComponentDetails {
  componentType: string;
  componentName: string;
  currentVersion: number;
  deploymentHistory: IDeploymentHistory;
  lastModifiedOn: number;
  scheduledOn: number;
  lastModifiedBy: string;
  status: string;
  select?: boolean;
  idVersionListToSchedule: any;
  componentId?: any;
}

export interface IClusterDetail {
  key: string;
  id: number;
}

export interface IPropertiesDetail {
  corePropertiesName: string;
  id: number;
}

export interface IApiResponse {
  data: {
    result: IComponentDetails[] | IScheduled[];
  };
  status: string;
  message: string;
}

export interface ISwitchUser {
  id: number;
  key: string;
}

export interface ICreateDeployment {
  scheduledOn: Number;
  switchCluster: ISwitchUser;
  name?: string;
}
