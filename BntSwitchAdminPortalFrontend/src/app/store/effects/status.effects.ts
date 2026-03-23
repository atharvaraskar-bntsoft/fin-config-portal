import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StatusService } from '@app/services/status.service';
import { GetStatus, EStatusActions, GetStatusSuccess } from '../actions/status.action';
import { StatusGetObject } from '@app/models/status.interface';

@Injectable()
export class StatusEffects {
  
  GetStatus$ = createEffect(() => this._actions$.pipe(
    ofType<GetStatus>(EStatusActions.GetStatus),
    switchMap(() => this._statusService.getStatus()),
    switchMap((data: StatusGetObject) => {
      return of(new GetStatusSuccess(data));
    }),
  ));

  constructor(private _statusService: StatusService, private _actions$: Actions) {}
}
