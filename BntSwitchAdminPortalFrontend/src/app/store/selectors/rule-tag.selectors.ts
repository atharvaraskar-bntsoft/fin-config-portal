import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IRuleTagState } from '../state/rule-tag.state';

export const selectRuleTag = (state: IAppState) => state.ruleTag;

export const selectRuleTagList = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.tags,
);

export const selectRuleTagGetById = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.ruleTagGetById,
);

export const selectRuleTagPost = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.ruleTagPostResponse,
);

export const selectRuleTagPut = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.ruleTagPutResponse,
);

export const selectRuleTagDelete = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.ruleTagDeleteResponse,
);

export const selectTags = createSelector(selectRuleTag, (state: IRuleTagState) => state.tags);

export const selectConditions = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.conditions,
);

export const selectOperators = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.operator,
);

export const selectimfList = createSelector(selectRuleTag, (state: IRuleTagState) => state.imfList);

export const selectNewTagList = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.newRuleTags,
);
export const createTagList = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.createTag,
);
export const editTagList = createSelector(selectRuleTag, (state: IRuleTagState) => state.editTag);
export const updateTagList = createSelector(
  selectRuleTag,
  (state: IRuleTagState) => state.updateTag,
);
