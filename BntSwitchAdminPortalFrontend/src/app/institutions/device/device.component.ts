import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { selectDevice } from '../../store/selectors/device.selectors';
import { GetDevice } from '../../store/actions/device.action';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GetFilterData, ClearFilterData } from '@app/store/actions/filter.actions';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { ClearStateAction } from '@app/store/actions/import-file.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { DeviceGetObject } from '@app/models/device.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { Utils } from 'src/utils';
declare var jQuery: any;

@Component({
  selector: 'app-device',
  styleUrls: ['./device.component.scss'],
  templateUrl: './device.component.html',
})
export class DeviceComponent implements OnInit {
  title = 'Device Details';
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any = {};
  public currentElement: any = [];
  public columns: any;
  public rows: any = [];
  public statusLoading: Boolean = false;
  public keyData: any;
  public visible = false;
  public visibleAnimate = false;
  public searchData: any = [];
  public rowBackup: any;
  public deviceData: any;
  public errorMessage: string;
  public successMessage: string;
  public statusList: any;
  public locationList: any;
  public merchantList: any;
  public url = '/device/filter';
  public groupList: any;
  public importUrl = '/institution/validate';
  public visiblePopUp = false;
  public visiblePopUpAnimate = false;
  public loading = true;
  private _filters: Array<any> = [];
  public filter: any = {};
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public deviceId = 'link_device';
  public place: any = '';
  public rowData: any;
  public objectData: any;

  private _page = 1;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 60;
  readonly pageLimit = 15;
  public request: Boolean = true;
  public resetButtonFlag: Boolean = false;
  public searchResetButton: Boolean = true;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('expiry', { static: true }) expiry: TemplateRef<any>;
  @ViewChild('name', { static: true }) name: TemplateRef<any>;
  @ViewChild('locked', { static: true }) locked: TemplateRef<any>;
  @ViewChild('action', { static: true }) action: TemplateRef<any>;
  @ViewChild('posSafetyFlag', { static: true }) posSafetyFlag: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  idView: any;
  isvisibleView: boolean;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _route: ActivatedRoute,
    private translate: TranslateService,
  ) {}
  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params) {
        const output = Object.keys(params);
        output.forEach(item => {
          this._filters[item] = params[item];
        });
        if (this._filters) {
          this.filter.merchantGroup = this._filters['merchantGroup'];
          this.filter.merchant = this._filters['merchant'];
          this.filter.location = this._filters['location'];
        }
      }
      this._transFilters();
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });
    this._store.pipe(select(selectDevice)).subscribe((response: DeviceGetObject) => {
      if (response) {
        this.request = true;
        this.rowData = response.data;
        if (this._page === 1) {
          this.rows = Utils.newData(this.rowData.devicesList);
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(Utils.newData(this.rowData.devicesList));
        }
        if (this.rowData['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = response.data['total-record'];
        this.loading = false;
      }
    });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.deviceId);
        this.permissionObject = this.permission;
      }
    });
    this._store.dispatch(new GetFilterData(this.url));
    this._store.pipe(select(selectFilterData)).subscribe(filter => {
      if (filter && filter !== null && filter.status !== 'failure') {
        this.groupList = filter.data.merchantGroup;
        this.statusList = filter.data.status;
        this.merchantList = filter.data.merchant;
        this.locationList = filter.data.location;
        this._store.dispatch(new ClearFilterData());
      }
    });

    this.translate
      .get([
        'NAME',
        'PED_ID',
        'TERMINAL_ID',
        'PED_SERIAL_NO',
        'DEVICE_TYPE',
        'STATUS',
        'POS_SAFETY_CHECK',
        'REVERSAL_TIMEOUT',
        'ACTIVE_SINCE',
        'ACTION',
      ])
      .subscribe(translation => {
        this.columns = [
          {
            prop: 'NAME',
            name: translation.NAME,
            cellTemplate: this.name,
            Searchable: true,
            width: 160,
          },
          {
            prop: 'code',
            name: translation.TERMINAL_ID,
            Searchable: true,
            width: 80,
          },
          {
            prop: 'pedSerialNo',
            name: translation.PED_SERIAL_NO,
            Searchable: true,
            sortable: false,
            width: 70,
          },
          {
            prop: 'type.code',
            name: translation.DEVICE_TYPE,
            Searchable: true,
            sortable: false,
            width: 80,
          },
          {
            prop: 'pedId',
            name: translation.PED_ID,
            Searchable: true,
            sortable: true,
            width: 40,
          },
          {
            prop: 'locked',
            name: translation.STATUS,
            cellTemplate: this.locked,
            width: 40,
            sortable: true,
          },
          {
            prop: 'posSafetyFlag',
            name: translation.POS_SAFETY_CHECK,
            cellTemplate: this.posSafetyFlag,
            width: 60,
          },
          {
            prop: 'activateOn',
            name: translation.ACTIVE_SINCE,
            cellTemplate: this.date,
            width: 90,
            sortable: true,
          },
          {
            prop: 'action',
            name: translation.ACTION,
            cellTemplate: this.action,
            sortable: false,
          },
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

  public getFilterStatusData(eventData: any) {
    if (!eventData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getFilterInstitution(eventData: HTMLSelectElement) {
    if (!eventData) {
      delete this._filters['merchant'];
    } else {
      this._filters['merchant'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getFilterLocation(eventData: HTMLSelectElement) {
    if (!eventData) {
      delete this._filters['location'];
    } else {
      this._filters['location'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
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

  public locationDetails(row) {
    this._router.navigate(['/institutions/locations/locations-details', row.location.id]);
  }

  private _transFilters() {
    const output = Object.keys(this._filters);
    if (output.length) {
      this.resetButtonFlag = true;
    } else {
      this.resetButtonFlag = false;
    }
    return output
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public resetFilterSearch() {
    this.filter = {};
    this._filters = [];
    this.place = '';
    this._page = 1;
    this.loadPage(this._page);
  }

  public importButton(): void {
    this.openPopUp();
  }

  public openPopUp(): void {
    document.body.style.overflow = 'hidden';
    this.visiblePopUp = true;
    setTimeout(() => (this.visiblePopUpAnimate = true), 200);
  }

  public cancelPopUp(): void {
    this._page = 1;
    this.loadPage(this._page);
    document.body.style.overflow = 'auto';
    this.visiblePopUpAnimate = false;
    setTimeout(() => (this.visiblePopUp = false), 100);
    this._store.dispatch(new ClearStateAction());
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
    this._page = 1;
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
      new GetDevice({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
}
