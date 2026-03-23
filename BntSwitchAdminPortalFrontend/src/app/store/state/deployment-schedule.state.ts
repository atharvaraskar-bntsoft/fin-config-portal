import { IScheduled, IComponentDetails, IClusterDetail, IPropertiesDetail } from '@app/deployment/schedule/schedulte.interface';

export interface IDeploymentSchedule {
  currentScheduledData: IScheduled[];
  newlyDeployedData: IComponentDetails[];
  clusterList: IClusterDetail[];
  corePropertiesList: IPropertiesDetail[];
  editResponse: any;
}

export const initialDeploymentSchedule = {
  clusterList: [],
  corePropertiesList: [],
  currentScheduledData: [],
  newlyDeployedData: [],
  editResponse: {},
};
