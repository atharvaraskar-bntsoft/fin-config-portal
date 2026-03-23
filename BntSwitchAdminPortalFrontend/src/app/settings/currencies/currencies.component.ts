import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClearState, GetCurrencies } from '../../store/actions/currencies.action';
import { selectCurrenciesList } from '../../store/selectors/currencies.selector';
import { GetFilterData } from '../../store/actions/filter.actions';
import { selectFilterData } from '../../store/selectors/filter.selectors';
import { IAppState } from '../../store/state/app.state';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { CurrencyGetObject } from '@app/models/currencies.interface';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Utils } from 'src/utils';
declare var jQuery: any;

@Component({
  selector: 'app-currencies',
  styleUrls: ['./currencies.component.scss'],
  templateUrl: './currencies.component.html',
})
export class CurrenciesComponent implements OnInit {
  public statusList: any;
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any;
  confirmModal?: NzModalRef;
  public rows: any = [];
  public rowBackup: any;
  public columns: any;
  private _filters: Array<any> = [];
  public statusLoading: Boolean = false;
  public visibleAnimate = false;
  public visible = false;
  public rowId: any;
  public objectData: any;
  public dimensions = {
    footerHeight: 40,
    headerHeight: 40,
    rowHeight: 50,
  };
  public loading = true;
  public currenciesId = 'link_currencies';
  public currenciesData: any;
  public permission = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public place: any = '';

  private _page = 1;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  public request: Boolean = true;
  public searchResetButton: Boolean = true;
  public currentElement: any = [];

  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private modal: NzModalService,
  ) { }

  ngOnInit() {
    
    this._store.pipe(select(selectCurrenciesList)).subscribe((data: CurrencyGetObject) => {
      if (data) {
        this.request = true;
        this.currenciesData = data.data;
        if (this._page === 1) {
          this.rows = this.currenciesData.currencyList;
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(this.currenciesData.currencyList);
        }
        if (this.currenciesData['total-filtered-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = data.data['total-record'];

        this.loading = false;
      }
    });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.currenciesId);
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
    this._store.dispatch(new GetFilterData('/currencies/filter'));
    this._store.pipe(select(selectFilterData)).subscribe(filter => {
      if (filter && filter !== null && filter.status !== 'failure') {
        this.statusList = filter.data.status;
      }
    });
    this.translate
      .get(['CURRENCY', 'STATUS', 'CODE', 'ISOCODE', 'CURRENCY_MINOR_UNIT'])
      .subscribe(translation => {
        this.columns = [
          {
            Searchable: true,
            name: translation.CURRENCY,
            prop: 'currencyName',
          },
          {
            Searchable: true,
            cellTemplate: this.status,
            name: translation.STATUS,
            prop: 'active',
          },
          { prop: 'code', name: translation.CODE, Searchable: true },
          { prop: 'isoCode', name: translation.ISOCODE, Searchable: true },
          { prop: 'currencyMinorUnit', name: translation.CURRENCY_MINOR_UNIT },
          //   {
          //     prop: 'active',
          //     name: translation.ACTION,
          //     cellTemplate: this.actions,
          //     sortable: false,
          //   },
        ];
      });
  }

  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }

  public cancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  public getFilterStatus(eventData: any) {    
    if (!eventData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  private _transFilters() {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public getFilterNameData(eventData: any) {
    if (this.place) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['currencyName'];
      } else {
        this._filters['currencyName'] = eventData.currentTarget.value;
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  public resetSearch() {
    this.place = '';
    delete this._filters['currencyName'];
    this._page = 1;
    this.loadPage(this._page);
    this.searchResetButton = true;
  }
  public resetUpload() {
    this._store.dispatch(new ClearState());
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
      new GetCurrencies({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
}
