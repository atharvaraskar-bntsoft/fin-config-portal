import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterService } from '@app/services/router.service';
import {
  ERoutersAction,
  GetRuters,
  GetRutersSucess,
  GetServiceTypeSucess,
  GetRuleSucess,
  GetServiceType,
  GetRuleList,
  SaveRuleSucess,
  SaveRuleList,
  UpdateRuleSucess,
  GetRuleById,
  GetRuleByIdSuccess,
  UpdateRuleList,
  CommitRuleList,
  DeleteRouteById,
  DeleteRouteByIdSuccess,
  UpdRouter,
  UpdRouterSuccess,
  AddRuleListSucess,
  GetRuleCondition,
  GetRuleConditionSucess,
} from '../actions/router.actions';
import { AlertService } from '@app/services/alert.service';

@Injectable()
export class RouterEffects {
  
  GeRouterEffects$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuters>(ERoutersAction.GetRuters),
    switchMap(payload => this._routerService.getRouterList(payload)),
    switchMap((response: any) => {
      return of(new GetRutersSucess(response.data));
    }),
  ));

  
  GetServiceType$ = createEffect(() => this._actions$.pipe(
    ofType<GetServiceType>(ERoutersAction.GetServiceType),
    switchMap(router => this._routerService.getServiceList(router)),
    switchMap((response: any) => {
      return of(new GetServiceTypeSucess(response.data));
    }),
  ));

  
  GetRuleList$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleList>(ERoutersAction.GetRuleList),
    switchMap(router => this._routerService.getruleListList(router)),
    switchMap((response: any) => {
      return of(new GetRuleSucess(response.data.ruleList));
    }),
  ));

  
  SaveRuleList$ = createEffect(() => this._actions$.pipe(
    ofType<SaveRuleList>(ERoutersAction.SaveRuleList),
    switchMap(router => this._routerService.saveRuleListList(router)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new SaveRuleSucess(response));
    }),
  ));

  
  GetRuleById$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleById>(ERoutersAction.GetRuleById),
    switchMap(router => this._routerService.updateRuleList(router)),
    switchMap((response: any) => {
      return of(new GetRuleByIdSuccess(response.data.routingRule));
    }),
  ));
  
  UpdateRuleList$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateRuleList>(ERoutersAction.UpdateRuleList),
    switchMap(router => this._routerService.updateRuleList(router)),
    switchMap((response: any) => {
      return of(new UpdateRuleSucess(response.data.routingRule));
    }),
  ));

  
  CommitRuleList$ = createEffect(() => this._actions$.pipe(
    ofType<CommitRuleList>(ERoutersAction.CommitRuleList),
    switchMap(router => this._routerService.commitRuleList(router)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new SaveRuleSucess(response));
    }),
  ));

  
  DeleteRouteById$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteRouteById>(ERoutersAction.DeleteRouteById),
    switchMap(router => this._routerService.deleteRouteList(router)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DeleteRouteByIdSuccess(response));
    }),
  ));

  
  UpdRouter$ = createEffect(() => this._actions$.pipe(
    ofType<UpdRouter>(ERoutersAction.UpdRouter),
    switchMap(router => this._routerService.updRouterList(router)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new UpdRouterSuccess(response));
    }),
  ));

  
  AddRuleList$ = createEffect(() => this._actions$.pipe(
    ofType<SaveRuleList>(ERoutersAction.AddRuleList),
    switchMap(router => this._routerService.addRuleListList(router)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new AddRuleListSucess(response));
    }),
  ));
  
  GetRuleCondition$ = createEffect(() => this._actions$.pipe(
    ofType<GetRuleCondition>(ERoutersAction.GetRuleCondition),
    switchMap(() => this._routerService.getRuleCondition()),
    switchMap((response: any) => {
      return of(new GetRuleConditionSucess(response));
    }),
  ));
  constructor(
    private _routerService: RouterService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
