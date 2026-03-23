import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectApprovalsList } from '../../store/selectors/approvals.selector';
import { IAppState } from '../../store/state/app.state';
import { GetApprovals } from '../../store/actions/approvals.actions';
import { Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';

declare var jQuery: any;

@Component({
  selector: 'app-approvals',
  styleUrls: ['./approvals.component.scss'],
  templateUrl: './approvals.component.html',
})
export class ApprovalsComponent implements OnInit {
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any;
  public loading = true;
  public rows: any = [];
  public temp: Array<any>;
  public searchData: Array<any> = [];
  public columns: Array<any> = [];
  public request: Boolean = true;
  public totalRecords: Number;
  private _page = 1;
  public s: string;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  public viewsettings: any = {};
  @ViewChild('details', { static: true }) details: TemplateRef<any>;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('operationType', { static: true }) operationType: TemplateRef<any>;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private el: ElementRef,
  ) {
    this._store.pipe(select(selectApprovalsList)).subscribe((ApprovalsList: any) => {
      if (ApprovalsList) {
        this.request = true;
        if (this._page === 1) {
          this.rows = ApprovalsList.checkerList;
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(ApprovalsList.checkerList);
        }
        if (ApprovalsList['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.loading = false;
        this.totalRecords = ApprovalsList['total-record'];
      }
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });
    // this.loadPage(this._page);
  }

  ngOnInit() {
    this.translate
      .get([
        'ID',
        'ENTITY_ID',
        'ACQUIRER_ENTITY_TYPE',
        'CREATED_BY',
        'CREATEDON',
        'STATUS',
        'ACTION',
      ])
      .subscribe(translation => {
        this.columns = [
          { prop: 'id', name: translation.ID },
          { prop: 'entityId', name: translation.ENTITY_ID },
          { prop: 'operationType', name: 'Operation Type', cellTemplate: this.operationType },
          { prop: 'entityType', name: translation.ACQUIRER_ENTITY_TYPE },
          { prop: 'createdBy', name: translation.CREATED_BY },
          {
            prop: 'createdOn',
            name: translation.CREATEDON,
            cellTemplate: this.date,
          },
          { prop: 'status', name: translation.STATUS },
          { prop: '', name: translation.ACTION, cellTemplate: this.details, sortable: false },
        ];
      });
  }

  public viewdetails(row) {
    this._router.navigate(['/approvals/approvals/details'], {
      state: { rowData: row },
    });
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

  public refreshData() {
    this.loadPage(this._page);
  }

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetApprovals({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
}
