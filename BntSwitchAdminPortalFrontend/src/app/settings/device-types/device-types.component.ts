import { Component, OnInit, ContentChild, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { GetDeviceTypes } from '../../store/actions/device-types.action';
import { selectDeviceTypesList } from '@app/store/selectors/device-types.selector';
import { GetFilterData } from '@app/store/actions/filter.actions';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector'
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { DeviceTypeGetObject } from '@app/models/device-types.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
declare var jQuery: any;

@Component({
  selector: 'app-device-types',
  styleUrls: ['./device-types.component.scss'],
  templateUrl: './device-types.component.html',
})
export class DeviceTypesComponent implements OnInit {
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any;
  public deviceTypesId = 'link_device_types';
  public columns: any;
  public rows: any = [];
  public keyData: any;
  public visible = false;
  public resultList: any;
  public visibleAnimate = false;
  public searchData: any = [];
  public temp: any;
  public rowId: any;
  public objectData: any;
  public errorMessage: any;
  public statusList: any;
  public disableSuccess: string;
  public disableError: string;
  public enableSuccess: string;
  public enableError: string;
  private _filters: Array<any> = [];
  confirmModal?: NzModalRef;
  public loading = true;
  public statusLoading: Boolean = false;

  private _page = 1;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 72;
  readonly pageLimit = 15;
  public currentElement: any = [];
  @ViewChild('locked', { static: true }) locked: TemplateRef<any>;
  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  public url = '/device-types/filter';
  public deviceTypeId = 'link_device_types';
  public deviceTypeData: any;
  public permission = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public place: any = '';
  public searchResetButton: Boolean = true;
  public request: Boolean = true;
  public rowData: any;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _route: ActivatedRoute,
    private el: ElementRef,
    private modal: NzModalService,
  ) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params) {
        const output = Object.keys(params);
        output.forEach(item => {
          this._filters[item] = params[item];
        });
      }
      const result = this._transFilters() ? this._transFilters() : '';
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });
    this._store
      .pipe(select(selectDeviceTypesList))
      .subscribe((DeviceTypes: DeviceTypeGetObject) => {
        if (DeviceTypes) {
          this.request = true;
          this.rowData = DeviceTypes;
          if (this._page === 1) {
            this.rows = this.rowData.data.deviceTypeList;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(this.rowData.data.deviceTypeList);
          }
          if (this.rows && this.rowData['total-filtered-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = this.rowData.data['total-record'];
          this.loading = false;
        }
      });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.deviceTypesId);
      }
    });
    this._store.dispatch(new GetFilterData(this.url));
    if (this._route.queryParams) {
      this._store.pipe(select(selectFilterData)).subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure') {
          this.statusList = filter.data.status;
        }
      });
    }
    this.translate.get(['CODE', 'STATUS', 'DEVICE_TYPE']).subscribe(translation => {
      this.columns = [
        { prop: 'code', name: translation.CODE, width: 30 },
        {
          prop: 'Status',
          name: translation.STATUS,
          cellTemplate: this.locked,
          width: 30,
          sortable: false,
        },
        { prop: 'code', name: translation.DEVICE_TYPE, width: 50 },
        // {
        //   prop: 'action',
        //   name: translation.ACTION,
        //   cellTemplate: this.actions,
        //   width: 30,
        //   sortable: false,
        // },
      ];
      this.searchData = this.columns
        .map(value => {
          if (value.Searchable) {
            return value.prop;
          }
        })
        .filter(item => item);
    });
  }

  public close(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
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
        delete this._filters['code'];
      } else {
        this._filters['code'] = eventData.currentTarget.value;
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  public resetSearch() {
    this.place = '';
    delete this._filters['code'];
    this.loadPage(this._page);
    this.searchResetButton = true;
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
      new GetDeviceTypes({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
}
