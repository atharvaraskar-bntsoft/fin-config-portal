import { Component, OnInit, ElementRef, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GetLookUpType, ClearState } from '@app/store/actions/look-up-configuration.action';
import { selectLookUpTypeList } from '@app/store/selectors/look-up-configuration.selector';
declare var jQuery: any;

@Component({
  selector: 'app-look-up-configuration',
  styleUrls: ['./look-up-configuration.component.scss'],
  templateUrl: './look-up-configuration.component.html',
})
export class LookUpConfigurationComponent implements OnInit, OnDestroy {
  public currentPagination = '20';
  public currentLang: string;
  public rows: any = [];
  public columns: any;
  public loading = true;
  private _page = 1;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 45;
  readonly pageLimit = 15;
  public request: Boolean = true;
  componetDestroyed = new Subject();
  public lookUpTypeData: any;
  @ViewChild('name', { static: true }) name: TemplateRef<any>;
  @ViewChild('description', { static: true }) description: TemplateRef<any>;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  public valid = true;
  constructor(
    private _store: Store<IAppState>,
    public router: Router,
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
      this.createColumns();
      this.loadData();
  }

  public loadData() {
    this._store.pipe(select(selectLookUpTypeList)).subscribe((data: any) => {
      if (data) {
        this.lookUpTypeData = data.data;
        this.request = true;
        if (this._page === 1) {
          this.rows = this.lookUpTypeData.resultList;
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(this.lookUpTypeData.resultList);
        }
        if (this.lookUpTypeData['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = this.lookUpTypeData['total-record'];
        this.loading = false;
      }
    });
  }

  public createColumns() {
    this.translate.get(['NAME', 'DESCRIPTION', 'ACTION']).subscribe(translation => {
      this.columns = [
        {
          cellTemplate: this.name,
          name: translation.NAME,
          prop: 'name',
          width: 150,
        },
        {
          cellTemplate: this.description,
          name: translation.DESCRIPTION,
          prop: 'description',
          width: 170,
        },
        {
          cellTemplate: this.actions,
          name: translation.ACTION,
          prop: 'action',
          sortable: false,
          width: 10,
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
      new GetLookUpType({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  public configure(row): void {
    this.router.navigate(['/look-up-configuration/detail/', row.id]);
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
