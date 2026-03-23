import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RulesService } from '@app/services/rule.service';
import { AlertService } from '@app/services/alert.service';

import {
  GetRuleItemSuccess,
  PostRule,
  PostRuleSuccess,
  PutRule,
  PutRuleSuccess,
  GetRuleCondition,
  GetRuleConditionSuccess,
} from '../actions/rule-engine.actions';
import { ERuleEngineActions, GetRuleItem } from '../actions/rule-engine.actions';

@Injectable()
export class RuleEngineEffects {
  
  GetRuleItem$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleItem>(ERuleEngineActions.GetRuleItem),
    switchMap(id => this._rulesService.getRuleItem(id)),
    switchMap((data: any) => {
      return of(new GetRuleItemSuccess(data));
    }),
  ));

  
  GetRuleCondition$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleCondition>(ERuleEngineActions.GetRuleCondition),
    switchMap(id => this._rulesService.getRuleCondition(id)),
    switchMap((data: any) => {
      return of(new GetRuleConditionSuccess(data));
    }),
  ));

  
  PostRule$ = createEffect(() => this._actions$.pipe(
    ofType<PostRule>(ERuleEngineActions.PostRule),
    switchMap(data => this._rulesService.postRule(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PostRuleSuccess(response));
    }),
  ));

  
  PutRule$ = createEffect(() => this._actions$.pipe(
    ofType<PutRule>(ERuleEngineActions.PutRule),
    switchMap(data => this._rulesService.putRule(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PutRuleSuccess(response));
    }),
  ));
  constructor(
    private _rulesService: RulesService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
