export interface GroupOptions {
  StartStop: boolean;
}

export interface MetaInfo {
  loggerLevelSet: string[];
  header: string;
  groupOptions: GroupOptions;
}

export interface HealthDataList {
  data: string[];
  metaInfo: MetaInfo;
}

export interface NodeStatusMap {
  UP: number;
  UNREACHABLE: number;
  PAUSE: number;
}

export interface Result {
  healthDataList: HealthDataList[];
  groupMetaInfo?: any;
  groupPerformanceMap: any;
  latencyTpsMap?: any;
  nodeStatusMap: NodeStatusMap;
}

export interface Data {
  result: Result;
}

export interface GetMonitoringRootObject {
  status: string;
  message: string;
  data: Data;
}
