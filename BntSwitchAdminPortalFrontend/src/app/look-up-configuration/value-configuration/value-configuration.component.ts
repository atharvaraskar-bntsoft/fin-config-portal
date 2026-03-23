import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { GetLookUpValue, ClearState } from '@app/store/actions/look-up-configuration.action';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectLookUpValue } from '@app/store/selectors/look-up-configuration.selector';
declare var jQuery: any;

@Component({
  selector: 'app-value-configuration',
  styleUrls: ['./value-configuration.component.scss'],
  templateUrl: './value-configuration.component.html',
})
export class ValueConfigurationComponent implements OnInit, OnDestroy {
  public currentLang: string;
  public rows: any = [];
  public lookUpTypeData: any = {};
  public columns: any;
  public loading = true;
  private _page = 1;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 55;
  readonly pageLimit = 15;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('value', { static: true }) value: TemplateRef<any>;
  @ViewChild('description', { static: true }) description: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  componetDestroyed = new Subject();
  public currentPagination = '20';
  public lookUpTypeValue: any;
  public request: Boolean = true;
  public actionId: Number = -1;
  public lookUpType: any;
  public id = null;
  constructor(
    private _store: Store<IAppState>,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
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
    this.createColumns();
    this.loadData();
  }

  public loadData() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectLookUpValue))
      .subscribe((data: any) => {
        if (data) {
          this.lookUpTypeValue = data.data;
          this.lookUpType = this.lookUpTypeValue.lookupType.name;
          this.lookUpTypeData = this.lookUpTypeValue.lookupType;
          if (this._page === 1) {
            this.rows = this.lookUpTypeValue.lookupValueList;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(this.lookUpTypeValue.lookupValueList);
          }
          this.loading = false;
        }
      });
  }

  public createColumns() {
    this.translate.get(['ID', 'STATUS', 'DESCRIPTION', 'VALUE']).subscribe(translation => {
      this.columns = [
        {
          cellTemplate: this.value,
          name: translation.VALUE,
          prop: 'value',
          width: 100,
          sortable: false,
        },
        {
          cellTemplate: this.status,
          name: translation.STATUS,
          prop: 'active',
          width: 100,
          sortable: false,
        },

        {
          cellTemplate: this.description,
          name: translation.DESCRIPTION,
          prop: 'description',
          width: 100,
          sortable: false,
        },
      ];
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

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetLookUpValue({
        page: pagenumber,
        'page-size': this.currentPagination,
        id: this.route.snapshot.paramMap.get('id'),
      }),
    );
    this.request = false;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
