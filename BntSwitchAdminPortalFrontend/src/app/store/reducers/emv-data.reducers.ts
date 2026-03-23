import { IEMVState, initialEMVState } from './../state/emv-data.state';
import {
  CreateEMVDataSuccess,
  GetEMVDataSuccess,
  EMVDataActions,
  EEMVDataActions,
} from './../actions/emv-data.action';

export function EMVDataReducers(state = initialEMVState, action: EMVDataActions): IEMVState {
  switch (action.type) {
    case EEMVDataActions.GetEMVTableSuccess: {
      return {
        ...state,
        emvDataList: action.payload,
      };
    }
    case EEMVDataActions.CheckUniqueNameSuccess: {
      console.log('data', action);
      return {
        ...state,
        isValidname: action.payload,
      };
    }

    case EEMVDataActions.CreateEMVDataSuccess: {
      return {
        ...state,
        createdData: action.payload,
      };
    }

    // case EELFunctionActions.ClearState: {
    //   return {
    //     ...state,
    //     getELFunction: null,
    //     getExeType: null,
    //     getFearture: null,
    //     getHint: null,
    //     getParaCount: null,
    //     postELFunction: null,
    //     validateELFunction: null,
    //   };
    // }
    default:
      return state;
  }
}
