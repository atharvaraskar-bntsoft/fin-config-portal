import {
  Component,
  OnInit,
  ContentChild,
  TemplateRef,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import {
  selectInstitutionGroup,
  selectGroupResponseJsonSuccess,
} from '../../store/selectors/institution-group.selector';
import { GetInstitutionGroups, ClearState } from '../../store/actions/institution-group.action';
import { Router } from '@angular/router';
import { GetFilterData, ClearFilterData } from '@app/store/actions/filter.actions';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { ClearStateAction, UploadResetAction } from '@app/store/actions/import-file.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ImportFileService } from '@app/services/import-file.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { InstitutionGroupGetObject } from '@app/models/institution-group.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { Utils } from 'src/utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

declare var jQuery: any;

@Component({
  selector: 'app-institution-group',
  styleUrls: ['./institution-group.component.css'],
  templateUrl: './institution-group.component.html',
})
export class InstitutionGroupComponent implements OnInit, OnDestroy {
  title="Institution Group Details";
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any = {};
  public columns: any;
  public institutionGroupId = 'link_institution';
  public rows: any = [];
  public keyData: any;
  public visible = false;
  public rowData: any;
  public visibleAnimate = false;
  public searchData: any = [];
  public temp: any;
  public visiblePopUp = false;
  public visiblePopUpAnimate = false;
  public errorMessage: string;
  public successMessage: string;
  public importUrl = '/institution/validate';
  public loading = true;
  public currentElement: any = [];
  private _page = 1;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 86;
  readonly pageLimit = 15;
  confirmModal?: NzModalRef;
  public filter: any = {};
  private _filters: Array<any> = [];
  public resetButtonFlag: Boolean = false;
  public searchResetButton: Boolean = true;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('expiry', { static: true }) expiry: TemplateRef<any>;
  @ViewChild('name', { static: true }) name: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('more', { static: true }) more: TemplateRef<any>;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  public importMessage = 'To replace drop new csv file or Select from your computer';
  public addressList: any;
  public permission: any;
  public objectData: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public statusList: any;
  public place: any = '';
  public request: Boolean = true;

  private unselectInstitutionGroup: any;
  public statusLoading: Boolean = false;
  idView: any;
  isvisibleView: boolean;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private importService: ImportFileService,
  ) { }

  ngOnInit() {
    
    this.unselectInstitutionGroup = this._store
    .pipe(select(selectInstitutionGroup))
    .subscribe((Institutiongroup: InstitutionGroupGetObject) => {
      if (Institutiongroup) {
        this.request = true;
        this.rowData = Institutiongroup.data;
        if (this._page === 1) {
          this.rows = Utils.newData(this.rowData.institutionList);
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(Utils.newData(this.rowData.institutionList));
        }
        if (this.rows && this.rowData['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = Institutiongroup.data['total-record'];
        this.loading = false;
      }
    });
  this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
    if (response) {
      this.permission = response.data.find(item => item.id === this.institutionGroupId);
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
  this._store.dispatch(new GetFilterData('/merchant-institution/filter'));
  this._store.pipe(select(selectFilterData)).subscribe(filter => {
    if (filter && filter !== null && filter.status !== 'failure') {
      this.addressList = filter.data.address;
      this.statusList = filter.data.status;
      this._store.dispatch(new ClearFilterData());
    }
  });

    this.translate
      .get(['NAME', 'STATUS', 'ACQUIRER', 'ACTIVE_SINCE', 'ACTIVE_TO', 'ACTION'])
      .subscribe(translation => {
        this.columns = [
          {
            Searchable: true,
            cellTemplate: this.name,
            name: translation.NAME,
            prop: 'name',
            width: 200,
          },
          {
            cellTemplate: this.status,
            name: translation.STATUS,
            prop: 'status',
            width: 5,
            sortable: false,
          },
          {
            name: translation.ACQUIRER,
            prop: 'acquirer.name',
            width: 5,
          },
          {
            cellTemplate: this.date,
            name: translation.ACTIVE_SINCE,
            prop: 'activateOn',
            width: 75,
            sortable: false,
          },
          {
            cellTemplate: this.expiry,
            name: translation.ACTIVE_TO,
            prop: 'expiryOn',
            width: 75,
            sortable: false,
          },
          {
            cellTemplate: this.actions,
            name: translation.ACTION,
            prop: 'action',
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
  viewDetails(data:any){
    this.idView=data;
    this.isvisibleView = true;
  }
  close(event: any): void {
    this.isvisibleView = false;
  }
  create(event: any) {
    this.isvisibleView = false;
    
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

  public getFilterStatusData(eventData: any) {
    if (!eventData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getFilterAddressData(eventData: any) {
    
    let city;
    let country;
    if (!eventData) {
      delete this._filters['address'];
    } else {
      [city, country] = eventData.name;
      this._filters['address'] = city + ',' + country;
    }
    this._page = 1;
    this.loadPage(this._page);
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
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  private _transFilters(): Object {
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

  public resetSearch() {
    this.place = '';
    delete this._filters['name'];
    this._page = 1;
    this.searchResetButton = true;
    this.loadPage(this._page);
  }

  public resetUpload(data) {
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

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetInstitutionGroups({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  ngOnDestroy() {
    this.unselectInstitutionGroup.unsubscribe();
  }
}
