import { Action } from '@ngrx/store';
import { ITagsList } from '@app/routing/tag/tag';

export enum ERuleTagActions {
  GetRuleTag = '[Rule Tag] Get Rule Tag',
  GetRuleTagSuccess = '[Rule Tag] Get Rule Tag Success',
  GetRuleTagById = '[Rule Tag] Get Rule Tag By Id',
  GetRuleTagByIdSuccess = '[Rule Tag] Get Rule Tag By Id Success',
  DeleteRuleTag = '[Rule Tag] Delete Rule Tag',
  DeleteRuleTagSuccess = '[Rule Tag] Delete Rule Tag Success',
  PostRuleTag = '[Rule Tag] Post Rule Tag',
  PostRuleTagSuccess = '[Rule Tag] Post Rule Tag Success',
  UpdateRuleTag = '[Rule Tag] Update Rule Tag',
  UpdateRuleTagSuccess = '[Rule Tag] Update Rule Tag Success',
  GetTags = '[Rule Tag] Get Tags',
  GetTagsSuccess = '[Rule Tag] Get Tags Success',
  GetConditions = '[Rule Tag] Get Conditions',
  GetConditionsSuccess = '[Rule Tag] Get Conditions Success',
  GetOperatorTypeList = '[Rule Tag] Get OperatorList',
  GetOperatorTypeListSuccess = '[Rule Tag] Get OperatorList Success',
  GetImfMessageList = '[Rule Tag] Get ImfMessageList',
  GetImfMessageListSuccess = '[Rule Tag] Get ImfMessageList Success',
  ClearState = '[Rule Tag] Clear state',
  GetNewTags = '[New Tags] Get New Tags',
  GetNewTagSuccess = '[New Tags] Get New Tag Suceess',
  CreateTags = '[Create Tags] Create New Tags',
  CreateTagsSuccess = '[Create Tags] Create New Tag Suceess',
  EditTags = '[Edit Tags] Edit Tags',
  EditTagsSuccess = '[Edit Tags] Edit Tag Suceess',
  UpdateTags = '[Update Tags] Update Tags',
  UpdateTagsSuccess = '[Update Tags] Update Tag Suceess',
}

export class GetImfMessageList implements Action {
  public readonly type = ERuleTagActions.GetImfMessageList;
  constructor(public payload?: any) {}
}

export class GetImfMessageListSuccess implements Action {
  public readonly type = ERuleTagActions.GetImfMessageListSuccess;
  constructor(public payload: any) {}
}

export class GetOperatorTypeList implements Action {
  public readonly type = ERuleTagActions.GetOperatorTypeList;
  constructor(public payload?: any) {}
}

export class GetOperatorTypeListSuccess implements Action {
  public readonly type = ERuleTagActions.GetOperatorTypeListSuccess;
  constructor(public payload: any) {}
}

export class GetRuleTag implements Action {
  public readonly type = ERuleTagActions.GetRuleTag;
  constructor(public payload?: any) {}
}

export class GetRuleTagSuccess implements Action {
  public readonly type = ERuleTagActions.GetRuleTagSuccess;
  constructor(public payload: any) {}
}

export class GetRuleTagById implements Action {
  public readonly type = ERuleTagActions.GetRuleTagById;
}

export class GetRuleTagByIdSuccess implements Action {
  public readonly type = ERuleTagActions.GetRuleTagByIdSuccess;
  constructor(public payload?: any) {}
}

export class DeleteRuleTag implements Action {
  public readonly type = ERuleTagActions.DeleteRuleTag;
  constructor(public payload: any) {}
}
export class DeleteRuleTagSuccess implements Action {
  public readonly type = ERuleTagActions.DeleteRuleTagSuccess;
  constructor(public payload: any) {}
}

export class PostRuleTag implements Action {
  public readonly type = ERuleTagActions.PostRuleTag;
  constructor(public payload: any) {}
}

export class PostRuleTagSuccess implements Action {
  public readonly type = ERuleTagActions.PostRuleTagSuccess;
  constructor(public payload: any) {}
}

export class UpdateRuleTag implements Action {
  public readonly type = ERuleTagActions.UpdateRuleTag;
  constructor(public payload: any) {}
}

export class UpdateRuleTagSuccess implements Action {
  public readonly type = ERuleTagActions.UpdateRuleTagSuccess;
  constructor(public payload: any) {}
}

export class GetTags implements Action {
  public readonly type = ERuleTagActions.GetTags;
}

export class GetTagsSuccess implements Action {
  public readonly type = ERuleTagActions.GetTagsSuccess;
  constructor(public payload: any) {}
}

export class GetConditions implements Action {
  public readonly type = ERuleTagActions.GetConditions;
  constructor(public payload?: any) {}
}

export class GetConditionsSuccess implements Action {
  public readonly type = ERuleTagActions.GetConditionsSuccess;
  constructor(public payload: any) {}
}

export class GetNewTags implements Action {
  public readonly type = ERuleTagActions.GetNewTags;
  constructor(public payload: any) {}
}

export class GetNewTagSuccess implements Action {
  public readonly type = ERuleTagActions.GetNewTagSuccess;
  constructor(public payload: ITagsList[]) {}
}

export class CreateTags implements Action {
  public readonly type = ERuleTagActions.CreateTags;
  constructor(public payload: any) {}
}

export class CreateTagsSuccess implements Action {
  public readonly type = ERuleTagActions.CreateTagsSuccess;
  constructor(public payload: any) {}
}

export class EditTags implements Action {
  public readonly type = ERuleTagActions.EditTags;
  constructor(public payload: any) {}
}

export class EditTagsSuccess implements Action {
  public readonly type = ERuleTagActions.EditTagsSuccess;
  constructor(public payload: any) {}
}
export class UpdateTags implements Action {
  public readonly type = ERuleTagActions.UpdateTags;
  constructor(public payload: any) {}
}

export class UpdateTagsSuccess implements Action {
  public readonly type = ERuleTagActions.UpdateTagsSuccess;
  constructor(public payload: any) {}
}

export class ClearState implements Action {
  public readonly type = ERuleTagActions.ClearState;
}
export type RuleTagActions =
  | GetRuleTag
  | GetRuleTagSuccess
  | GetRuleTagById
  | GetRuleTagByIdSuccess
  | DeleteRuleTag
  | DeleteRuleTagSuccess
  | PostRuleTag
  | PostRuleTagSuccess
  | GetImfMessageList
  | GetImfMessageListSuccess
  | UpdateRuleTag
  | UpdateRuleTagSuccess
  | GetTags
  | GetTagsSuccess
  | GetConditions
  | GetConditionsSuccess
  | ClearState
  | GetOperatorTypeList
  | GetOperatorTypeListSuccess
  | GetNewTags
  | GetNewTagSuccess
  | CreateTags
  | CreateTagsSuccess
  | EditTagsSuccess
  | EditTags
  | UpdateTags
  | UpdateTagsSuccess;
