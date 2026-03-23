import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  EApprovalsActions,
  GetApprovalCount,
  GetApprovalCountSuccess,
  GetApprovals,
  GetApprovalsSuccess,
  PostApprovals,
  PostApprovalsSuccess,
} from '../actions/approvals.actions';
import { ApprovalsService } from '../../services/approvals.service';

@Injectable()
export class ApprovalsEffects {
  
  GetApprovals$ = createEffect(() => this._actions$.pipe(
    ofType<GetApprovals>(EApprovalsActions.GetApprovals),
    switchMap(payload => this._approvalsService.getApprovals(payload)),
    switchMap((data: any) => {
      return of(new GetApprovalsSuccess(data.data));
    }),
  ));

  
  GetApprovalCount$ = createEffect(() => this._actions$.pipe(
    ofType<GetApprovalCount>(EApprovalsActions.GetApprovalCount),
    switchMap(payload => this._approvalsService.getApprovalCount()),
    switchMap((data: any) => {
      return of(new GetApprovalCountSuccess(data));
    }),
  ));

  
  PostApprovals$ = createEffect(() => this._actions$.pipe(
    ofType<PostApprovals>(EApprovalsActions.PostApprovals),
    switchMap(data => this._approvalsService.postApprovals(data.payload)),
    switchMap((response: any) => {
      return of(new PostApprovalsSuccess(response));
    }),
  ));

  constructor(private _approvalsService: ApprovalsService, private _actions$: Actions) {}
}
