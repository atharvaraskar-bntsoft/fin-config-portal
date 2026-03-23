import {
    TxnKeyLableActions,
    ETxnKeyLableActions,
  } from '../actions/txn-key-lable.action';
  import {
    initialTxnKeyLableTypeState,
    ITxnKeyLableTypeState,
  } from '../state/txn-key-lable.state';
  
  export function TxnKeyLableReducers(
    state = initialTxnKeyLableTypeState,
    action: TxnKeyLableActions,
  ): ITxnKeyLableTypeState {
    switch (action.type) {   
      case ETxnKeyLableActions.GetTxnKeyLableTypeSuccess: {
        return {
          ...state,
          TxnKeyLableTypeGet: action.payload,
        };
      }
      case ETxnKeyLableActions.GetByIdTxnKeyLableTypeSuccess: {
        return {
          ...state,
          TxnKeyLableTypeGetById: action.payload,
        };
      }
      case ETxnKeyLableActions.DeleteTxnKeyLableTypeSuccess: {
        return {
          ...state,
          TxnKeyLableTypeDelete: action.payload,
        };
      }
      case ETxnKeyLableActions.PostTxnKeyLableTypeSuccess: {
        return {
          ...state,
          TxnKeyLableTypePost: action.payload,
        };
      }
      case ETxnKeyLableActions.UpdateTxnKeyLableTypeSuccess: {
        return {
          ...state,
          TxnKeyLableTypeUpdate: action.payload,
        };
      }
  
      case ETxnKeyLableActions.ClearState: {
        return {
          ...state,
          TxnKeyLableTypeGet: null,
          TxnKeyLableTypeGetById: null,
          TxnKeyLableTypePost: null,
          TxnKeyLableTypeUpdate: null,
          TxnKeyLableTypeDelete: null,
        };
      }
      default:
        return state;
    }
  }
  