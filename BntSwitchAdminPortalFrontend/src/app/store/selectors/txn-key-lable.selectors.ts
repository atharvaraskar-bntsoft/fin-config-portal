import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ITxnKeyLableTypeState } from '../state/txn-key-lable.state';

export const selectTxnKeyLableType = (state: IAppState) => state.TxnKeyLable;

export const selectTxnKeyLableTypeListGet = createSelector(   
  selectTxnKeyLableType,
  (state: ITxnKeyLableTypeState) => state.TxnKeyLableTypeGet,
);
export const selectTxnKeyLableTypeListGetById = createSelector(   
  selectTxnKeyLableType,
  (state: ITxnKeyLableTypeState) => state.TxnKeyLableTypeGetById,
);
export const selectTxnKeyLableTypeDelete = createSelector(
  selectTxnKeyLableType,
  (state: ITxnKeyLableTypeState) => state.TxnKeyLableTypeDelete,
);
export const selectTxnKeyLableTypePost = createSelector(
  selectTxnKeyLableType,
  (state: ITxnKeyLableTypeState) => state.TxnKeyLableTypePost,
);
export const selectTxnKeyLableTypeUpdate = createSelector(
  selectTxnKeyLableType,
  (state: ITxnKeyLableTypeState) => state.TxnKeyLableTypeUpdate,
);

