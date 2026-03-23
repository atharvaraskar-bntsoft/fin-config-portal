import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DeleteWorkflowGroup,
  DeleteWorkflowGroupSuccess,
  EWorkflows,
  GetPaymentMethod,
  GetPaymentMethodSuccess,
  GetWorkFlows,
  GetWorkFlowServices,
  GetWorkFlowServicesSuccess,
  GetWorkFlowsSuccess,
  PostPaymentMethod,
  PostPaymentMethodSuccess,
  DeleteWorkflowSuccess,
  DeleteWorkflow,
  AddWorkflow,
  AddWorkflowSuccess,
  EnableDisableWorkflowSuccess,
  GetLatestWorkFlowSuccess,
  GetLatestWorkFlowServiceSuccess,
  AddLatestWorkflowSuccess,
  GetSingleLatestWorkflowSuccess,
  PublishLatestWorkflowSuccess,
  GetReversalFieldsSuccess,
  GetReversalFields,
  IsValidWorkflowNameSuccess,
  IsValidWorkflowName,
} from '../actions/workflows.actions';
import { switchMap } from 'rxjs/operators';
import { WorkflowService } from '../../services/workflow.service';
import { of } from 'rxjs';
import { AlertService } from '@app/services/alert.service';

@Injectable()
export class WorkflowEffects {
  
  GetWorkflowEffects$ = createEffect(() => this._actions$.pipe(
    ofType<GetWorkFlows>(EWorkflows.GetWorkFlows),
    switchMap(payload => this._workflowService.getWorkflows(payload)),
    switchMap((response: any) => {
      return of(new GetWorkFlowsSuccess(response));
    }),
  ));

  
  AddLatestWorkflow$ = createEffect(() => this._actions$.pipe(
    ofType<GetWorkFlows>(EWorkflows.AddLatestWorkflow),
    switchMap(payload => this._workflowService.AddLatestWorkflow(payload.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new AddLatestWorkflowSuccess(response));
    }),
  ));

  
  PublishLatestWorkflow$ = createEffect(() => this._actions$.pipe(
    ofType<GetWorkFlows>(EWorkflows.PublishLatestWorkflow),
    switchMap(payload => this._workflowService.PublishLatestWorkflow(payload.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PublishLatestWorkflowSuccess(response));
    }),
  ));

  
  GetSingleLatestWorkflow$ = createEffect(() => this._actions$.pipe(
    ofType<GetWorkFlows>(EWorkflows.GetSingleLatestWorkflow),
    switchMap(payload => this._workflowService.SingleLatestWorkflow(payload.payload)),
    switchMap((response: any) => {
      return of(new GetSingleLatestWorkflowSuccess(response));
    }),
  ));

  
  GetLatestWorkFlowService$ = createEffect(() => this._actions$.pipe(
    ofType<GetWorkFlows>(EWorkflows.GetLatestWorkFlowService),
    switchMap(payload => this._workflowService.getLatestWorkflowService()),
    switchMap((response: any) => {
      return of(new GetLatestWorkFlowServiceSuccess(response));
    }),
  ));

  
  GetLatestWorkFlows$ = createEffect(() => this._actions$.pipe(
    ofType<GetWorkFlows>(EWorkflows.GetLatestWorkFlows),
    switchMap(payload => this._workflowService.getLatestWorkflows(payload)),
    switchMap((response: any) => {
      return of(new GetLatestWorkFlowSuccess(response));
    }),
  ));

  
  GetPaymentMethod$ = createEffect(() => this._actions$.pipe(
    ofType<GetPaymentMethod>(EWorkflows.GetPaymentMethod),
    switchMap(() => this._workflowService.getPaymentMethod()),
    switchMap((response: any) => {
      return of(new GetPaymentMethodSuccess(response));
    }),
  ));

  
  PostPaymentMethod$ = createEffect(() => this._actions$.pipe(
    ofType<PostPaymentMethod>(EWorkflows.PostPaymentMethod),
    switchMap(data => this._workflowService.postPaymentMethod(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PostPaymentMethodSuccess(response));
    }),
  ));

  
  DeleteWorkflowGroup$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteWorkflowGroup>(EWorkflows.DeleteWorkflowGroup),
    switchMap(data => this._workflowService.deleteWorkflowGroup(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);

      return of(new DeleteWorkflowGroupSuccess(response));
    }),
  ));

  
  GetWorkflowService$ = createEffect(() => this._actions$.pipe(
    ofType<GetWorkFlowServices>(EWorkflows.GetWorkFlowServices),
    switchMap(() => this._workflowService.getServiceList()),
    switchMap((response: any) => {
      return of(new GetWorkFlowServicesSuccess(response));
    }),
  ));

  
  DeleteWorkflow$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteWorkflow>(EWorkflows.DeleteWorkflow),
    switchMap(data => this._workflowService.deleteWorkflow(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);

      return of(new DeleteWorkflowSuccess(response));
    }),
  ));

  
  AddWorkflow$ = createEffect(() => this._actions$.pipe(
    ofType<AddWorkflow>(EWorkflows.AddWorkflow),
    switchMap(data => this._workflowService.AddWorkflow(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);

      return of(new AddWorkflowSuccess(response));
    }),
  ));

  
  EnableDisableWorkflow$ = createEffect(() => this._actions$.pipe(
    ofType<AddWorkflow>(EWorkflows.EnableDisableWorkflow),
    switchMap(data => this._workflowService.AddWorkflow(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);

      return of(new EnableDisableWorkflowSuccess(response));
    }),
  ));

  
  MakeAsDefault$ = createEffect(() => this._actions$.pipe(
    ofType<AddWorkflow>(EWorkflows.MakeAsDefaultWorkflow),
    switchMap(data => this._workflowService.makeAsDefault(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);

      return of(new EnableDisableWorkflowSuccess(response));
    }),
  ));

  
  GetReversalFields$ = createEffect(() => this._actions$.pipe(
    ofType<GetReversalFields>(EWorkflows.GetReversalFields),
    switchMap(_ => this._workflowService.getReversalDropDown()),
    switchMap(res => {
      return of(new GetReversalFieldsSuccess(res));
    }),
  ));

  
  IsValidWorkflowName$ = createEffect(() => this._actions$.pipe(
    ofType<IsValidWorkflowName>(EWorkflows.IsValidWorkflowName),
    switchMap(payload => this._workflowService.isNameValid(payload.payload)),
    switchMap(res => {
      return of(new IsValidWorkflowNameSuccess(res));
    }),
  ));
  constructor(
    private _workflowService: WorkflowService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
