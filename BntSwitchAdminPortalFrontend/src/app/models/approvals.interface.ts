export interface IApprovals {
  comment: String;
  createdBy: String;
  createdOn: any;
  data: Object;
  entityType: String;
  id: any;
  status: String;
  updatedBy: any;
  updatedOn: any;
}
export interface IApprovalsResponse {
  data: any;
  status: String;
  message: String;
}
export interface ICountResponse {
  content: any;
  pageNo: number;
  totalFilterRecords: number;
  totalRecords: number;
}
