import { Component, OnInit, TemplateRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { IAppState } from '../../store/state/app.state';
import { GetFilterData, ClearFilterData } from '../../store/actions/filter.actions';
import { selectFilterData } from '../../store/selectors/filter.selectors';
import { ClearState, GetCountryState } from '../../store/actions/country-states.action';
import { selectCountryStatesList } from '../../store/selectors/country-state-scheme.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { CountryStateGetObject } from '@app/models/country-states.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Utils } from 'src/utils';

declare var jQuery: any;

@Component({
  selector: 'app-country-states',
  styleUrls: ['./country-states.component.scss'],
  templateUrl: './country-states.component.html',
})
export class CountryStatesComponent implements OnInit, OnDestroy {
  public countryList: any;
  public statusLoading: Boolean = false;
  public statusList: any;
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any;
  public rows: any = [];
  public rowBackup: any;
  public columns: any;
  private _filters: Array<any> = [];
  public visibleAnimate = false;
  public visible = false;
  public rowId: any;
  confirmModal?: NzModalRef;
  public objectData: any;
  public countriesStateData: any;
  public permission: any;
  public dimensions = {
    footerHeight: 40,
    headerHeight: 40,
    rowHeight: 50,
  };
  public url = '/states/filter';
  public loading = true;
  public filter: any = {};
  public countryStateId = 'link_country_states';
  public place: any = '';
  public request: Boolean = true;
  public searchResetButton: Boolean = true;
  private _page = 1;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 20;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public currentElement: any = [];
  public resetButtonFlag: Boolean = false;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('country', { static: true }) country: TemplateRef<any>;
  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  componetDestroyed = new Subject();
  @ViewChild('myTable', { static: true }) table;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _route: ActivatedRoute,
    private translate: TranslateService,
    private el: ElementRef,
    private modal: NzModalService,
  ) {
    this._route.queryParams.subscribe(params => {
      if (params) {
        const output = Object.keys(params);
        output.forEach(item => {
          this._filters[item] = params[item];
        });        
        if (this._filters) {
          this.filter.country = this._filters['country'];
        }
      }
      this._transFilters();
    });

    this._store.dispatch(new GetFilterData('/states/filter'));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectFilterData))
      .subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure') {
          this.countryList = filter.data.country;
          this.statusList = filter.data.status;
          this._store.dispatch(new ClearFilterData());
        }
      });
  }

  public loadData() {
    this._store.dispatch(new GetCountryState());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectCountryStatesList))
      .subscribe((data: any) => {
        if (data) {
          this.request = true;
          this.countriesStateData = data.data.stateList;
          if (this._page === 1) {
            this.rows = this.countriesStateData;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(this.countriesStateData);
          }
          if (this.countriesStateData['total-filtered-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = data.data['total-record'];
          //this.totalRecords = data['total-record'];
          this.loading = false;
        }
      });
  }

  public viewSettingData() {
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
  }

  public permissionData() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectPermissionsData))
      .subscribe((response: any) => {
        if (response) {
          this.permission = response.data.find(item => item.id === this.countryStateId);
          this.permissionObject = this.permission;
        }
      });
  }

  ngOnInit() {
    this.loadData();
    this.viewSettingData();
    this.permissionData();
    this.translate.get(['CountryStates', 'STATUS', 'CODE', 'COUNTRY']).subscribe(translation => {
      this.columns = [
        {
          Searchable: true,
          name: translation.COUNTRYSTATES,
          prop: 'stateName',
          width: 70,
        },
        {
          Searchable: true,
          cellTemplate: this.status,
          name: translation.STATUS,
          prop: 'status',
          sortable: false,
          width: 10,
        },
        { prop: 'code', name: translation.CODE, Searchable: true, width: 10 },
        {
          Searchable: true,
          cellTemplate: this.country,
          name: translation.COUNTRY,
          prop: 'country',
          sortable: false,
        },
        //   {
        //     cellTemplate: this.actions,
        //     name: translation.ACTION,
        //     prop: 'action',
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

  public getFilterStatus(eventData: HTMLSelectElement) {
    if (!eventData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getFilterCountries(eventData: HTMLSelectElement) {
    if (!eventData) {
      delete this._filters['country'];
    } else {
      this._filters['country'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  private _transFilters() {
    const output = Object.keys(this._filters);
    if (output.length) {
      this.resetButtonFlag = true;
    } else {
      this.resetButtonFlag = false;
    }
    return (
      output
        // return Object.keys(this._filters)
        .map(item => {
          return item + ':' + this._filters[item];
        })
        .join(',')
    );
  }

  public getFilterNameData(eventData: any) {
    if (this.place) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['stateName'];
      } else {
        this._filters['stateName'] = eventData.currentTarget.value;
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  public resetSearch() {
    this.place = '';
    delete this._filters['stateName'];
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
      new GetCountryState({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  public resetFilterSearch() {
    this.filter = {};
    this._filters = [];
    this._page = 1;
    this.loadPage(this._page);
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
