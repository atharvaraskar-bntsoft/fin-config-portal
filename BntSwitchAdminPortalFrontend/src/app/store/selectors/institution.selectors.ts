import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IInstitutionState } from '../state/institution.state';

const selectInstitutions = (state: IAppState) => state.Institution;

export const selectInstitution = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.Institution,
);

export const selectInstitutionResponse = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.institutionResponse,
);

export const selectInstitutionGroupList = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.institutionGroupList,
);
export const selectInstitutionDetail = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.InstitutionDetail,
);
export const selectInstitutionService = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.InstitutionService,
);
export const selectCategoryCode = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.CategoryCode,
);
export const selectCurrency = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.Currency,
);
export const selectInstitutionAdditionalService = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.InstitutionAdditionalService,
);
export const selectInstitutionRowData = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.institutionRowData,
);
export const selectCountryLists = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.countryList,
);

export const selectStateLists = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.stateList,
);
export const selectInstitutionList = createSelector(
  selectInstitutions,
  (state: IInstitutionState) => state.institutionGroupList,
);
