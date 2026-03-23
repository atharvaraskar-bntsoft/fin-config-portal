import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IInstitutionGroupState } from '../state/institution-group.state';

const selectGroupList = (state: IAppState) => state.institutionGroups;
const detailsInstitutionGroup = (state: IAppState) => state.institutionGroupDetails;
export const selectInstitutionGroup = createSelector(
  selectGroupList,
  (state: IInstitutionGroupState) => state.institutionGroups,
);
export const selectInstitutionGroupList = createSelector(
  selectGroupList,
  (state: IInstitutionGroupState) => state.institutionList,
);
export const selectGroupResponseSuccess = createSelector(
  selectGroupList,
  (state: IInstitutionGroupState) => state.institutionGroupResponse,
);
export const selectInstitutionGroupDetails = createSelector(
  detailsInstitutionGroup,
  (state: IInstitutionGroupState) => state.institutionGroupDetails,
);
export const selectGroupResponseJsonSuccess = createSelector(
  selectGroupList,
  (state: IInstitutionGroupState) => state.institutionGroupResponseSucess,
);
