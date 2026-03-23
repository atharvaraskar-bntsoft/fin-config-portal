import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  EDestinationRulesActions,
  GetDestination,
  GetDestinationRules,
  GetDestinationRulesSuccess,
  GetDestinationSuccess,
  GetCondition,
  GetConditionSuccess,
  GetRuleType,
  GetRuleTypeSuccess,
  UpdRule,
  UpdRuleSuccess,
  ConfrimRule,
  ConfrimRuleSuccess,
  ConfrimRuleUpdateRule,
  ConfrimRuleUpdateRuleSuccess,
} from '../actions/destination-rules.action';

import { DestinationRulesService } from '@app/services/destination-rules.service';
import { AlertService } from '@app/services/alert.service';

@Injectable()
export class DestinationEffects {
  
  GetDestination$ = createEffect(() => this._actions$.pipe(
    ofType<GetDestination>(EDestinationRulesActions.GetDestination),
    switchMap(payload => this._destinationRulesService.getDestination(payload)),
    switchMap((data: any) => {
      return of(new GetDestinationSuccess(data.data));
    }),
  ));
  
  GetDestinationRules$ = createEffect(() => this._actions$.pipe(
    ofType<GetDestinationRules>(EDestinationRulesActions.GetDestinationRules),
    switchMap(payload => this._destinationRulesService.getDestinationRules(payload)),
    switchMap((data: any) => {
      return of(new GetDestinationRulesSuccess(data.data));
    }),
  ));
  
  GetCondition$ = createEffect(() => this._actions$.pipe(
    ofType<GetCondition>(EDestinationRulesActions.GetCondition),
    switchMap(() => this._destinationRulesService.getConditions()),
    switchMap((data: any) => {
      return of(new GetConditionSuccess(data.data));
    }),
  ));
  
  GetRuleType$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleType>(EDestinationRulesActions.GetRuleType),
    switchMap(() => this._destinationRulesService.getRuleType()),
    switchMap((data: any) => {
      return of(new GetRuleTypeSuccess(data.data));
    }),
  ));
  
  UpdRule$ = createEffect(() => this._actions$.pipe(
    ofType<UpdRule>(EDestinationRulesActions.UpdRule),
    switchMap(router => this._destinationRulesService.updRuleList(router)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new UpdRuleSuccess(response));
    }),
  ));
  
  ConfrimRule$ = createEffect(() => this._actions$.pipe(
    ofType<ConfrimRule>(EDestinationRulesActions.ConfrimRule),
    switchMap(data => this._destinationRulesService.confrimRule(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new ConfrimRuleSuccess(response));
    }),
  ));

  
  ConfrimRuleUpdateRule$ = createEffect(() => this._actions$.pipe(
    ofType<ConfrimRuleUpdateRule>(EDestinationRulesActions.ConfrimRuleUpdateRule),
    switchMap(data => this._destinationRulesService.confrimUpdateRule(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new ConfrimRuleUpdateRuleSuccess(response));
    }),
  ));
  constructor(
    private _destinationRulesService: DestinationRulesService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
