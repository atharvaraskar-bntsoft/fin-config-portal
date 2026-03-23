import { Component, OnInit, ViewChild, TemplateRef, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectLimitsAndPermission } from '../../store/selectors/velocity-limits.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { IAppState } from '../../store/state/app.state';
import { GetVelocityLimits, ClearState } from '../../store/actions/velocity-limits.action';
import { GetFilterData, ClearFilterData } from '@app/store/actions/filter.actions';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Utils } from 'src/utils';
import { VelocityLimitsService } from '@app/services/velocity-limits.service';
import { AlertService } from '@app/services/alert.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var jQuery: any;

@Component({
  selector: 'app-velocity-limits',
  styleUrls: ['./velocity-limits.component.scss'],
  templateUrl: './velocity-limits.component.html',
})
export class VelocityLimitsComponent implements OnInit {
  @ViewChild('applyTemplate', { static: true }) applyTemplate: TemplateRef<any>;
  @ViewChild('labels', { static: true }) labels: TemplateRef<any>;
  @ViewChild('amountTemplate', { static: true }) amountTemplate: TemplateRef<any>;
  @ViewChild('countTemplate', { static: true }) countTemplate: TemplateRef<any>;
  @ViewChild('more', { static: true }) more: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTemplate: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  public currentPagination = '20';
  public currentLang: string;
  public Labels: any = {};
  public loadingFlag = false;
  public columns: any;
  public rows: any = [];
  public visible = false;
  public visibleAlert = false;
  public visibleAnimate = false;
  public visibleAnimateAlert = false;
  public searchData: any = [];
  public temp: any;
  public transactiondetails = false;
  public editdetails = false;
  public transactionData: any;
  public status: any;
  public statusList: any;
  public applyList: any;
  public objectData: any;
  public transactionList: any;
  public errorMessage: any;
  public successMessage: any;
  public request: Boolean = false;
  public currentElement: any = [];
  public statusLoading: Boolean = false;
  public currentItem: any = {
    deviceId: {
      id: null,
      name: null,
    },
    locationId: {
      id: null,
      name: null,
    },
    merchantId: {
      id: null,
      name: null,
    },
    merchantInstitutionId: {
      id: null,
      name: null,
    },
    type: {
      id: null,
      name: null,
    },
    baseCurrencyId: {
      id: null,
      name: null,
    },
    id: null,
    limitAmount: {
      perDay: null,
      perMonth: null,
      perTime: null,
      singleTransaction: null,
    },
    limitCount: {
      perDay: null,
      perMonth: null,
      perTime: null,
    },
    minutesCount: null,
    locked: '1',
    transactionTypes: {
      id: null,
      name: null,
    },
  };
  public filter: any = {};
  public place: any = '';
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public velocityLimitId = 'link_velocity';
  public velocityData: any;

  public loading = true;
  private _page = 1;
  public setPage(value) {
    this._page = value;
  }
  public getPage() {
    return this._page;
  }
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  public resetButtonFlag: Boolean = false;
  public searchResetButton: Boolean = true;
  private _filters: Array<any> = [];
  isvisibleview: boolean;
  idView: any;
  public componetDestroyed = new Subject();

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private _velocityService: VelocityLimitsService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.translate
      .get(['INSTITUTION_GROUP', 'INSTITUTIONS', 'LOCATIONS', 'DEVICES'])
      .subscribe(translation => {
        this.applyList = [
          {
            id: 1,
            name: 'MerchantInstitution',
            code: translation.INSTITUTION_GROUP,
          },
          { id: 2, name: 'Merchant', code: translation.INSTITUTIONS },
          { id: 3, name: 'Location', code: translation.LOCATIONS },
          { id: 4, name: 'Device', code: translation.DEVICES },
        ];
      });
    this._store.pipe(select(selectLimitsAndPermission)).subscribe((Velocitylimits: any) => {
      if (Velocitylimits && Velocitylimits[0]) {
        [this.velocityData, this.permission] = Velocitylimits;
        this.request = true;
        if (this._page === 1) {
          this.rows = this.velocityData !== null ? this._dataTransform(this.velocityData) : null;
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(this._dataTransform(this.velocityData));
        }
        if (Velocitylimits['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.loading = false;
        this.permission = this.permission.permissions.data.find(
          item => item.id === this.velocityLimitId,
        );
        this.permissionObject = this.permission;
      }
    });

    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });

    this._store.dispatch(new GetFilterData('/velocity-limits/filter'));
    this._store.pipe(select(selectFilterData)).subscribe(filter => {
      if (filter && filter !== null && filter.status !== 'failure') {
        this.statusList = filter.data.status;
        this.transactionList = filter.data.txnType;
        this._store.dispatch(new ClearFilterData());
      }
    });
    this.translate
      .get(['APPLY_LIMIT_TO', 'STATUS', 'VELOCITY_LIMITS_LABELS', 'AMOUNT', 'COUNT', 'ACTIONS'])
      .subscribe(translation => {
        this.columns = [
          {
            prop: 'apply',
            name: translation.VELOCITY_LIMITS_APPLY_TO,
            cellTemplate: this.applyTemplate,
            width: 10,
            sortable: false,
          },
          {
            prop: 'status',
            name: translation.STATUS,
            cellTemplate: this.statusTemplate,
            width: 1,
            sortable: false,
          },
          {
            prop: 'amount',
            name: translation.AMOUNT,
            cellTemplate: this.amountTemplate,
            width: 1,
            sortable: false,
          },
          {
            prop: 'count',
            name: translation.COUNT,
            cellTemplate: this.countTemplate,
            width: 1,
            sortable: false,
          },
          {
            prop: 'more',
            name: translation.ACTIONS,
            cellTemplate: this.more,
            width: 1,
            sortable: false,
          },
        ];
        this.searchData = this.columns
          .map(value => {
            if (value.Searchable) {
              return value.prop;
            }
          })
          .filter(item => item);
      });
  }
  private _dataTransform(Velocitylimits: any): Array<any> {
    this.totalRecords = Velocitylimits['total-record'];
    const velocityRes = Utils.newData(Velocitylimits.velocityLimitsList);
    let countno = 0;
    return velocityRes.map((item: any) => {
      const apply = {
        name: '',
        institution: '',
        transaction: '',
        merchant: '',
      };
      const amount = { single: '', perMinutes: '', perDay: '', perMonth: '' };
      const count = { single: '', perMinutes: '', perDay: '', perMonth: '' };
      apply.name = item?.merchantInstitutionId.name;
      apply.institution = item.type !== null ? item.type.code : null;
      apply.transaction = item.transactionTypes.name;
      apply.merchant = item.merchantId !== null ? item.merchantId.name : null;
      amount.single = item.limitAmount.singleTransaction;
      amount.perMinutes = item.limitAmount.perTime;
      amount.perDay = item.limitAmount.perDay;
      amount.perMonth = item.limitAmount.perMonth;
      count.single = !item.limitCount.singleTransaction ? 'N/A' : item.limitCount.singleTransaction;
      count.perMinutes = item.limitCount.perTime;
      count.perDay = item.limitCount.perDay;
      count.perMonth = item.limitCount.perMonth;
      item.apply = apply;
      item.amount = amount;
      item.count = count;
      item.height = 115;
      let applyCount = 0;
      let countAmount = 0;
      let countCount = 0;

      if (item.apply.institution !== null) {
        applyCount++;
      }
      if (item.apply.merchant !== null) {
        applyCount++;
      }
      if (item.apply.name !== null) {
        applyCount++;
      }
      if (item.apply.transaction !== null) {
        applyCount++;
      }
      if (item.amount.singleTransaction !== null) {
        countAmount++;
      }
      if (item.amount.perMinutes !== null) {
        countAmount++;
      }
      if (item.amount.perDay !== null) {
        countAmount++;
      }
      if (item.amount.perMonth !== null) {
        countAmount++;
      }
      if (item.count.singleTransaction !== null) {
        countCount++;
      }
      if (item.count.perMinutes !== null) {
        countCount++;
      }
      if (item.count.perDay !== null) {
        countCount++;
      }
      if (item.count.perMonth !== null) {
        countCount++;
      }
      if (countAmount >= countCount && countAmount >= applyCount) {
        item.height = countAmount * 30;
      } else if (countCount >= applyCount && countCount >= countAmount) {
        item.height = countCount * 30;
      } else {
        item.height = 3 * 25;
      }
      countno++;
      return item;
    });
  }

  public editDetails(row: any): void {
    this._router?.navigate(['/limits/velocity-limits/edit/', row.id]);
  }

  public deleteDetails(row) {
    this.objectData = row.apply.transaction;
    const keyData = row.id;
    this._velocityService
      .deleteLimits(keyData)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(res => {
        if (res) {
          this._store.dispatch(new ClearState());
          if (res.status === 'success') {
            this.alertService.responseMessage(res);
            this.loadPage(this._page);
          }
        }
      });
  }
  viewOnDrawer(data: any) {
    this.idView = data;
    this.isvisibleview = true;
  }
  close(event: any): void {
    this.isvisibleview = false;
  }
  create(event: any) {
    this.isvisibleview = false;
  }

  public getFilterObjectData(eventData: any) {
    if (!eventData) {
      delete this._filters['applyLimit'];
    } else {
      this._filters['applyLimit'] = eventData.name;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  // tslint:disable-next-line: member-ordering
  public getFilterTxnData(eventData: any) {
    if (!eventData) {
      delete this._filters['txnType'];
    } else {
      this._filters['txnType'] = eventData;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getFilterStatusData(eventData: any) {
    if (!eventData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public resetFilterSearch() {
    this.filter = {};
    this._filters = [];
    this.place = '';
    this._page = 1;
    this.loadPage(this._page);
  }

  public onStatusChange(data) {
    this.statusLoading = true;
    this.loadingFlag = true;
    this.setData(data);
    data.active = !data.active;
    data.isLoader = true;
    this.currentElement.push(data);
    this._velocityService.updateLimits(this.currentItem).subscribe(res => {
      if (res && res.status === 'success') {
        data.status = res.data.status;
        this.statusLoading = false;
        this.alertService.responseMessage(res);
      }
    });
  }

  public setData(data) {
    if (data.merchantInstitutionId !== null) {
      this.currentItem.merchantInstitutionId['id'] = data.merchantInstitutionId.id;
      this.currentItem.merchantInstitutionId['name'] = data.merchantInstitutionId.name;
    } else {
      this.currentItem.merchantInstitutionId = { id: null, name: null };
    }
    if (data.merchantId !== null) {
      this.currentItem.merchantId['id'] = data.merchantId.id;
      this.currentItem.merchantId['name'] = data.merchantId.name;
    } else {
      this.currentItem.merchantId = { id: null, name: null };
    }
    if (data.locationId !== null) {
      this.currentItem.locationId['id'] = data.locationId.id;
      this.currentItem.locationId['name'] = data.locationId.name;
    } else {
      this.currentItem.locationId = { id: null, name: null };
    }
    if (data.deviceId !== null) {
      this.currentItem.deviceId['id'] = data.deviceId.id;
      this.currentItem.deviceId['name'] = data.deviceId.name;
    } else {
      this.currentItem.deviceId = { id: null, name: null };
    }
    if (data.type.id === 1) {
      this.currentItem.type = { id: 1, name: 'MerchantInstitution' };
    } else if (data.type.id === 2) {
      this.currentItem.type = { id: 2, name: 'Merchant' };
    } else if (data.type.id === 3) {
      this.currentItem.type = { id: 3, name: 'Location' };
    } else if (data.type.id === 4) {
      this.currentItem.type = { id: 4, name: 'Device' };
    }
    this.currentItem.baseCurrencyId.id = data.baseCurrencyId.id;
    this.currentItem.baseCurrencyId.name = data.baseCurrencyId.name;
    this.currentItem.id = data.id;
    this.currentItem.limitAmount.perDay = data.limitAmount.perDay;
    this.currentItem.limitAmount.perMonth = data.limitAmount.perMonth;
    this.currentItem.limitAmount.perTime = data.limitAmount.perTime;
    this.currentItem.limitAmount.singleTransaction = data.limitAmount.singleTransaction;
    this.currentItem.limitCount.perDay = data.limitCount.perDay;
    this.currentItem.limitCount.perMonth = data.limitCount.perMonth;
    this.currentItem.limitCount.perTime = data.limitCount.perTime;
    this.currentItem.limitCount.singleTransaction = data.limitCount.singleTransaction;
    this.currentItem.minutesCount = data.minutesCount;
    this.currentItem.locked = data.locked === '1' ? '0' : '1';
    data.locked = this.currentItem.locked;
    this.currentItem.transactionTypes.id = data.transactionTypes.id;
    this.currentItem.transactionTypes.name = data.transactionTypes.name;
  }

  private _transFilters() {
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

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetVelocityLimits({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  getRowHeight(row) {
    if (!row) {
      return 115;
    }
    if (row.height === undefined) {
      return 115;
    }
    return row.height;
  }

  public ngOnDestroy(): void {
    this.componetDestroyed.unsubscribe();
  }
}
