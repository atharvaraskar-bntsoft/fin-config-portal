export interface DbDetailList {
  property: string;
  value: string;
}

export interface JvmDetailList {
  property: string;
  value: string;
}

export interface Data {
  monitoringCoreDetail: string[];
  dbDetailList: DbDetailList[];
  versionDetail: string[];
  jvmDetailList: JvmDetailList[];
  tabbleList: string[];
  listInfoUrl: string[];
  monitoringHazlecastDetail: string[];
  serverPortList: string[];
}

export interface StatusGetObject {
  status: string;
  message: string;
  data: Data;
}
