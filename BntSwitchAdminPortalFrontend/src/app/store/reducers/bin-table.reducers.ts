import { GetBinTableAllSuccess } from './../actions/bin-table.action';
import { BinTableActions, EBinTableActions } from '../actions/bin-table.action';
import { IBinTableState, initialBinTableState } from '../state/bin-table.state';

export function BinTableReducers(
  state = initialBinTableState,
  action: BinTableActions,
): IBinTableState {
  switch (action.type) {
    case EBinTableActions.GetBinTableSuccess: {
      return {
        ...state,
        getBinTable: action.payload,
      };
    }

    case EBinTableActions.GetBinTableAllSuccess: {
      return {
        ...state,
        getBinTableAll: action.payload,
      };
    }

    case EBinTableActions.GetAccountTypeSuccess: {
      return {
        ...state,
        getAccountType: action.payload,
      };
    }
    case EBinTableActions.GetBinMasterSuccess: {
      return {
        ...state,
        getBinMaster: action.payload,
      };
    }

    case EBinTableActions.GetBinTableDataSuccess: {
      return {
        ...state,
        getBinTableData: action.payload,
      };
    }

    case EBinTableActions.GetBinMasterAllSuccess: {
      return {
        ...state,
        getBinMasterAll: action.payload,
      };
    }

    case EBinTableActions.GetBinTableDetailsSuccess: {
      return {
        ...state,
        getBinTableDetails: action.payload,
      };
    }

    case EBinTableActions.GetAccountTypeDetailsSuccess: {
      return {
        ...state,
        getAccountTypeDetails: action.payload,
      };
    }

    case EBinTableActions.UploadFileSuccess: {
      return {
        ...state,
        binUpload: action.payload,
      };
    }
    case EBinTableActions.ClearState: {
      return {
        ...state,
        getBinTable: null,
        getBinMaster: null,
        getBinTableDetails: null,
        getAccountTypeDetails: null,
      };
    }
    default:
      return state;
  }
}
