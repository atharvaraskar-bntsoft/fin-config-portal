import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FilterService } from '@app/services/filter.service';
import {
  EFilterActions,
  GetFilterData,
  GetFilterDataSuccess,
} from '@app/store/actions/filter.actions';

@Injectable()
export class FilterEffects {
  
  GetFilterData$ = createEffect(() => this._actions$.pipe(
    ofType<GetFilterData>(EFilterActions.GetFilterData),
    switchMap(payload => this._filterService.populateFilterData(payload)),
    switchMap((data: any) => {
      return of(new GetFilterDataSuccess(data));
    }),
  ));

  constructor(private _filterService: FilterService, private _actions$: Actions) {}
}
