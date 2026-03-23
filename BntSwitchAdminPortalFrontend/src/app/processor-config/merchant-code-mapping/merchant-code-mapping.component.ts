import { Component, ElementRef, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MerchantCodeMapping } from '../../config/i18n/merchant-code-mapping.config';
import { ClearFilterData, GetFilterData } from '../../store/actions/filter.actions';
import {
  ClearState,
  GetMerchantCodeMapping,
} from '../../store/actions/merchant-code-mapping.action';
import { selectFilterData } from '../../store/selectors/filter.selectors';
import { selectMerchantCodeMappingAndPermission } from '../../store/selectors/merchant-code-mapping.selector';
import { MerchantGetObject } from '@app/models/merchant-code-mapping.interface';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from '../../store/state/app.state';
import { MerchantCodeMappingService } from '@app/services/merchant-code-mapping.service';
import { AlertService } from '@app/services/alert.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var jQuery: any;

@Component({
  selector: 'app-merchant-code-mapping',
  styleUrls: ['./merchant-code-mapping.component.scss'],
  templateUrl: './merchant-code-mapping.component.html',
})
export class MerchantCodeMappingComponent implements OnInit {
  interval(interval: any) {
    throw new Error('Method not implemented.');
  }
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any = {};
  public columns: any;
  public rows: any = [];
  public resetButtonFlag: Boolean = false;
  public keyData: any;
  public visible = false;
  public visibleAnimate = false;
  public searchData: any = [];
  public temp: Array<any> = [];
  public visiblePopUp = false;
  public visiblePopUpAnimate = false;
  public errorMessage: String;
  public objectData: any;
  public successMessage: String;
  public statusList: Array<any> = [];
  public processorList: Array<any> = [];
  public loading = true;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 60;
  readonly pageLimit = 15;
  public request: Boolean = true;
  public searchResetButton: Boolean = true;
  public actionLoader: Array<number> = [];
  public componetDestroyed = new Subject();

  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('acquirer', { static: true }) acquirer: TemplateRef<any>;
  @ViewChild('merchant', { static: true }) merchant: TemplateRef<any>;
  @ViewChild('location', { static: true }) location: TemplateRef<any>;
  @ViewChild('device', { static: true }) device: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  rowId: any;
  public permission: any = {
    check: null,
    delete: null,
    id: '',
    permissions: null,
    read: null,
    update: null,
    write: null,
  };
  public place: any = '';
  public merchantCodeData: any;
  public merchantCodeId = 'link_mid';
  public filter: any = {};
  public currentElement: any = [];
  private _filters: Array<any> = [];
  private _page = 1;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private translate: TranslateService,
    private _midService: MerchantCodeMappingService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.rows = [];
    this._store
      .pipe(select(selectMerchantCodeMappingAndPermission))
      .subscribe((data: MerchantGetObject) => {
        if (data) {
          this.request = true;
          this.merchantCodeData = data.data;
          if (this._page === 1) {
            this.rows = this._dataTransform(this.merchantCodeData.merchantMappingList);
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(
              this._dataTransform(this.merchantCodeData.merchantMappingList),
            );
          }
          if (this.merchantCodeData['total-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = data.data['total-record'];
          this.loading = false;
        }
      });
    this._store.pipe(select(selectPermissionsData)).subscribe((data: any) => {
      if (data) {
        this.permission = data.data.find(item => item.id === this.merchantCodeId);
      }
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.Labels = MerchantCodeMapping['texts'][this.currentLang];
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    this.loadPage(this._page);
    this._store.dispatch(new GetFilterData('/merchant-mapping/filter'));
    this._store.pipe(select(selectFilterData)).subscribe(filter => {
      if (filter !== null && filter.status !== 'failure') {
        this.processorList = filter.data.processorList;
        this.statusList = filter.data.status;
        this._store.dispatch(new ClearFilterData());
      }
    });
    this.translate
      .get(['ACTIONS', 'TRANSACTION', 'AMOUNT', 'MERCHANT_CODE', 'STATUS', 'MORE'])
      .subscribe(translation => {
        this.columns = [
          {
            name: translation.PROCESSOR_ID,
            prop: 'processor',
          },
          {
            name: translation.PROCESSOR_ID,
            prop: 'acquirers',
            cellTemplate: this.acquirer,
            sortable: false,
          },
          {
            Searchable: true,
            name: translation.PROCESSOR_ID,
            prop: 'merchant Chains',
            cellTemplate: this.merchant,
            sortable: false,
          },
          {
            name: translation.PROCESSOR_ID,
            prop: 'merchant Stores',
            cellTemplate: this.location,
            sortable: false,
          },
          {
            name: translation.PROCESSOR_ID,
            prop: 'merchant Terminals',
            cellTemplate: this.device,
            sortable: false,
          },
          {
            cellTemplate: this.status,
            name: translation.ACTIVE,
            prop: 'status',
            sortable: false,
          },
          {
            cellTemplate: this.actions,
            name: translation.ACTIONS,
            prop: 'action',
            sortable: false,
          },
        ];
      });
  }

  public deleteRow(row): void {
    this.objectData = row.processorMerchantCode;
    this.rowId = row.id;
    this._midService
      .deleteMechantCodeMapping(this.rowId)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(res => {
        if (res && res.status === 'success') {
          this.alertService.responseMessage(res);
          this.loadPage(this._page);
        }
      });
  }

  public getFilterStatusData(statusData: any): void {
    if (!statusData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = statusData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getProcessorData(processorData: any): void {
    if (!processorData) {
      delete this._filters['processorList'];
    } else {
      this._filters['processorList'] = processorData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getRowData(row): void {
    this._router.navigate(['/processor-config/merchant-code-mapping/edit', row.id]);
  }

  public changeStatus(row) {
    const obj = Object.assign({}, row);
    obj.active = !obj.active;
    row.active = !row.active;
    row.isLoader = true;
    this.currentElement.push(row);
    this._midService.updateErrorCodeMapping(obj).subscribe(res => {
      if (res) {
        this.currentElement.map(item => {
          item.isLoader = false;
          if (res.data !== null && item.id === res.data.id) {
            this._store.dispatch(new ClearState());
            if (res.status === 'success' && res.data !== null) {
              item.status = res.data.status;
            }
          }
        });
        this.alertService.responseMessage(res);
      }
    });
  }
  public resetFilterSearch() {
    this.filter = {};
    this._filters = [];
    this._page = 1;
    this.loadPage(this._page);
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

  private _dataTransform(merchantMapping: any): any {
    if (merchantMapping) {
      merchantMapping.map((item: any) => {
        item.processor = item.processorId.name;
        item.acquirer = item.sourceAcquirerId ? item.sourceAcquirerId.code : '';
        item.merchant = item.sourceMerchantId ? item.sourceMerchantId.name : '';
        item.location = item.sourceLocationId ? item.sourceLocationId.name : '';
        item.device = item.sourceDeviceId ? item.sourceDeviceId.code : '';
        return item;
      });
    }
    return merchantMapping;
  }

  private _transFilters(): Object {
    const output = Object.keys(this._filters);
    if (output.length) {
      this.resetButtonFlag = true;
    } else {
      this.resetButtonFlag = false;
    }
    return output
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetMerchantCodeMapping({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  public ngOnDestroy(): void {
    this.componetDestroyed.unsubscribe();
  }
}
