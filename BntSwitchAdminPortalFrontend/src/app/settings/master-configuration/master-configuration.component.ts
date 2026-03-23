import { TemplateRef } from '@angular/core';
import { GetAllMasterConfiguration } from './../../store/actions/master-configuration.action';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { configurationMasterList } from '@app/store/selectors/master-configuration.selector';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
declare var jQuery: any;

@Component({
  selector: 'app-master-configuration',
  templateUrl: './master-configuration.component.html',
  styleUrls: ['./master-configuration.component.scss'],
})
export class MasterConfigurationComponent implements OnInit {
  loading: boolean;
  columns = [];
  headerHeight = 40;
  public currentPagination = '20';
  rowHeight = 60;
  public request: Boolean = true;
  rows = [];
  masterData: any;
  public currentLang: string;
  private _page = 1;
  public totalRecords: Number;
  subscription: Subscription[] = [];
  @ViewChild('action', { static: true }) action: TemplateRef<HTMLElement>;
  @ViewChild('myTable', { static: true }) table;

  constructor(
    private store: Store<IAppState>,
    private translate: TranslateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.viewSettingData();
    this.loadData();
    this.setColumns();
  }

  public viewSettingData() {
    this.store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });
  }

  public loadData() {
    this.store.pipe(select(configurationMasterList)).subscribe((data: any) => {
      if (data) {
        this.request = true;
        this.masterData = data;
        if (this._page === 1) {
          this.rows = this.masterData.logsList;
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(this.masterData.logsList);
        }
        if (this.masterData['total-filtered-record'] === (this.rows && this.rows.length)) {
          this.request = false;
        }
        this.totalRecords = data['total-record'];

        this.loading = false;
      }
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

  setColumns() {
    this.translate
      .get(['TRANSMISSION_PROTOCOL', 'MESSAGE_PROTO', 'MESSAGE_STANDARD', 'ACTION'])
      .subscribe(res => {
        this.columns = [
          { name: res.TRANSMISSION_PROTOCOL, prop: 'transmissionProtocol.description' },
          { name: res.MESSAGE_STANDARD, prop: 'messageStandard.description' },
          { name: res.MESSAGE_PROTO, prop: 'messageProtocol.description' },
          { name: res.ACTION, prop: 'action', cellTemplate: this.action, sortable: false },
        ];
      });
  }

  viewL1Data(row) {
    this.router.navigate(['settings', 'config', 'details'], { state: { row, screen: 'l1' } });
  }

  viewL3Data(row) {
    this.router.navigate(['settings', 'config', 'details'], { state: { row, screen: 'l3' } });
  }

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this.store.dispatch(
      new GetAllMasterConfiguration({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  public isColVisible(row, table) {
    return JSON.parse(row.properties)[table];
  }
}
