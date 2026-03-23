import { IFilter } from '@app/models/filter.interface';

export interface IFilterState {
  filterState: any;
}

export const initialFilterState: IFilterState = {
  filterState: null,
};
