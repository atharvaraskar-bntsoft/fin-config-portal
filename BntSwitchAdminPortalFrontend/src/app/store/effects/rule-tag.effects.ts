import { ITagsList } from './../../routing/tag/tag.d';
import { GetNewTags, GetNewTagSuccess } from './../actions/rule-tag.action';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import { RuleTagService } from '@app/services/rule-tag.service';
import {
  ERuleTagActions,
  GetRuleTag,
  GetRuleTagSuccess,
  GetTags,
  GetTagsSuccess,
  DeleteRuleTag,
  DeleteRuleTagSuccess,
  GetRuleTagById,
  UpdateRuleTag,
  UpdateRuleTagSuccess,
  GetRuleTagByIdSuccess,
  PostRuleTag,
  PostRuleTagSuccess,
  GetConditions,
  GetConditionsSuccess,
  GetOperatorTypeListSuccess,
  GetImfMessageListSuccess,
  EditTags,
  EditTagsSuccess,
  CreateTags,
  CreateTagsSuccess,
  UpdateTags,
  UpdateTagsSuccess,
} from '../actions/rule-tag.action';

@Injectable()
export class RuleTagEffects {
  
  GetOperatorTypeList$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleTag>(ERuleTagActions.GetOperatorTypeList),
    switchMap(payload => this._ruleTagService.getOperatorList()),
    switchMap((response: any) => {
      return of(new GetOperatorTypeListSuccess(response.data));
    }),
  ));

  
  GetImfMessageList$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleTag>(ERuleTagActions.GetImfMessageList),
    switchMap(payload => this._ruleTagService.getImfMessageList()),
    switchMap((response: any) => {
      return of(new GetImfMessageListSuccess(response.data));
    }),
  ));

  
  GetRuleTag$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleTag>(ERuleTagActions.GetRuleTag),
    switchMap(payload => this._ruleTagService.getRuleTagList(payload)),
    switchMap((response: any) => {
      return of(new GetRuleTagSuccess(response.data));
    }),
  ));

  
  PostRuleTag$ = createEffect(() => this._actions$.pipe(
    ofType<PostRuleTag>(ERuleTagActions.PostRuleTag),
    switchMap(data => this._ruleTagService.postRuleTag(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PostRuleTagSuccess(response));
    }),
  ));

  
  GetTags$ = createEffect(() => this._actions$.pipe(
    ofType<GetTags>(ERuleTagActions.GetTags),
    switchMap(() => this._ruleTagService.getTags()),
    switchMap((response: any) => {
      return of(new GetTagsSuccess(response));
    }),
  ));
  
  DeleteRuleTag$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteRuleTag>(ERuleTagActions.DeleteRuleTag),
    switchMap(data => this._ruleTagService.deleteRuleTag(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DeleteRuleTagSuccess(response));
    }),
  ));

  
  GetRuleTagById$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleTagById>(ERuleTagActions.GetRuleTagById),
    switchMap(data => this._ruleTagService.getRuleTagId(data)),
    switchMap((response: any) => {
      return of(new GetRuleTagByIdSuccess(response));
    }),
  ));

  
  GetConditions$ = createEffect(() => this._actions$.pipe(
    ofType<GetConditions>(ERuleTagActions.GetConditions),
    switchMap(() => this._ruleTagService.getConditions()),
    switchMap((response: any) => {
      return of(new GetConditionsSuccess(response));
    }),
  ));

  
  UpdateRuleTag$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateRuleTag>(ERuleTagActions.UpdateRuleTag),
    switchMap(data => this._ruleTagService.updateRuleTag(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new UpdateRuleTagSuccess(response));
    }),
  ));

  
  NewRuleTags$ = createEffect(() => this._actions$.pipe(
    ofType<GetNewTags>(ERuleTagActions.GetNewTags),
    switchMap(payload => this._ruleTagService.getNewTags(payload)),
    switchMap(response => {
      return of(new GetNewTagSuccess(response.data));
    }),
  ));
  
  EditTags$ = createEffect(() => this._actions$.pipe(
    ofType<EditTags>(ERuleTagActions.EditTags),
    switchMap(data => this._ruleTagService.editTagId(data.payload)),
    switchMap((response: any) => {
      return of(new EditTagsSuccess(response));
    }),
  ));
  
  CreateTags$ = createEffect(() => this._actions$.pipe(
    ofType<CreateTags>(ERuleTagActions.CreateTags),
    switchMap(data => this._ruleTagService.createTag(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new CreateTagsSuccess(response));
    }),
  ));
  
  UpdateTag$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateTags>(ERuleTagActions.UpdateTags),
    switchMap(data => this._ruleTagService.updateTag(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new UpdateTagsSuccess(response));
    }),
  ));
  constructor(
    private _ruleTagService: RuleTagService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
