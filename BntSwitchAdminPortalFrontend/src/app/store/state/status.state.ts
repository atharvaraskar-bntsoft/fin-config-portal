import { StatusGetObject } from '@app/models/status.interface';

export interface IStatusState {
  status: StatusGetObject;
  statusResponse: StatusGetObject;
}

export const initialStatusState: IStatusState = {
  status: null,
  statusResponse: null,
};
