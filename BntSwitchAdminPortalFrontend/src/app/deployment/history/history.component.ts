import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectGetHistory } from '@app/store/selectors/history.selector';
import { GetHistory } from '@app/store/actions/history.action';
import { Router } from '@angular/router';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { IPermissionResponse } from '@app/models/permission.interface';
declare var jQuery: any;

@Component({
  selector: 'app-history',
  styleUrls: ['./history.component.scss'],
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  public request: Boolean = true;
  public historyData: any;
  public _page = 1;
  public rows: any = [];
  public totalRecords: Number;
  public loading = true;
  public currentPagination = '20';
  public currentLang: string;
  public _filters: Array<any> = [];
  public columns: Array<any> = [];
  readonly headerHeight = 40;
  readonly rowHeight = 45;
  public rowsNmber: number;

  @ViewChild('scheduledOn', { static: true }) scheduledOn: TemplateRef<any>;
  @ViewChild('deployedOn', { static: true }) deployedOn: TemplateRef<any>;
  @ViewChild('viewDetails', { static: true }) viewDetails: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public deploymentHistoryId = 'link_deployment_history';
  constructor(
    public _store: Store<IAppState>,
    public translate: TranslateService,
    public _router: Router,
  ) { }

  loadData() {
    this._store.pipe(select(selectGetHistory)).subscribe((data: any) => {
      if (data) {
        this.request = true;
        this.historyData = data.data;
        if (this._page === 1) {
          this.rows = this.historyData.historylist;
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(this.historyData.historylist);
        }
        if (this.historyData['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = data.data['total-record'];
        this.loading = false;
      }
      else {
        console.log("nothing");
      }
    });
  }

  permissionData() {
    this._store.pipe(select(selectPermissionsData)).subscribe((response: IPermissionResponse) => {
      if (response.data) {
        this.permission = response.data.find((item: any) => item.id === this.deploymentHistoryId);
        this.permissionObject = this.permission;
      }
    });
  }
  viewSettingData() {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });
  }
  ngOnInit() {
    this.createColumns();
    this.loadData();
    this.permissionData();
    this.viewSettingData();
  }

  createColumns() {
    this.translate
      .get(['NAME', 'SCHEDULEDON', 'DEPLOYEDON', 'STATUS', 'VIEWDETAILS'])
      .subscribe(translation => {
        this.columns = [
          { prop: 'name', name: translation.NAME, sortable: false },
          {
            prop: 'scheduledOn',
            name: translation.SCHEDULE_ON,
            cellTemplate: this.scheduledOn,
          },
          {
            prop: 'deployedOn',
            name: translation.DEPLOYED_ON,
            cellTemplate: this.deployedOn,
          },
          { prop: 'status', name: translation.STATUS },
          {
            prop: 'viewDetails',
            name: translation.VIEWDETAILS,
            cellTemplate: this.viewDetails,
            sortable: false,
          },
        ];
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

  public getRowData(row): void {
    this._router.navigate(['/deployment/history', row.id]);
  }

  public _transFilters(): String {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetHistory({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
}
