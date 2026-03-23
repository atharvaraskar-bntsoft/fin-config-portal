export interface CheckerList {
  id: number;
  entityId: number;
  comment: string;
  status: string;
  data: string;
  entityType: string;
  createdOn: any;
  createdBy: string;
  updatedOn?: number;
  updatedBy: string;
}

export interface Data {
  'total-record': number;
  'page-no': number;
  checkerList: CheckerList[];
  'total-filtered-record': number;
}

export interface NotificationGetCall {
  status: string;
  message?: any;
  data: Data;
}
