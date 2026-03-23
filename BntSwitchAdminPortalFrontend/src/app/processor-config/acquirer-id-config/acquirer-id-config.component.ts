import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import {
  GetAcquirerIdConfig,
  ClearState,
  GetAcquirerIdFlag,
} from '@app/store/actions/acquirer-id-config-mapping.action';
import {
  selectAcquirerIdConfig,
  selectAcquirerIdFlag,
} from '@app/store/selectors/acquirer-id-config.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { AcquirerIdGetObject } from '@app/models/acquirer-id-config.interface';
import { Utils } from 'src/utils';
import { Subject } from 'rxjs';
declare var jQuery: any;

@Component({
  selector: 'app-acquirer-id-config',
  styleUrls: ['./acquirer-id-config.component.scss'],
  templateUrl: './acquirer-id-config.component.html',
})
export class AcquirerIdConfigComponent implements OnInit {
  public currentPagination = '20';
  public currentLang: string;
  public statusLoading: Boolean = false;
  public Labels: any = {};
  public rows: any = [];
  public columns: any;
  public visibleAnimate = false;
  public visible = false;
  public loading = true;
  private _page = 1;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 55;
  readonly pageLimit = 15;
  public request: Boolean = true;
  private _filters: Array<any> = [];
  public currentElement: any = [];
  public objectData: any;
  public rowId: any;
  public isAttributesVisible = false;
  public attributeData: any;
  public pos_sms;
  public acquirerConditionflag: any;
  componetDestroyed = new Subject();
  title = 'Acquirer Details';

  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('onusValidation', { static: true }) onusValidation: TemplateRef<any>;
  @ViewChild('refundOffline', { static: true }) refundOffline: TemplateRef<any>;
  @ViewChild('advicematch', { static: true }) advicematch: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  idView: any;
  isvisibleView: boolean;

  constructor(
    private _store: Store<IAppState>,
    public _router: Router,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });
    this._store.pipe(select(selectAcquirerIdConfig)).subscribe((data: AcquirerIdGetObject) => {
      if (data) {
        this.request = true;
        if (this._page === 1) {
          this.rows = Utils.newData(data.data.acquirerMappingList);
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(Utils.newData(data.data.acquirerMappingList));
        }
        if (data['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = data.data['total-record'];
        this.loading = false;
      } else {
        console.log('no data');
      }
    });
    this._store.dispatch(new GetAcquirerIdFlag());
    this._store.pipe(select(selectAcquirerIdFlag)).subscribe((response: any) => {
      if (response) {
        this.acquirerConditionflag = response.condition_Flag;
      }
    });
    this.translate
      .get([
        'NAME',
        'INSTITUTION_ID',
        'STATUS',
        'REFUND_OFFLINE',
        'COUNTRY',
        'CREATEDON',
        'POS_SMS',
      ])
      .subscribe(translation => {
        this.columns = [
          { prop: 'name', name: translation.NAME },
          { prop: 'code', name: translation.INSTITUTION_ID, sortable: false },
          {
            prop: 'active',
            name: translation.STATUS,
            cellTemplate: this.status,
          },
          {
            prop: 'onusValidate',
            name: translation.ONUS_VALIDATE,
            cellTemplate: this.onusValidation,
          },
          {
            prop: 'refundOffline',
            name: translation.REFUND_OFFLINE,
            cellTemplate: this.refundOffline,
          },
          { prop: 'country.countryName', name: translation.COUNTRY },
          {
            prop: 'action',
            name: translation.ACTION,
            cellTemplate: this.actions,
            sortable: false,
          },
        ];
      });
  }
  public onActivate(row) {
    this._router.navigate(['institutions/acquirer-id-config/acquirer-id-config-info', row.id]);
  }
  viewDetails(data: any) {
    this.idView = data;
    this.isvisibleView = true;
  }
  close(event: any): void {
    this.isvisibleView = false;
  }
  create(event: any) {
    this.isvisibleView = false;
  }
  public openModal(row) {
    this.isAttributesVisible = true;
    this.attributeData = row;
  }

  public closeModal() {
    this.isAttributesVisible = false;
  }

  public _transFilters(): String {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public onScroll(offsetY: any) {
    jQuery('.datatable-body').scroll(() => {
      if (
        jQuery('.datatable-body').scrollTop() + jQuery('.datatable-body').height() >
        jQuery(document).height() - 100
      ) {
        if (this.request) {
          this._page = ++this._page;
          this.loadPage(this._page);
        }
      }
    });
  }

  public loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetAcquirerIdConfig({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  ngOnDestroy(): void {
    this._store.dispatch(new ClearState());
  }
}
