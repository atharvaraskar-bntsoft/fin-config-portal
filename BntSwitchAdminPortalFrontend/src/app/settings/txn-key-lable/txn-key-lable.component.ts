import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';
import {
  GetTxnKeyLableType,
  DeleteTxnKeyLableType,
  UpdateTxnKeyLableType,
  ClearState,
} from '@app/store/actions/txn-key-lable.action';
import {
  selectTxnKeyLableTypeListGet,
  selectTxnKeyLableTypeDelete,
  selectTxnKeyLableTypeUpdate,
} from '@app/store/selectors/txn-key-lable.selectors';
declare var jQuery: any;

@Component({
  selector: 'app-txn-key-lable',
  templateUrl: './txn-key-lable.component.html',
  styleUrls: ['./txn-key-lable.component.css'],
})
export class TxnKeyLableComponent implements OnInit {
  public currentLang: string;
  public rows: any = [];
  public componetDestroyed = new Subject();
  public currentPagination = '20';
  public loading = true;
  private _page = 1;
  public objectData: any;
  public keyData: any;
  public statusLoading: Boolean = false;
  public columns: any;
  public s: string;
  public totalRecords: Number;
  public TxnKeyLabelTypeData: any;
  public request: Boolean = true;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  public fg: UntypedFormGroup;
  @ViewChild('key', { static: true }) key: TemplateRef<any>;
  @ViewChild('label', { static: true }) label: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('action', { static: true }) action: TemplateRef<any>;
  public showDiv = false;
  public currentItem: any = {
    description: null,
    id: null,
    name: null,
  };
  public rowData: any;
  public submitted: boolean;
  public visible = false;
  public visibleAnimate = false;
  public errorMessage: string;
  public successMessage: string;
  public currentElement: any = [];
  public modalView: boolean;
  public createItem: any;
  public isSpinning: boolean;
  constructor(
    private _store: Store<IAppState>,
    private router: Router,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
          this.loadPage(this._page);
        }
      });

    this._store.pipe(select(selectTxnKeyLableTypeListGet)).subscribe((data: any) => {
      if (data) {
        this.TxnKeyLabelTypeData = data.data;
        this.request = true;
        if (this._page === 1) {
          this.rows = this.TxnKeyLabelTypeData.resultList;
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(this.TxnKeyLabelTypeData.resultList);
        }
        if (this.TxnKeyLabelTypeData['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = this.TxnKeyLabelTypeData['total-record'];
        this.loading = false;
      }
    });

    this._store.pipe(select(selectTxnKeyLableTypeUpdate)).subscribe((response: any) => {
      if (response) {
        this.currentElement.map(item => {
          this.statusLoading = false;
          if (response.data !== null && item.id === response.data.id) {
            this._store.dispatch(new ClearState());
            if (response.status === 'success' && response.data !== null) {
              item = response.data;
            }
          }
        });
      }
    });
    this.translate.get(['TXNKEY', 'TXNLABEL', 'STATUS', 'ACTION']).subscribe(translation => {
      this.columns = [
        {
          name: translation.TXNKEY,
          prop: 'txnKey',
          width: 150,
        },
        {
          name: translation.TXNLABEL,
          prop: 'label',
          width: 170,
        },
        {
          cellTemplate: this.status,
          name: translation.STATUS,
          prop: 'active',
          sortable: false,
          width: 10,
        },
        {
          cellTemplate: this.action,
          name: translation.ACTION,
          prop: 'action',
          sortable: false,
          width: 10,
        },
      ];
    });
  }

  public deleteRow(row) {
    this.keyData = row.txnKey;
    this.errorMessage = '';
    this.successMessage = '';
    this._store.dispatch(new DeleteTxnKeyLableType(row.id));
    this._store.pipe(select(selectTxnKeyLableTypeDelete)).subscribe((response: any) => {
      if (response) {
        this._store.dispatch(new ClearState());
        if (response.status === 'failure') {
          this.errorMessage = response.message;
        } else if (response.status === 'success') {
          this.successMessage = response.message;
          this.loadPage(this._page);
        }
      }
    });
  }

  public onScroll(offsetY: any) {
    const THis = this;
    jQuery('.datatable-body').on('scroll', function () {
      let div = jQuery(this).get(0);
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (THis.request) {
          THis._page = ++THis._page;
          THis.loadPage(THis._page);
        }
      }
    });
  }

  public changeStatus(row) {
    this.statusLoading = true;
    row.active = row.active === '0' ? '1' : '0';
    this.currentElement.push(row);
    this._store.dispatch(new UpdateTxnKeyLableType(row));
  }

  public getRowData(row) {
    this.router.navigate(['logs/txnKeyLable/edit', row.id]);
  }

  loadPage(pagenumber: Number) {
    this._store.dispatch(
      new GetTxnKeyLableType({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
}
