export interface IBinTableState {
  getBinTable: any;
  getBinTableAll: any;
  getBinMaster: any;
  getBinTableDetails: any;
  getBinTableData: any;
  getBinMasterAll: any;
  binUpload: any;
  getAccountTypeDetails: any;
  getAccountType: any;
}

export const initialBinTableState: IBinTableState = {
  getBinTable: null,
  getBinTableAll: null,
  getBinMaster: null,
  getBinTableDetails: null,
  getBinTableData: null,
  getBinMasterAll: null,
  binUpload: null,
  getAccountTypeDetails: null,
  getAccountType: null,
};
