import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import {
  selectInstitutionResponse,
  selectInstitution,
} from '../../store/selectors/institution.selectors';
import { GetInstitution, ClearState } from '../../store/actions/institution.action';
import { ActivatedRoute, Router } from '@angular/router';
import { GetFilterData, ClearFilterData } from '@app/store/actions/filter.actions';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { ClearStateAction, UploadResetAction } from '@app/store/actions/import-file.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ImportFileService } from '@app/services/import-file.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { Utils } from 'src/utils';
declare var jQuery: any;

@Component({
  selector: 'app-institution',
  styleUrls: ['./institution.component.scss'],
  templateUrl: './institution.component.html',
})
export class InstitutionComponent implements OnInit {
  title = 'Institution Details';
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any = {};
  public columns: any;
  public rows: any = [];
  public visible = false;
  public searchData: any = [];
  public temp: any;
  public institutionData: any;
  public _filters: Array<any> = [];
  public errorMessage: string;
  public rowData: any;
  public successMessage: string;
  public visibleAnimate = false;
  public rowId: any;
  public disableSuccess: string;
  public disableError: string;
  public enableSuccess: string;
  public enableError: string;
  public importUrl = '/institution/validate';
  public url = '/merchant/filter';
  public groupList: any;
  public statusList: any;
  public addressList: any;
  public serviceList: any;
  public permission: any;
  public resetFlag = false;
  public filter: any = {};
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public objectData: any;
  public merchantId = 'link_merchant';
  public additionalServiceList: any;
  public visiblePopUp = false;
  public visiblePopUpAnimate = false;
  public loading = true;
  public optionsList: any[];
  public place: any = '';
  public partialAuth = [{ option: 'General options', name: 'Partial Auth', id: 0 }];
  public resetButtonFlag: Boolean = false;
  public totalRecords: Number;
  private _page = 1;
  public s: string;
  readonly headerHeight = 40;
  readonly rowHeight = 55;
  readonly pageLimit = 15;
  public request: Boolean = true;
  public searchResetButton: Boolean = true;
  public currentElement: any = [];
  public statusLoading: Boolean = false;
  isvisible: boolean;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('expiry', { static: true }) expiry: TemplateRef<any>;
  @ViewChild('name', { static: true }) name: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('services', { static: true }) services: TemplateRef<any>;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('posSafetyFlag', { static: true }) posSafetyFlag: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  isvisibleView: boolean;
  idView: any;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private _route: ActivatedRoute,
    private importService: ImportFileService,
  ) {}

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params) {
        const output = Object.keys(params);
        output.forEach(item => {
          this.resetFlag = true;
          this._filters[item] = params[item];
        });
        if (this._filters) {
          this.filter.merchantGroup = this._filters['merchantGroup'];
        }
      }
      this._transFilters();
    });
    this._store.pipe(select(selectInstitution)).subscribe((response: any) => {
      if (response) {
        this.request = true;
        this.rowData = response.data;
        if (this._page === 1) {
          this.rows = Utils.newData(this.rowData.merchantList);
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(Utils.newData(this.rowData.merchantList));
        }
        if (this.rows && this.rowData['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = this.rowData['total-record'];
        this.loading = false;
      }
    });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.merchantId);
        this.permissionObject = this.permission;
      }
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });

    this._store.pipe(select(selectInstitutionResponse)).subscribe((response: any) => {
      if (response) {
        this.statusLoading = false;
        this.currentElement.map(item => {
          if (response.data !== null && item.id === response.data.id) {
            this._store.dispatch(new ClearState());
            if (response.status === 'success' && response.data !== null) {
              item.locked = response.data.locked;
            }
          }
        });
      }
    });

    this._store.dispatch(new GetFilterData(this.url));
    if (this._route.queryParams) {
      this._store.pipe(select(selectFilterData)).subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure') {
          this.groupList = filter.data.merchantGroup;
          this.addressList = filter.data.address;
          this.serviceList = filter.data['service-list'];
          this.statusList = filter.data.status;
          if (this.serviceList) {
            this.serviceList = this.serviceList.map(item => {
              item.option = 'Services';
              return item;
            });
            this.optionsList = [
              ...this.partialAuth,
              ...this.serviceList,
            ];
          }
          this._store.dispatch(new ClearFilterData());
        }
      });
    }
    this.translate
      .get(['NAME', 'STATUS', 'POS_SAFETY_CHECK', 'ACTIVE_SINCE', 'ACTIVE_TO', 'ACTION'])
      .subscribe(translation => {
        this.columns = [
          {
            prop: 'name',
            name: translation.NAME,
            cellTemplate: this.name,
            Searchable: true,
            width: 250,
          },
          {
            prop: 'status',
            name: translation.STATUS,
            cellTemplate: this.status,
            width: 75,
            sortable: false,
          },
          {
            prop: 'posSafetyFlag',
            name: translation.POS_SAFETY_CHECK,
            cellTemplate: this.posSafetyFlag,
            width: 75,
          },
          {
            prop: 'activateOn',
            name: translation.ACTIVE_SINCE,
            cellTemplate: this.date,
            width: 110,
            sortable: false,
          },
          {
            prop: 'expiryOn',
            name: translation.ACTIVE_TO,
            cellTemplate: this.expiry,
            width: 110,
            sortable: false,
          },
          {
            prop: 'action',
            name: translation.ACTION,
            cellTemplate: this.actions,
            width: 50,
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

  public onActivate(row) {
    this._router.navigate(['institutions/institutions/institution-info', row.id]);
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

  public locationDetails(row) {
    this._filters['merchantGroup'] = row.id;
    this._router.navigate(['/institutions/locations/filter'], {
      queryParams: {
        merchantGroup: row.institution.id,
        merchant: row.merchantDetail.id,
      },
    });
  }

  public serviceName(row) {
    return row.options.services.map(item => item.name).join(',\r\n');
  }

  public deviceDetails(row) {
    this._router.navigate(['/institutions/devices/filter'], {
      queryParams: {
        merchantGroup: row.institution.id,
        merchant: row.merchantDetail.id,
      },
    });
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

  public institutionInfoDetails(row) {
    this._router.navigate(['/institutions/institution-group/', row.institution.id]);
  }

  public getFilterInstitutionGroup(eventData: HTMLSelectElement) {
    if (!eventData) {
      delete this._filters['merchantGroup'];
    } else {
      this._filters['merchantGroup'] = eventData.id;
    }
    this.loadPage(this._page);
  }

  public getFilterStatus(eventData: HTMLSelectElement) {
    if (!eventData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = eventData.id;
    }
    this.loadPage(this._page);
  }

  public getFilterAddress(eventData: any) {
    let city;
    let country;
    if (!eventData) {
      delete this._filters['address'];
    } else {
      [city, country] = eventData.name;
      this._filters['address'] = city + ',' + country;
    }
    this.loadPage(this._page);
  }

  public getFilterOptions(eventData: Array<any>) {
    if (eventData.length === 0) {
      delete this._filters['options'];
    } else {
      this._filters['options'] = eventData.map(item => item.id).join(' ');
    }
    this._page = 1;
    this.loadPage(this._page);
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
  }

  public getFilterNameData(eventData: any) {
    if (this.place) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['name'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['name'] = eventData.currentTarget.value;
        } else {
          this.resetSearch();
        }
        this._page = 1;
        this.loadPage(this._page);
      }
    }
  }

  public resetSearch() {
    this.place = '';
    this.rows = [];
    delete this._filters['name'];
    this._page = 1;
    this.searchResetButton = true;
    this.loadPage(this._page);
  }
  public resetUpload() {
    this._store.dispatch(new ClearStateAction());
    this._store.dispatch(new UploadResetAction());
    this.importService.clearData();
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

  private loadPage(pagenumber: number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetInstitution({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
  public reset(event): void {
    delete this._filters[event];
    if (this._filters.length === 0) {
      this.resetFlag = false;
    } else {
      this.resetFlag = true;
    }
    this.loadPage(this._page);
  }

  public resetAll(): void {
    this.resetFlag = false;
    this._filters = [];
    this.loadPage(this._page);
  }
}
