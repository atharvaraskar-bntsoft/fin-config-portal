import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { selectRequestMatrix } from '@app/store/selectors/transaction-log.selector';
import { GetRequestMatrix } from '@app/store/actions/transaction-log.action';
import { Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-request-matrix',
  styleUrls: ['./request-matrix.component.scss'],
  templateUrl: './request-matrix.component.html',
})
export class RequestMatrixComponent implements OnInit, OnDestroy {
  @Input() visibleMat = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Input() matId: any;
  title = 'Request Matrix';
  public isloading = false;
  public loading = true;
  public destinationSplit: any;
  public destinationLength = 0;
  public currentLang: string;
  public Labels: any = {};
  public dataHeader: any;
  public dataValue: any;
  public columns: any;
  public rows: any;
  public headers: any;
  public rowData: any;
  @ViewChild('row', { static: true }) row: TemplateRef<any>;
  componetDestroyed = new Subject();

  constructor(
    private translate: TranslateService,
    private _store: Store<IAppState>,
    private _router: Router,
  ) {}

  ngOnInit() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectRequestMatrix))
      .subscribe(response => {
        if (response) {
          this.headers = this._dataTranform(response) ? this._dataTranform(response) : null;
          this.rows = this._rowDataTransform(response);
          this.dataHeader = this.rows[0];
          this.dataValue = this.rows.splice(1);
          this.loading = false;
          this.isloading = false;
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
        }
      });
    this.isloading = true;
    this._store.dispatch(new GetRequestMatrix(this._dataParams(this.matId)));
  }

  close(): void {
    this.visibleMat = false;
    this.closeDrawer.emit(this.visibleMat);
  }
  public onBack() {
    this._router.navigate(['/logs/transaction-log']);
  }

  private _dataParams(data) {
    const destinationObject = { txnId: '', destination: '' };
    destinationObject.txnId = data?.txnId;
    destinationObject.destination = data?.destinations;
    return destinationObject;
  }

  private _dataTranform(data: any) {
    const dataObject = {
      mappingType: '',
      transactionId: '',
      posTransactionType: '',
      headerLabel: '',
    };
    dataObject.mappingType = data.mappingType ? data.mappingType : null;
    dataObject.transactionId = data.transactionId;
    dataObject.posTransactionType = data.posTransactionType;
    dataObject.headerLabel = data.headerLabel;
    return dataObject;
  }

  private _rowDataTransform(data: any) {
    if (data) {
      const rowDataTransform = data.logsList.map(item => {
        item.reqKey = item.request.key;
        item.reqValue = item.request.value;
        item.resKey = item.response.key;
        item.resValue = item.request.value;
        return item;
      });
      return rowDataTransform;
    }
  }
  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
