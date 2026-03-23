import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { EDekActions, GetDek, GetDekSuccess, PostDek, PostDekSuccess } from '../actions/dek.action';
import { DekService } from '@app/services/dek.service';

@Injectable()
export class DekEffects {
  constructor(
    private _dekService: DekService,
    private _action$: Actions,
    private alertService: AlertService,
  ) {}

  GetDek$ = createEffect(() =>
    this._action$.pipe(
      ofType<GetDek>(EDekActions.GetDek),
      switchMap(payload => this._dekService.getDek(payload)),
      switchMap((data: any) => {
        return of(new GetDekSuccess(data));
      }),
    ),
  );

  PostDek$ = createEffect(() =>
    this._action$.pipe(
      ofType<PostDek>(EDekActions.PostDek),
      switchMap(data => this._dekService.postDek(data.payload)),
      switchMap((data: any) => {
        this.alertService.responseMessage(data);
        return of(new PostDekSuccess(data));
      }),
    ),
  );
}
