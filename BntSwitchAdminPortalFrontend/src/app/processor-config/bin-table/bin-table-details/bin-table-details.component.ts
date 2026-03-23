import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { GetBinMasterAll, GetBinTableDetails } from '@app/store/actions/bin-table.action';
import { selectBinDataDetails, selectBinMasterAll } from '@app/store/selectors/bin-table.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SubscribeService } from '@app/services/subscribe.services';
declare var jQuery: any;

@Component({
  selector: 'app-bin-table-details',
  templateUrl: './bin-table-details.component.html',
  styleUrls: ['./bin-table-details.component.scss'],
})
export class BinTableDetailsComponent implements OnInit {
  public rows: any;
  public columns: any;
  public attributeData: any;
  public fileNames: any;
  readonly headerHeight = 40;
  public currentLang: string;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  private _page = 1;
  public request: Boolean = true;
  public loading = true;
  public resetButtonFlag: Boolean = true;
  public currentPagination = '20';
  public binTableDetailsData: Array<any> = [];
  public totalRecords: Number;
  private _filters: Array<any> = [];
  public id: string;
  public isAttributesVisible = false;
  componetDestroyed = new Subject();
  @ViewChild('binAttributes', { static: true }) binAttributes: TemplateRef<any>;
  @ViewChild('action', { static: true }) action: TemplateRef<any>;
  selectedId: number;
  public filterkey: any = {}
  public filterBinData: any = [];
  public isLoading = true;
  public queryString; public filterPage = 1;
  constructor(
    private _store: Store<IAppState>,
    private _route: Router,
    private _router: ActivatedRoute,
    private _subscribeService: SubscribeService,
    private translate: TranslateService,
  ) {
   
  }

  // Search Event
  onSearch(event) {
    if (event.length >= 3 || event === '') {
      this.filterPage = 1;
      var payload = {
        page: this.filterPage,
        'page-size': this.currentPagination,
        'smart-query-id': 'binTable.BinFilter',
        'smart-query-params': `binMasterId:${this.filterkey.binmasterid}`,
        filters: null
      }
      if (event) {
        payload.filters = `value:${event}`
      }
      setTimeout(() => {
        this._subscribeService
          .getFilterData(payload)
          .pipe(distinctUntilChanged())
          .subscribe(item => {
            this.filterBinData = item.data.content;
            this.filterPage = this.filterPage + 1;
            this.isLoading = false;
          });
      }, 2000);
    }
  }

  // Load More Event
  public loadMore() {
    this.request = false;
    this.isLoading = true;
    var payload = {
      page: this.filterPage,
      'page-size': this.currentPagination,
      'smart-query-id': 'binTable.BinFilter',
      'smart-query-params': `binMasterId:${this.filterkey.binmasterid}`,
      filters: null
    }
    if (this.queryString) {
      payload.filters = `value:${this.queryString}`
    }
    this._subscribeService
      .getFilterData(payload)
      .subscribe(item => {
        if (item.data.content.length) {
          this.filterBinData = [...this.filterBinData, ...item.data.content];
        }
        this.filterPage = this.filterPage + 1;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.id = this._router.snapshot.paramMap.get('id');
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
      .pipe(takeUntil(this.componetDestroyed), select(selectBinDataDetails))
      .subscribe((response: any) => {
        if (response) {
          this.request = true;
          if (this._page === 1) {
            this.binTableDetailsData = response.BinTableList;
          } else if (this.binTableDetailsData.length > 0) {
            this.binTableDetailsData = this.binTableDetailsData.concat(response.BinTableList);
          }
          if (response['total-record'] === this.binTableDetailsData.length) {
            this.request = false;
          }
          this.totalRecords = response['total-record'];
          this.loading = false;
        }
      });
    this._store.dispatch(new GetBinMasterAll());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectBinMasterAll))
      .subscribe((response: any) => {
        if (response) {
          this.fileNames = response.data;
          if (this.id) {
            this.filterkey.binmasterid = parseInt(this.id);
            this._filters['binmasterid'] = this.filterkey.binmasterid
            this.loadPage(this._page);
            this.loadMore()
          }
        }
      });
    this.translate
      .get([
        'BIN',
        'MOD10',
        'ONUS',
        'INTERNATIONAL',
        'PRODUCT_TYPE',
        'ACCEPTANCE_BRAND',
        'ACCOUNT_TYPE',
        'BIN_ATTRIBUTES',
        'ACTIVATED_ON',
      ])
      .subscribe(translation => {
        this.columns = [
          { prop: 'bin', name: translation.BIN },
          { prop: 'mod10', name: translation.MOD10 },
          { prop: 'onus', name: translation.ONUS },
          { prop: 'international', name: translation.INTERNATIONAL },
          { prop: 'productType', name: translation.PRODUCT_TYPE },
          { prop: 'brand', name: translation.ACCEPTANCE_BRAND },
          { prop: 'action', name: translation.ACCOUNT_TYPE, cellTemplate: this.action },
          {
            prop: 'binAttributes',
            name: translation.BIN_ATTRIBUTES,
            cellTemplate: this.binAttributes,
          },
        ];
      });
  }

  public openModal(row) {
    this.isAttributesVisible = true;
    this.attributeData = row.binAttributes;
  }

  public closeModal() {
    this.isAttributesVisible = false;
  }

  public openAccountType(row) {
    this._route.navigate(['/processor-config/bin-table/account-type-details', row.id]);
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
    const reqObj = {
      filters: this._transFilters(),
      page: pagenumber,
      'page-size': this.currentPagination,
    };
    if (this.id) {
      reqObj['id'] = this.id;
    }
    this._store.dispatch(new GetBinTableDetails({ ...reqObj }));
    this.request = false;
  }

  private _transFilters() {
    const output = Object.keys(this._filters);
    return output
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  resetFilter() {
    this.resetButtonFlag = false;
    this.id = null;
    this.filterkey.bin = null
    this.filterkey.binmasterid = null
    delete this._filters['bin']
    delete this._filters['binmasterid'];
    this.filterBinData = [];
    this.loadPage(this._page);
  }

  binFileChange($event) {
    this.resetButtonFlag = true;
    this.id = $event && $event.id;
    this._filters['binmasterid'] = this.id
    this._page = 1;
    this.loadPage(this._page)
    this.filterkey.bin = null
    delete this._filters['bin']
    this.loadMore()
  }

  binChange(event) {
    this._filters['bin'] = event
    this._page = 1;
    this.loadPage(this._page)
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
