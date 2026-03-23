import { Component, OnInit, TemplateRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ClearState, GetCountries } from '../../store/actions/countries.actions';
import { IAppState } from '../../store/state/app.state';
import { selectCountriesList } from '../../store/selectors/countries.selector';
import { GetFilterData } from '../../store/actions/filter.actions';
import { selectFilterData } from '../../store/selectors/filter.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { CountriesGetObject } from '@app/models/countries.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

declare var jQuery: any;

@Component({
  selector: 'app-countries',
  styleUrls: ['./countries.component.css'],
  templateUrl: './countries.component.html',
})
export class CountriesComponent implements OnInit, OnDestroy {
  public currentPagination = '20';
  public currentLang: string;
  public statusLoading: Boolean = false;
  public Labels: any;
  public rows: any = [];
  public rowBackup: any;
  public columns: any;
  public countriesData: any;
  confirmModal?: NzModalRef;
  public searchData: any = [];
  public dimensions = {
    footerHeight: 40,
    headerHeight: 40,
    rowHeight: 50,
  };
  private _filters: Array<any> = [];
  public visibleAnimate = false;
  public permission: any;
  public visible = false;
  public rowId: any;
  public statusList: any;
  public countriesId = 'link_countries';
  public loading = true;
  public objectData: any;
  public place: any = '';
  componetDestroyed = new Subject();

  private _page = 1;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  public request: Boolean = true;
  public searchResetButton: Boolean = true;
  public currentElement: any = [];

  @ViewChild('active', { static: true }) active: TemplateRef<any>;
  @ViewChild('action', { static: true }) action: TemplateRef<any>;
  @ViewChild('currency', { static: true }) currency: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  constructor(private _store: Store<IAppState>, private translate: TranslateService) {  }

  ngOnInit() {
    this._store.dispatch(new GetFilterData('/countries/filter'));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectFilterData))
      .subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure') {
          this.statusList = filter.data.status;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectCountriesList))
      .subscribe((data: CountriesGetObject) => {
        if (data) {
          this.request = true;
          this.countriesData = data.data;
          if (this._page === 1) {
            this.rows = this.countriesData.countryList;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(this.countriesData.countryList);
          }
          if (this.countriesData['total-filtered-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = this.countriesData['total-record'];
          this.loading = false;
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectPermissionsData))
      .subscribe((response: any) => { 
        if (response) {
          this.permission = response.data.find(item => item.id === this.countriesId);
        }
      });
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
    this.translate
      .get(['COUNTRY_NAME', 'STATUS', 'CURRENCY', 'CODE', 'ISOCODE', 'ISDCODE'])
      .subscribe(translation => {
        this.columns = [
          {
            Searchable: true,
            name: translation.COUNTRYNAME,
            prop: 'countryName',
            width: 250,
          },
          {
            cellTemplate: this.active,
            name: translation.STATUS,
            prop: 'active',
            sortable: false,
          },
          {
            Searchable: true,
            cellTemplate: this.currency,
            name: translation.CURRENCY,
            prop: 'currency',
            sortable: false,
          },
          { prop: 'code', name: translation.CODE, Searchable: true },
          { prop: 'isoCode', name: translation.ISOCODE, Searchable: true },
          { prop: 'isdCode', name: translation.ISDCODE, Searchable: true },
          //   {
          //     cellTemplate: this.action,
          //     name: translation.ACTION,
          //     prop: 'action',
          //     sortable: false,
          //   },
        ];
        this.searchValues();
      });
  }

  public searchValues() {
    this.searchData = this.columns
      .map(value => {
        if (value.Searchable) {
          return value.prop;
        }
      })
      .filter(item => item);
    this.searchData.push('mobileNum');
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

  public getFilterStatusData(eventData: any) {
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
        delete this._filters['countryName'];
      } else {
        this._filters['countryName'] = eventData.currentTarget.value;
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  public resetSearch() {
    this.place = '';
    delete this._filters['countryName'];
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
      new GetCountries({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
