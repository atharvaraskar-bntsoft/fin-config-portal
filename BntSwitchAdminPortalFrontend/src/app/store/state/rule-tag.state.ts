import { ITagsList } from '@app/routing/tag/tag';

export interface IRuleTagState {
  conditions: any;
  ruleTag: any;
  ruleTagPostResponse: any;
  ruleTagPutResponse: any;
  ruleTagDeleteResponse: any;
  ruleTagGetById: any;
  tags: any;
  imfList: any;
  operator: any;
  newRuleTags?: ITagsList[];
  createTag: any;
  editTag: any;
  updateTag: any;
}

export const initialIRuleTagState: IRuleTagState = {
  conditions: null,
  ruleTag: null,
  ruleTagDeleteResponse: null,
  ruleTagGetById: null,
  ruleTagPostResponse: null,
  ruleTagPutResponse: null,
  tags: null,
  operator: null,
  imfList: null,
  newRuleTags: [],
  createTag: null,
  editTag: null,
  updateTag: null,
};
