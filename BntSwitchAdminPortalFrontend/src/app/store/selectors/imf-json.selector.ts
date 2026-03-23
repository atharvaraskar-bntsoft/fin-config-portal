import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IImfJsonState } from '../state/imf-json.state';
const selectImfJson = (state: IAppState) => state.imfjson;

export const selectImfJsonVersions = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.getVersions,
);

export const getImfByIdJsonVersions = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.getImfById,
);

export const postImfJsonVersions = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.postJson,
);

export const putImfJsonVersions = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.putJson,
);

export const DeleteImfJsonSuccess = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.response,
);

export const GetImfTypeListJsonSuccess = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.typeList,
);

export const latestImfJsonVersions = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.latestJson,
);
export const getIfmList = createSelector(selectImfJson, (state: IImfJsonState) => state.getImf);
export const selectTemplateJson = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.getTemplateJson,
);
export const selectTemplateDetailsJson = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.getTemplateDetailsJson,
);
export const selectNormalViewJson = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.normalViewJson,
);
export const selectImfById = createSelector(
  selectImfJson,
  (state: IImfJsonState) => state.getImfById,
);
