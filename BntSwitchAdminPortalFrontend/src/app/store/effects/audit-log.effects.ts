import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { EAuditLogActions, GetAuditLogs, GetAuditLogsSuccess } from '../actions/audit-log.action';

import { AuditLogService } from '../../services/audit-log.service';
import { AuditLogGetObject } from '@app/models/audit-log.interface';

@Injectable()
export class AuditLogEffects {
  
  GetAuditLogs$ = createEffect(() => this._actions$.pipe(
    ofType<GetAuditLogs>(EAuditLogActions.GetAuditLogs),
    switchMap(payload => this._auditLogService.getLogs(payload)),
    switchMap((data: AuditLogGetObject) => {
      return of(new GetAuditLogsSuccess(data));
    }),
  ));

  constructor(private _auditLogService: AuditLogService, private _actions$: Actions) {}
}
