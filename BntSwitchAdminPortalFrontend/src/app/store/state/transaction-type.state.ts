import {
  TransactionTypeGetObject,
  GetByIdObject,
  UpdateObject,
} from '@app/models/transaction-type.interface';

export interface ITransactionTypeState {
  transactionType: TransactionTypeGetObject;
  postTransactionType: UpdateObject;
  getByIdTransactionType: GetByIdObject;
}

export const initialITransactionTypeState: ITransactionTypeState = {
  getByIdTransactionType: null,
  postTransactionType: null,
  transactionType: null,
};
