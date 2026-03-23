import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, takeUntil } from 'rxjs/operators';
import serializeError from 'serialize-error';
import {
  ImportFileAction,
  ImportFileTypes,
  UploadFailureAction,
  UploadProgressAction,
  UploadStartedAction,
  UploadSuccessAction,
} from '../actions/import-file.action';
import { ImportFileService } from '../../services/import-file.service';

@Injectable()
export class ImportFileEffects {
  
  uploadRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ImportFileTypes.UPLOAD_REQUEST),
    concatMap(payload =>
      this.fileUploadService.validateCsvFileToInstitutionGroups(payload).pipe(
        takeUntil(this.actions$.pipe(ofType(ImportFileTypes.UPLOAD_CANCEL))),
        map(event => this.getActionFromHttpEvent(event)),
        catchError(error => of(this.handleError(error))),
      ),
    ),
  ));

  
  importEffect$ = createEffect(() => this.actions$.pipe(
    ofType<ImportFileAction>(ImportFileTypes.IMPORT_FILE),
    switchMap(data => this.fileUploadService.postCsvFileToInstitutionGroups(data)),
    switchMap((response: any) => {
      return of(new UploadSuccessAction(response));
    }),
  ));

  constructor(private fileUploadService: ImportFileService, private actions$: Actions<any>) {}

  private getActionFromHttpEvent(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent: {
        return new UploadStartedAction();
      }
      /*   case HttpEventType.DownloadProgress: {
           return ;
         }*/
      case HttpEventType.UploadProgress: {
        return new UploadProgressAction({
          progress: Math.round((100 * event.loaded) / event.total),
        });
      }
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          return new UploadSuccessAction(event['body']['data']);
        } else {
          return new UploadFailureAction({
            error: event.statusText,
          });
        }
      }
      default: {
        return new UploadFailureAction({
          error: `Unknown Event: ${JSON.stringify(event)}`,
        });
      }
    }
  }

  private handleError(error: any) {
    const friendlyErrorMessage = serializeError(error).message;
    return new UploadFailureAction({
      error: friendlyErrorMessage,
    });
  }
}
