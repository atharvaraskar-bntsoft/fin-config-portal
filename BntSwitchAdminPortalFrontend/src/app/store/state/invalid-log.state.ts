export interface IInvalidLogState {
  safProcessorList: any;
  invalidlogs: any;
  safQueueList: [];
  selectedInvalidLog: any;
  moveToSafQueueFromExceptional: any;
  exceptionalQueueList: any;
  safStatusDDL: any;
  deleteMultiple: any;
  deleteSAFQueue: any;
}

export const initialInvalidLogState: IInvalidLogState = {
  invalidlogs: null,
  selectedInvalidLog: null,
  safQueueList: null,
  safProcessorList: null,
  moveToSafQueueFromExceptional: null,
  exceptionalQueueList: null,
  deleteMultiple: null,
  deleteSAFQueue: null,
  safStatusDDL: null,
};
