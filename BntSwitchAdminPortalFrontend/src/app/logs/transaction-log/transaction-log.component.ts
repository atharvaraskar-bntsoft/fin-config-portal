import { Component, OnInit, ContentChild, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { selectTransactionLogs } from '../../store/selectors/transaction-log.selector';
import { GetTransactionLogs } from '../../store/actions/transaction-log.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { GetFilterData, ClearFilterData } from '@app/store/actions/filter.actions';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { ClipboardService } from 'ngx-clipboard';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Subject } from 'rxjs';
import { TransactionLogService } from '@app/services/transaction-log.service';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  startOfToday,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  differenceInCalendarDays,
  endOfYear,
  startOfYear,
} from 'date-fns';
import { CookieService } from 'ngx-cookie-service';
declare var jQuery: any;

@Component({
  selector: 'app-transaction-log',
  styleUrls: ['./transaction-log.component.css'],
  templateUrl: './transaction-log.component.html',
})
export class TransactionLogComponent implements OnInit, OnDestroy {
  isvisibleview: boolean;
  idView: any;
  resIdView: any;
  isvisibleviewRes: boolean;
  visibleJson: boolean;
  visibleMat: boolean;
  matId: any;
  public currentPagination = '20';
  public selectedFilter: any = {};
  public currentLang: string;
  public Labels: any = {};
  public columns: any;
  public menuVisible = false;
  public rows: any = [];
  public keyData: any = {};
  public visible = false;
  public dateFlag = false;
  public otherFlag = true;
  public _filters: Array<any> = [];
  public visibleAnimate = false;
  public searchData: any = [];
  public actionFlag = true;
  public temp: any;
  public cache: any = {};
  public loading = true;
  public place: any = '';
  public maskedCardNumber: any = '';
  public acquirerID: any = '';
  public DeviceDatapage = 1;
  public sourceAcquirerDataPage = 1;
  public MerchantDatapage = 1;
  public DestinationEndpointpage = 1;
  public rrn: any = '';
  public uuid: any = '';
  public reqamount: any = '';
  public responseCode: any = '';
  private _page = 1;
  public s: string;
  readonly headerHeight = 40;
  readonly rowHeight = 110;
  readonly pageLimit = 15;
  public totalRecords: number;
  public statusList: any;
  public currencyList: any;
  public destinationList: any;
  public deviceList: any;
  public merchantList: any;
  public txnTypeList: any;
  public divFlag = true;
  public forReview: any;
  public fromDate = null;
  public dateTimestamp1: any;
  public dateTimestamp2: any;
  public resetFlag = false;
  public request: boolean = true;
  public toDate = null;
  public resetButtonFlag: boolean = true;
  public copied = false;
  public searchResetButton: boolean = true;
  public fromDate_futureDateTime: boolean = false;
  public toDate_futureDateTime: boolean = false;
  public periodList = [
    { id: 1, name: 'Last 7 days' },
    { id: 2, name: 'Last 30 days' },
    { id: 3, name: 'Last 6 Months' },
    { id: 4, name: 'Other' },
  ];
  public safQueueList = ['true', 'false'];
  public authList = ['true', 'false'];
  public messageList = ['Advice', 'authorization', 'financial', 'Reversal', 'Confirmation'];
  public selectedSafQueueList = this.safQueueList;
  public selectedAuthList = this.authList;
  public selectedMessageList = this.messageList;
  public filterkey: any = {};
  public prevUrlList = [];
  public prevUrl: any;
  public currentID: any;
  previousUrl: string = null;
  currentUrl: string = null;
  public filterLoading = false;
  public sourceLoad = true;
  public deviceLoad = true;
  public merchantLoad = true;
  public destinationLoad = true;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('transaction', { static: true }) transaction: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('more', { static: true }) more: TemplateRef<any>;
  @ViewChild('merchant', { static: true }) merchant: TemplateRef<any>;
  @ViewChild('acquirer', { static: true }) acquirer: TemplateRef<any>;
  @ViewChild('amount', { static: true }) amount: TemplateRef<any>;
  @ContentChild('header', { static: true }) header: TemplateRef<any>;
  @ContentChild('body', { static: true }) body: TemplateRef<any>;
  @ContentChild('footer', { static: true }) footer: TemplateRef<any>;
  componetDestroyed = new Subject();
  maskJSON: any;
  isDateBefore = true;
  isDetailPage: any;
  fromDateError = false;
  public scrollHeight: any;
  toDateError = false;
  public sourceAcquirerData: any = [];
  public sourceDeviceData: any = [];
  public sourceMerchantData: any = [];
  public sourceDestinationEndpointNameData: any = [];
  public isLoading = true;
  public filter: any = {};
  public queryString;

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
  };

  ranges = {};
  now = startOfToday();
  day_1 = subDays(new Date(), 1);
  day_2 = subDays(new Date(), 2);
  day_3 = subDays(new Date(), 3);
  day_4 = subDays(new Date(), 4);
  day_5 = subDays(new Date(), 5);
  day_6 = subDays(new Date(), 6);
  start = subWeeks(new Date(), 1);
  end = new Date();
  period = [subWeeks(new Date(), 1), new Date()];
  getTime : any = ''	
  constructor(
    private _clipboardService: ClipboardService,
    private translate: TranslateService,
    private _store: Store<IAppState>,
    private _txnService: TransactionLogService,
    private _cookieService: CookieService,
  ) {
    setInterval(() => {
      this.end = new Date();
      this.now = new Date();
      this.day_1 = subDays(new Date(), 1);
      this.day_2 = subDays(new Date(), 2);
      this.day_3 = subDays(new Date(), 3);
      this.day_4 = subDays(new Date(), 4);
      this.day_5 = subDays(new Date(), 5);
      this.day_6 = subDays(new Date(), 6);
      this.start = subWeeks(new Date(), 1);
      this.ranges = {
        'Now': [startOfToday(), new Date()],
        'Last 7 days': [subWeeks(new Date(), 1), new Date()],
        'Last 30 days': [subMonths(new Date(), 1), new Date()],
        'Last 6 months': [subQuarters(new Date(), 2), new Date()],
        'Last year': [
          startOfYear(subQuarters(new Date(), 3)),
          endOfYear(subQuarters(new Date(), 3)),
        ],
      };
    }, 1000);
    this.getTime = JSON.parse(this._cookieService.get('timezone'));
  }

  ngOnInit() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectTransactionLogs))
      .subscribe((Transactionlogs: any) => {
        if (Transactionlogs) {
          this.request = true;
          this.loading = true;
          Transactionlogs.data.logsList = Transactionlogs.data.logsList.filter(item => item);
          if(Transactionlogs.data.logsList.length === 0){
            this.request =false;
          }
          if (this._page === 1) {
            this.rows = this._dataTransform(Transactionlogs.data.logsList);
          } else if (this.rows?.length !== 0) {
            this.rows = this.rows.concat(this._dataTransform(Transactionlogs.data.logsList));
          }
         
          this.loading = false;
          this.filterLoading = false;
          this.totalRecords = Transactionlogs.data['total-record'];
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectFilterData))
      .subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure') {
          this.statusList = filter.data.status;
          this.deviceList = filter.data.device;
          this.merchantList = filter.data.merchant;
          this.txnTypeList = filter.data.txnType;
          this._store.dispatch(new ClearFilterData());
        }
      });

    const intervalForTxnlog = this._cookieService.get('intervalForTxnlog') || '1';

    if (intervalForTxnlog == '1') {
      this.filter.period = [this.day_1, this.end];
    } else if (intervalForTxnlog == '2') {
      this.filter.period = [this.day_2, this.end];
    } else if (intervalForTxnlog == '3') {
      this.filter.period = [this.day_3, this.end];
    } else if (intervalForTxnlog == '4') {
      this.filter.period = [this.day_4, this.end];
    } else if (intervalForTxnlog == '5') {
      this.filter.period = [this.day_5, this.end];
    } else if (intervalForTxnlog == '6') {
      this.filter.period = [this.day_6, this.end];
    } else {
      this.filter.period = [this.start, this.end];
    }

    this.onChange(this.filter.period);

    this._store.dispatch(new GetFilterData('/logs-transactions/filter'));
    this.translate
      .get(['DATE', 'TRANSACTION', 'AMOUNT', 'MERCHANT_CODE', 'ACQUIRER', 'STATUS', 'ACTIONS'])
      .subscribe(translation => {
        this.columns = [
          {
            prop: 'date',
            name: translation.DATE,
            cellTemplate: this.date,
            width: 205,
          },
          {
            prop: 'info',
            name: translation.TRANSACTION,
            cellTemplate: this.transaction,
            width: 225,
            sortable: false,
          },
          {
            prop: 'approved_amount',
            name: translation.AMOUNT,
            cellTemplate: this.amount,
            width: 140,
            sortable: false,
          },
          {
            prop: 'merchant',
            name: translation.MERCHANT_CODE,
            cellTemplate: this.merchant,
            width: 210,
            sortable: false,
          },
          {
            prop: 'acquirer',
            name: translation.ACQUIRER,
            cellTemplate: this.acquirer,
            width: 180,
            sortable: false,
          },
          {
            prop: 'status',
            name: translation.STATUS,
            cellTemplate: this.status,
            width: 135,
            sortable: false,
          },
          {
            prop: 'more',
            name: translation.ACTIONS,
            cellTemplate: this.more,
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
    this.checkStorage();
    if (this.isDetailPage && this.isDetailPage === 'yes') {
      this.selectFilterValue();
    } else {
      localStorage.removeItem('filter');
      this.defaultFilters();
      this.loadPage(this._page);
    }
    this.loadMore();
    this.loadDeviceData();
    this.loadMerchantData();
    this.loadDestinationEndpointNameData();
  }

  public allFitrerdValue(): void {
    delete this._filters['merchant'];
    delete this._filters['device'];
    delete this._filters['status'];
    delete this._filters['txnType'];
    delete this._filters['destinationAcq'];
    delete this._filters['rrn'];
    delete this._filters['uuid'];
    delete this._filters['amount'];
    delete this._filters['responseCode'];
    delete this._filters['sourceAcq'];
    delete this._filters['processorAdpCode'];
    delete this._filters['saf'];
    delete this._filters['auth'];
    delete this._filters['msgType'];
    delete this._filters['txnId'];
    delete this._filters['maskedCardNumber'];
    if (this.acquirerID && this.acquirerID !== '') {
      this._filters['destinationAcq'] = this.acquirerID;
    }
    if (this.rrn && this.rrn !== '') {
      this._filters['rrn'] = this.rrn;
    }
    if (this.uuid && this.uuid !== '') {
      this._filters['uuid'] = this.uuid;
    }
    if (this.reqamount && this.reqamount !== '') {
      this._filters['amount'] = this.reqamount;
    }
    if (this.responseCode && this.responseCode !== '') {
      this._filters['responseCode'] = this.responseCode;
    }
    if (this.filterkey.sourceAcq && this.filterkey.sourceAcq !== '') {
      this._filters['sourceAcq'] = this.filterkey.sourceAcq;
    }
    if (this.filterkey.processorAdpCode && this.filterkey?.processorAdpCode !== '') {
      this._filters['processorAdpCode'] = this.filterkey?.processorAdpCode;
    }
    if (this.selectedSafQueueList && this.selectedSafQueueList !== this.safQueueList) {
      this._filters['saf'] = this.selectedSafQueueList;
    }
    if (this.selectedAuthList && this.selectedAuthList !== this.authList) {
      this._filters['auth'] = this.selectedAuthList;
    }
    if (this.selectedMessageList && this.selectedMessageList !== this.messageList) {
      this._filters['msgType'] = this.selectedMessageList;
    }
    if (this.filterkey.device && this.filterkey.device !== '') {
      this._filters['device'] = this.filterkey.device;
    }
    if (this.filterkey.merchant && this.filterkey.merchant !== '') {
      this._filters['merchant'] = this.filterkey.merchant;
    }
    if (this.filterkey.logStatus && this.filterkey.logStatus !== '') {
      this._filters['status'] = this.filterkey.logStatus;
    }
    if (this.filterkey.txnType && this.filterkey.txnType !== '') {
      this._filters['txnType'] = this.filterkey.txnType;
    }
    if (this.place && this.place !== '') {
      this._filters['txnId'] = this.place;
    }
    if (this.maskedCardNumber && this.maskedCardNumber !== '') {
      this._filters['maskedCardNumber'] = this.convertData(this.maskedCardNumber);
    }
    if (this.otherFlag === false) {
      this.filterLoading = true;
      this.setFilterData();
      this._page = 1;
      this.loadPage(this._page);
    } else {
      this.filterLoading = true;
      this._page = 1;
      this.loadPage(this._page);
    }
    this.menuVisible = false;
  }

  public closeMenu() {
    this.menuVisible = false;
  }

  public selectFilterValue() {
    this.selectedFilter = JSON.parse(localStorage.getItem('filter'));
    this.rows = JSON.parse(localStorage.getItem('rows'));
    this.scrollHeight = JSON.parse(localStorage.getItem('scrollTop'));
    this._page = JSON.parse(localStorage.getItem('_page'));
    if (this.selectedFilter?.hasOwnProperty('logLevel')) {
      if (this.selectedFilter['logLevel']) {
        this.filterkey.logLevel = this.selectedFilter['logLevel'];
        delete this.selectedFilter['logLevel'];
        if (this.filterkey?.logLevel == 1) {
          this.toDate = null;
          this.fromDate = null;
          this.toDateError = false;
          this.fromDateError = false;
          this.isDateBefore = true;
          this.otherFlag = true;
          this.calculateDateFrom(7);
          this.setFilterData();
        } else if (this.filterkey?.logLevel == 2) {
          this.toDate = null;
          this.fromDate = null;
          this.toDateError = false;
          this.fromDateError = false;
          this.isDateBefore = true;
          this.otherFlag = true;
          this.calculateDateFrom(30);
          this.setFilterData();
        } else if (this.filterkey?.logLevel == 3) {
          this.toDate = null;
          this.fromDate = null;
          this.toDateError = false;
          this.fromDateError = false;
          this.isDateBefore = true;
          this.otherFlag = true;
          this.calculateDateFrom(180);
          this.setFilterData();
        } else {
          this.toDate = null;
          this.fromDate = null;
          this.toDateError = false;
          this.fromDateError = false;
          this.isDateBefore = true;
          this.otherFlag = false;
          this.toDate = moment(Date.now()).format('YYYY/MM/DD HH:MM');
          const date = new Date();
          this.fromDate = moment(date.setHours(0, 0, 0, 0)).format('YYYY/MM/DD HH:MM');
          this.toDate = this.timeCal(this.toDate);
          this.setFilterData();
        }
      } else {
        delete this.selectedFilter['logLevel'];
      }
    }
    if (this.selectedFilter?.hasOwnProperty('merchant')) {
      if (this.selectedFilter['merchant']) {
        this.filterkey.merchant = this.selectedFilter['merchant'];
        delete this.selectedFilter['merchant'];
      } else {
        delete this.selectedFilter['merchant'];
      }
    }
    if (this.selectedFilter?.hasOwnProperty('device')) {
      if (this.selectedFilter['device']) {
        this.filterkey.device = this.selectedFilter['device'];
        delete this.selectedFilter['device'];
      } else {
        delete this.selectedFilter['device'];
      }
    }
    if (this.selectedFilter?.hasOwnProperty('logStatus')) {
      if (this.selectedFilter['logStatus']) {
        this.filterkey.logStatus = this.selectedFilter['logStatus'];
        delete this.selectedFilter['logStatus'];
      } else {
        delete this.selectedFilter['logStatus'];
      }
    }
    if (this.selectedFilter?.hasOwnProperty('txnType')) {
      if (this.selectedFilter['txnType']) {
        this.filterkey.txnType = this.selectedFilter['txnType'];
        delete this.selectedFilter['txnType'];
      } else {
        delete this.selectedFilter['txnType'];
      }
    }
    if (this.selectedFilter?.hasOwnProperty('sourceAcq')) {
      if (this.selectedFilter['sourceAcq']) {
        this.filterkey.sourceAcq = this.selectedFilter['sourceAcq'];
        delete this.selectedFilter['sourceAcq'];
      } else {
        delete this.selectedFilter['sourceAcq'];
      }
    }
    if (this.selectedFilter?.hasOwnProperty('processorAdpCode')) {
      if (this.selectedFilter['processorAdpCode']) {
        this.filterkey.processorAdpCode = this.selectedFilter['processorAdpCode'];
        delete this.selectedFilter['sourceAcq'];
      } else {
        delete this.selectedFilter['processorAdpCode'];
      }
    }
    this.autoScroll();
    this.request = true;
    if (this.totalRecords === this.rows?.length) {
      this.request = false;
    }
  }
  autoScroll() {
    let scrollerHeight = this.scrollHeight;
    setTimeout(function () {
      jQuery('.datatable-body').animate(
        {
          scrollTop: scrollerHeight,
        },
        100,
      );
    });
  }

  public checkStorage() {
    this.isDetailPage = localStorage.getItem('detailPage');
    localStorage.removeItem('detailPage');
  }

  public defaultFilters() {
    this.filterkey.logLevel = 1;
    this.calculateDateFrom(7);
    this.otherFlag = true;
    this.setFilterData();
  }

  public getCellClass({ row, column, value }): String {
    return value.toLocaleLowerCase() === 'online' ? ' online' : ' offline';
  }

  public getKey(data: any) {
    return Object.entries(data.keys).map(([key, value]) => ({ key, value }));
  }

  viewJson(data: any) {
    this.keyData = data;
    this.visibleJson = true;
  }
  closeJson(event: any): void {
    this.visibleJson = false;
  }
  createJson(event: any) {
    this.visibleJson = false;
  }

  requestMatrix(data: any) {
    this.matId = data;
    this.visibleMat = true;
  }
  matCloseDrawer(event: any): void {
    this.visibleMat = false;
  }
  matCreate(event: any) {
    this.visibleMat = false;
  }

  responseMatrix(data: any) {
    this.resIdView = data;
    this.isvisibleviewRes = true;
  }
  rescloseDrawer(event: any): void {
    this.isvisibleviewRes = false;
  }
  rescreate(event: any) {
    this.isvisibleviewRes = false;
  }

  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }

  public close(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  private _dataTransform(Transactionlogs: any) {
    return Transactionlogs !== null
      ? Transactionlogs.map((item: any) => {
          if (item) {
            if (item.rrn == null && item.messageTypeIndicator == null) {
              item.height = 68;
            } else if (item.rrn == null || item.messageTypeIndicator == null) {
              item.height = 82;
            } else {
              item.height = 110;
            }
            item.id = item.id;
            item.destinations = item.destinations;
            item.guid = item.guid;
            return item;
          }
        })
      : null;
  }

  txnLogDrawer(data: any) {
    localStorage.setItem('_page', JSON.stringify(this._page));
    localStorage.setItem('rows', JSON.stringify(this.rows));
    localStorage.setItem('filter', JSON.stringify(this.filterkey));
    this.idView = data.txnId;
    this.isvisibleview = true;
  }
  txncloseDrawer(event: any): void {
    this.isvisibleview = false;
  }
  txncreate(event: any) {
    this.isvisibleview = false;
  }

  private _transFilters() {
    const output = Object.keys(this._filters);
    if (output?.length) {
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

  private _transSelectedFilters() {
    const output = Object.keys(this.selectedFilter);
    return output
      .map(item => {
        return item + ':' + this.selectedFilter[item];
      })
      .join(',');
  }

  public onScroll(offsetY: any) {
    const THis = this;
    jQuery('.datatable-body').on('scroll', function () {
      let div = jQuery(this).get(0);
      localStorage.setItem('scrollTop', JSON.stringify(div.scrollTop));
      if (div.scrollTop + div.clientHeight >= div.scrollHeight - 40) {
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
    this.loading = true;
    this._store.dispatch(
      new GetTransactionLogs({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  public getFilterNameData(eventData: any) {
    if (this.place) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['txnId'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['txnId'] = eventData.currentTarget.value;
        } else {
          this.resetFilterSearch();
        }
        this._page = 1;
        this.loadPage(this._page);
      }
    }
    if (this.maskedCardNumber) {
      this._filters['maskedCardNumber'] = this.place;
    } else {
      delete this._filters['maskedCardNumber'];
    }
  }

  public getFilterMaskedcardNumber(eventData: any) {
    if (this.maskedCardNumber) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['maskedCardNumber'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['maskedCardNumber'] = this.convertData(eventData.currentTarget.value);
        } else {
          this.resetFilterSearch();
        }
      }
    }

    if (this.place) {
      this._filters['txnId'] = this.place;
    } else {
      delete this._filters['txnId'];
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public convertData(data) {
    return data.trim();
  }

  public getFilterAcquirerIDData(eventData: any) {
    if (this.acquirerID) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['destinationAcq'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['destinationAcq'] = eventData.currentTarget.value;
        } else {
          this.resetFilterSearch();
        }
        this._page = 1;
        this.loadPage(this._page);
      }
    }
  }

  public getFilterRetrievalData(eventData: any) {
    if (this.rrn) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['rrn'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['rrn'] = eventData.currentTarget.value;
        } else {
          this.resetFilterSearch();
        }
        this._page = 1;
        this.loadPage(this._page);
      }
    }
  }

  public getFilterUuidData(eventData: any) {
    if (this.uuid) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['uuid'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['uuid'] = eventData.currentTarget.value;
        } else {
          this.resetFilterSearch();
        }
        this._page = 1;
        this.loadPage(this._page);
      }
    }
  }

  public getFilterSafQueueList(eventData: any) {
    if (!eventData) {
      delete this._filters['saf'];
    } else {
      if (eventData.name && eventData.name !== '') {
        this._filters['saf'] = eventData.name;
      } else {
        this.resetFilterSearch();
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  public getFilterAuthList(eventData: any) {
    if (!eventData) {
      delete this._filters['auth'];
    } else {
      if (eventData.name && eventData.name !== '') {
        this._filters['auth'] = eventData.name;
      } else {
        this.resetFilterSearch();
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  public getFilterMessageList(eventData: any) {
    if (!eventData) {
      delete this._filters['msgType'];
    } else {
      if (eventData.name && eventData.name !== '') {
        this._filters['msgType'] = eventData.name;
      } else {
        this.resetFilterSearch();
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  public getFilterAmountData(eventData: any) {
    if (this.reqamount) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['amount'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['amount'] = eventData.currentTarget.value;
        } else {
          this.resetFilterSearch();
        }
        this._page = 1;
        this.loadPage(this._page);
      }
    }
  }

  public getFilterResponseCodeData(eventData: any) {
    if (this.responseCode) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['responseCode'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['responseCode'] = eventData.currentTarget.value;
        } else {
          this.resetFilterSearch();
        }
        this._page = 1;
        this.loadPage(this._page);
      }
    }
  }

  public resetFilterSearch() {
    this.filterkey = {};
    this._filters = [];
    this.place = '';
    this.maskedCardNumber = '';
    this.acquirerID = '';
    this.rrn = '';
    this.uuid = '';
    this.reqamount = '';
    this.responseCode = '';
    this.selectedSafQueueList = this.safQueueList;
    this.selectedAuthList = this.authList;
    this.selectedMessageList = this.messageList;
    this.fromDate = null;
    this.toDate = null;
    this.fromDate_futureDateTime = false;
    this.toDate_futureDateTime = false;
    this.toDateError = false;
    this.fromDateError = false;
    this.defaultFilters();
    this._page = 1;
    this.isDateBefore = true;
    this.filter.period = [this.day_1, this.end];
    this.onChange(this.filter.period);
    this.loadPage(this._page);
  }

  public resetSearch() {
    this.place = '';
    this.rows = [];
    delete this._filters['txnId'];
    this._page = 1;
    this.loadPage(this._page);
    this.searchResetButton = true;
  }

  public getFilterStatus(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = eventData.id;
    }
    this.loadPage(this._page);
  }

  public getFilterCurrency(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['currency'];
    } else {
      this._filters['currency'] = eventData.id;
    }
    this.loadPage(this._page);
  }

  public getFilterDestination(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['destination'];
    } else {
      this._filters['destination'] = eventData.id;
    }
    this.loadPage(this._page);
  }

  public getFilterDevice(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['device'];
    } else {
      this._filters['device'] = eventData.id;
    }
    this.loadPage(this._page);
  }

  public getFilterMerchant(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['merchant'];
    } else {
      this._filters['merchant'] = eventData.id;
    }
    this.loadPage(this._page);
  }

  public getFilterTxnType(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['txnType'];
    } else {
      this._filters['txnType'] = eventData;
    }
    this.loadPage(this._page);
  }

  public showDiv() {
    this.divFlag = !this.divFlag;
  }

  public onReview(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['forReview'];
    } else {
      this._filters['forReview'] = !this.forReview;
    }
    this.loadPage(this._page);
    this.forReview = !this.forReview;
  }

  public getInput(eventData) {}

  public checkDateFlagForSelectedFilter(id): void {
    this.toDate = null;
    this.fromDate = null;
    this.toDateError = false;
    this.fromDateError = false;
    this.isDateBefore = true;
    if (id) {
      this.otherFlag = true;
      switch (id) {
        case 1:
          this.calculateDateFrom(7);
          this.setFilterData();
          this.loadPage(this._page);
          break;

        case 2:
          this.calculateDateFrom(30);
          this.setFilterData();
          this.loadPage(this._page);
          break;

        case 3:
          this.calculateDateFrom(180);
          this.setFilterData();
          this.loadPage(this._page);
          break;

        default:
          this.otherFlag = false;
          this.toDate = moment(Date.now()).format('YYYY/MM/DD HH:MM');
          const date = new Date();
          this.fromDate = moment(date.setHours(0, 0, 0, 0)).format('YYYY/MM/DD HH:MM');
          this.toDate = this.timeCal(this.toDate);
          this.setFilterData();
          break;
      }
    } else if (!id) {
      this.otherFlag = true;
      delete this._filters['period'];
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  public checkDateFlag(event): void {
    this.toDate = null;
    this.fromDate = null;
    this.toDateError = false;
    this.fromDateError = false;
    this.isDateBefore = true;
    if (event) {
      this.otherFlag = true;
      switch (event.id) {
        case 1:
          this.calculateDateFrom(7);
          this.setFilterData();
          break;

        case 2:
          this.calculateDateFrom(30);
          this.setFilterData();
          break;

        case 3:
          this.calculateDateFrom(180);
          this.setFilterData();
          break;

        default:
          this.otherFlag = false;
          this.toDate = moment(Date.now()).format('YYYY/MM/DD HH:MM');
          const date = new Date();
          this.fromDate = moment(Date.now()).format('YYYY/MM/DD HH:MM');
          this.toDate = this.timeCal(this.toDate);
          this.fromDate = this.timeCal(this.fromDate);
          this.setFilterData();
          break;
      }
    } else if (!event) {
      this.otherFlag = true;
      delete this._filters['period'];
      this._page = 1;
    }
  }

  public calculateDateFrom(event): void {
    this.fromDate = moment(Date.now() - event * 24 * 3600 * 1000).format('YYYY/MM/DD HH:MM');
    this.fromDate = this.timeCal(this.fromDate);
    this.toDate = moment(Date.now()).format('YYYY/MM/DD HH:MM');
    this.toDate = this.timeCal(this.toDate);
  }

  public timeCal(data) {
    const timeSplit = data.split(' ');
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    timeSplit[1] = currentDate.getHours() + ':' + (minutes <= 9 ? `0${minutes}` : minutes);
    const currentTime = timeSplit.join(' ');
    return currentTime;
  }

  toDataUpdated() {
    if (this.filterkey.logLevel === 4) {
      if (this.toDate) {
        this.toDateError = false;
        this.isDateBefore = moment(this.fromDate).isBefore(this.toDate);
      } else {
        this.toDateError = true;
      }
    }
  }

  public calculatefromDate(event): void {
    if (event) {
      this.fromDateError = false;
      const nowdate = moment(Date.now() + 1 * 60 * 60 * 1000).format('YYYY/MM/DD HH:MM');
      let selectdate = Date.parse(event) / 1000;
      let nowdatetimes = Date.parse(nowdate) / 1000;
      this.toDate ? (this.isDateBefore = moment(event).isBefore(this.toDate)) : this.isDateBefore;
      if (selectdate <= nowdatetimes) {
        this.fromDate_futureDateTime = false;
        this.fromDate = event;
      } else {
        this.fromDate_futureDateTime = true;
      }
    } else {
      this.isDateBefore = true;
      this.fromDate_futureDateTime = false;
    }
  }

  public calculateToDate(event): void {
    if (event) {
      this.toDateError = false;
      this.isDateBefore = true;
      const nowdate = moment(Date.now() + 1 * 60 * 60 * 1000).format('YYYY/MM/DD HH:MM');
      let selectdate = Date.parse(event) / 1000;
      let nowdatetimes = Date.parse(nowdate) / 1000;
      this.fromDate
        ? (this.isDateBefore = moment(this.fromDate).isBefore(event))
        : this.isDateBefore;
      if (selectdate <= nowdatetimes) {
        this.toDate_futureDateTime = false;
        this.toDate = event;
      } else {
        this.toDate_futureDateTime = true;
      }
    } else {
      this.isDateBefore = true;
      this.toDate_futureDateTime = false;
    }
  }

  public calculateDateDifference() {
    if (this.fromDate && this.toDate) {
      this.dateTimestamp1 = Date.parse(this.fromDate) / 1000;
      this.dateTimestamp2 = Date.parse(this.toDate) / 1000;
    }
  }

  fromDataUpdated() {
    if (this.filterkey.logLevel === 4) {
      if (this.fromDate) {
        this.fromDateError = false;
      } else {
        this.fromDateError = true;
      }
    }
  }

  public setFilterData(): void {
    this.calculateDateDifference();
    this._filters['period'] = this.dateTimestamp1 + '-' + this.dateTimestamp2;
    this.selectedFilter['period'] = this.dateTimestamp1 + '-' + this.dateTimestamp2;
  }

  public getTransactionLogsData(): void {
    delete this._filters['merchant'];
    delete this._filters['device'];
    delete this._filters['status'];
    delete this._filters['txnType'];
    delete this._filters['destinationAcq'];
    delete this._filters['rrn'];
    delete this._filters['uuid'];
    delete this._filters['amount'];
    delete this._filters['responseCode'];
    delete this._filters['sourceAcq'];
    delete this._filters['processorAdpCode'];
    delete this._filters['saf'];
    delete this._filters['auth'];
    delete this._filters['msgType'];
    delete this._filters['txnId'];
    delete this._filters['maskedCardNumber'];
    if (this.acquirerID && this.acquirerID !== '') {
      this._filters['destinationAcq'] = this.acquirerID;
    }
    if (this.rrn && this.rrn !== '') {
      this._filters['rrn'] = this.rrn;
    }
    if (this.uuid && this.uuid !== '') {
      this._filters['uuid'] = this.uuid;
    }
    if (this.reqamount && this.reqamount !== '') {
      this._filters['amount'] = this.reqamount;
    }
    if (this.responseCode && this.responseCode !== '') {
      this._filters['responseCode'] = this.responseCode;
    }
    if (this.filterkey.sourceAcq && this.filterkey.sourceAcq !== '') {
      this._filters['sourceAcq'] = this.filterkey.sourceAcq;
    }
    if (this.filterkey.processorAdpCode && this.filterkey?.processorAdpCode !== '') {
      this._filters['processorAdpCode'] = this.filterkey?.processorAdpCode;
    }
    if (this.selectedSafQueueList && this.selectedSafQueueList !== this.safQueueList) {
      this._filters['saf'] = this.selectedSafQueueList;
    }
    if (this.selectedAuthList && this.selectedAuthList !== this.authList) {
      this._filters['auth'] = this.selectedAuthList;
    }
    if (this.selectedMessageList && this.selectedMessageList !== this.messageList) {
      this._filters['msgType'] = this.selectedMessageList;
    }
    if (this.filterkey.device && this.filterkey.device !== '') {
      this._filters['device'] = this.filterkey.device;
    }
    if (this.filterkey.merchant && this.filterkey.merchant !== '') {
      this._filters['merchant'] = this.filterkey.merchant;
    }
    if (this.filterkey.logStatus && this.filterkey.logStatus !== '') {
      this._filters['status'] = this.filterkey.logStatus;
    }
    if (this.filterkey.txnType && this.filterkey.txnType !== '') {
      this._filters['txnType'] = this.filterkey.txnType;
    }
    if (this.place && this.place !== '') {
      this._filters['txnId'] = this.place;
    }
    if (this.maskedCardNumber && this.maskedCardNumber !== '') {
      this._filters['maskedCardNumber'] = this.convertData(this.maskedCardNumber);
    }
    if (this.otherFlag === false) {
      this.filterLoading = true;
      this.setFilterData();
      this._page = 1;
      this.loadPage(this._page);
    } else {
      this.filterLoading = true;
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  public refreshData() {
    this.filterLoading = true;
    this.filter.period = [this.day_1, this.end];
    this.onChange(this.filter.period);
    this.loadPage(this._page);
  }

  copyToClipboard(item, event) {
    this.copied = true;
    this._clipboardService.copyFromContent(item);
    setTimeout(() => {
      this.copied = false;
    }, 1000);
  }

  public reset(event): void {
    delete this._filters[event];
    if (this._filters?.length === 0) {
      this.resetFlag = false;
    } else {
      this.resetFlag = true;
    }
    this.loadPage(this._page);
  }

  getParams(row) {
    let name = '';
    row &&
      row.infoParams?.length &&
      row.infoParams.forEach(params => {
        params.params &&
          params.params?.length &&
          params.params.forEach(ele => {
            if (!name) {
              name = `${ele.key}:${ele.value}`;
            } else {
              name = `${name} \n ${ele.key}:${ele.value}`;
            }
          });
      });
    console.log('getParams', name);
    return name;
  }

  public resetAll(): void {
    this.resetFlag = false;
    this._filters = [];
    this.loadPage(this._page);
  }

  // Load More Event
  public loadMore() {
    this.isLoading = true;
    if (!this.sourceLoad) return;
    this._txnService
      .getSourceAcquirer({
        page: this.sourceAcquirerDataPage,
        'page-size': this.currentPagination,
        filters: this.queryString,
      })
      .subscribe(item => {
        if (item.data.content?.length) {
          this.sourceLoad = true;
          this.sourceAcquirerData = [...this.sourceAcquirerData, ...item.data.content];
          this.sourceAcquirerDataPage = this.sourceAcquirerDataPage + 1;
        } else {
          this.sourceAcquirerData = [...this.sourceAcquirerData];
          this.sourceLoad = false;
          this.isLoading = false;
        }
      });
  }

  public loadDeviceData() {
    this.isLoading = true;
    if (!this.deviceLoad) return;
    this._txnService
      .getSourceDevice({
        page: this.DeviceDatapage,
        'page-size': this.currentPagination,
        filters: this.queryString,
      })
      .subscribe(item => {
        if (item.data.content?.length) {
          this.deviceLoad = true;
          this.sourceDeviceData = [...this.sourceDeviceData, ...item.data.content];
          this.DeviceDatapage = this.DeviceDatapage + 1;
        } else {
          this.sourceDeviceData = [...this.sourceDeviceData];
          this.deviceLoad = false;
          this.isLoading = false;
        }
      });
  }

  public loadMerchantData() {
    this.isLoading = true;
    if (!this.merchantLoad) return;
    this._txnService
      .getSourceMerchant({
        page: this.MerchantDatapage,
        'page-size': this.currentPagination,
        filters: this.queryString,
      })
      .subscribe(item => {
        if (item.data.content?.length) {
          this.merchantLoad = true;
          this.sourceMerchantData = [...this.sourceMerchantData, ...item.data.content];
          this.MerchantDatapage = this.MerchantDatapage + 1;
        } else {
          this.sourceMerchantData = [...this.sourceMerchantData];
          this.merchantLoad = false;
          this.isLoading = false;
        }
      });
  }

  public loadDestinationEndpointNameData() {
    this.isLoading = true;
    if (!this.destinationLoad) return;
    this._txnService
      .getSourceDestinationEndpointName({
        page: this.DestinationEndpointpage,
        'page-size': this.currentPagination,
        filters: this.queryString,
      })
      .subscribe(item => {
        if (item.data.content?.length) {
          this.destinationLoad = true;
          this.sourceDestinationEndpointNameData = [
            ...this.sourceDestinationEndpointNameData,
            ...item.data.content,
          ];
          this.DestinationEndpointpage = this.DestinationEndpointpage + 1;
        } else {
          this.sourceDestinationEndpointNameData = [...this.sourceDestinationEndpointNameData];
          this.destinationLoad = false;
          this.isLoading = false;
        }
      });
  }

  // Change Event
  public getSourceFilterData(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['sourceAcq'];
      this.sourceAcquirerData = [];
      this.queryString = '';
      this.loadMore();
    } else {
      this._filters['sourceAcq'] = eventData;
    }
    this.loadPage(this._page);
  }

  public getSourceDeviceFilterData(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['device'];
      this.sourceDeviceData = [];
      this.queryString = '';
      this.loadDeviceData();
    } else {
      this._filters['device'] = eventData;
    }
    this.loadPage(this._page);
  }

  public getSourceMerchantFilterData(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['merchant'];
      this.sourceMerchantData = [];
      this.queryString = '';
      this.loadMerchantData();
    } else {
      this._filters['merchant'] = eventData;
    }
    this.loadPage(this._page);
  }

  public getSourceDestinationEndpointNameFilterData(eventData: HTMLSelectElement) {
    this._page = 1;
    if (!eventData) {
      delete this._filters['processorAdpCode'];
      this.sourceDestinationEndpointNameData = [];
      this.queryString = '';
      this.loadDestinationEndpointNameData();
    } else {
      this._filters['processorAdpCode'] = eventData;
    }
    this.loadPage(this._page);
  }

  // Search Event
  onSearch(event) {
    if (event?.length >= 3 || event === '') {
      this.sourceAcquirerDataPage = 1;
      if (event) {
        this.queryString = event;
      } else {
        this.queryString = '';
      }
      setTimeout(() => {
        this._txnService
          .getSourceAcquirer({
            page: this.sourceAcquirerDataPage,
            'page-size': this.currentPagination,
            filters: this.queryString,
          })
          .pipe(distinctUntilChanged())
          .subscribe(item => {
            if (item.data.content?.length) {
              this.sourceAcquirerData = item.data.content;
            }
            this.sourceAcquirerDataPage = this.sourceAcquirerDataPage + 1;
            this.isLoading = false;
          });
      }, 2000);
    }
  }

  onDeviceSearch(event) {
    if (event?.length >= 3 || event === '') {
      this.DeviceDatapage = 1;
      if (event) {
        this.queryString = event;
      } else {
        this.queryString = '';
      }

      setTimeout(() => {
        this._txnService
          .getSourceDevice({
            page: this.DeviceDatapage,
            'page-size': this.currentPagination,
            filters: this.queryString,
          })
          .pipe(distinctUntilChanged())
          .subscribe(item => {
            if (item.data.content?.length) {
              this.sourceDeviceData = item.data.content;
            }
            this.DeviceDatapage = this.DeviceDatapage + 1;
            this.isLoading = false;
          });
      }, 500);
    }
    if (event != '') {
      this.filterkey.device = event;
    }
  }

  selectTerminalID(event:any) {
    this.filterkey.device = event;
    this.sourceDeviceData.forEach(x=>{
      if(x.key===event){
        this.filterkey.device = event;
      }
      else{
        this.filterkey.device = event;
      }
    })
  }

  onMerchantSearch(event) {
    if (event?.length >= 3 || event === '') {
      this.MerchantDatapage = 1;
      if (event) {
        this.queryString = event;
      } else {
        this.queryString = '';
      }

      setTimeout(() => {
        this._txnService
          .getSourceMerchant({
            page: this.MerchantDatapage,
            'page-size': this.currentPagination,
            filters: this.queryString,
          })
          .pipe(distinctUntilChanged())
          .subscribe(item => {
            if (item.data.content?.length) {
              this.sourceMerchantData = item.data.content;
            }
            this.MerchantDatapage = this.MerchantDatapage + 1;
            this.isLoading = false;
          });
      }, 500);
    }
    if (event != '') {
      this.filterkey.merchant = event;
    }
  }

  selectMerchantID(event:any){
    this.filterkey.merchant = event;
  }

  onDestinationEndpointNameSearch(event) {
    if (event?.length >= 3 || event === '') {
      this.DestinationEndpointpage = 1;
      if (event) {
        this.queryString = event;
      } else {
        this.queryString = '';
      }
      setTimeout(() => {
        this._txnService
          .getSourceDestinationEndpointName({
            page: this.DestinationEndpointpage,
            'page-size': this.currentPagination,
            filters: this.queryString,
          })
          .pipe(distinctUntilChanged())
          .subscribe(item => {
            if (item.data.content?.length) {
              this.sourceDestinationEndpointNameData = item.data.content;
            }
            this.DestinationEndpointpage = this.DestinationEndpointpage + 1;
            this.isLoading = false;
          });
      }, 2000);
    }
  }

  onChange(result: any): void {
    if (result && result.length === 2) {
      this._filters['period'] = `${moment(result[0]).format('X')}-${moment(result[1]).format('X')}`;
      // this._page = 1;
      // this.loadPage(this._page);
    }
  }

  getRowHeight(row) {
    if (!row) {
      return 70;
    }
    if (row.height === undefined) {
      return 70;
    }
    return row.height;
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
