import { Component, OnInit, TemplateRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {
  ClearState,
  DeleteUserRoles,
  GetUserRoles,
  PutUserRolesStatus,
  GetAdminRoleCheck,
} from '../../../store/actions/user-roles.actions';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import {
  selectGetAdminRoleCheck,
  selectUserRolesDelete,
  selectUserRolesList,
  selectUserRolesStatus,
} from '../../../store/selectors/user-roles.selector';
import { GetFilterData } from '@app/store/actions/filter.actions';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
declare var jQuery: any;
import { selectProfileList } from '@app/store/selectors/profile.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { UserRoleGetObject } from '@app/models/user-roles.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-user-roles',
  styleUrls: ['./user-roles.component.css'],
  templateUrl: './user-roles.component.html',
})
export class UserRolesComponent implements OnInit, OnDestroy {
  public currentPagination = '20';
  public statusLoading: Boolean = false;
  public currentLang: string;
  public Labels: any = {};
  public rows: any = [];
  public rowBackup: any;
  public filter: any = {};
  public columns: any;
  public searchData: any = [];
  public rowData: any;
  public resetButtonFlag: Boolean = false;
  public objectData: any;
  public visible = false;
  public visibleAnimate = false;
  public visibleRole = false;
  public visibleAnimateRole = false;
  public dimensions = {
    footerHeight: 40,
    headerHeight: 40,
    rowHeight: 72,
  };
  public loading = true;
  public adminName: any;
  public rowId: any;
  public statusList: any;
  public functionList: any;
  private _filters: Array<any> = [];
  public isAdminRole = false;
  private _page = 1;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  public place: any = '';
  public currentUser: any = {};
  confirmModal?: NzModalRef;
  public request: Boolean = true;
  public searchResetButton: Boolean = true;
  @ViewChild('roleFunctions', { static: true }) roleFunctions: TemplateRef<any>;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  componetDestroyed = new Subject();
  public permission: any;
  public usersId = 'link_user_roles';
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private el: ElementRef,
    private modal: NzModalService,
  ) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectProfileList))
      .subscribe((UserData: any) => {
        if (UserData) {
          this.currentUser = UserData.data;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserRolesList))
      .subscribe((data: UserRoleGetObject) => {
        if (data) {
          this.loading = true;
          this.request = true;
          if (this._page === 1) {
            this.rows = data.data.userRoleList;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(data.data.userRoleList);
          }
          if (data['total-filtered-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = data.data['total-record'];
          this.loading = false;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
          this.loadPage(this._page);
        }
      });

    this._store.dispatch(new GetFilterData('/roles/filter'));

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectFilterData))
      .subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure') {
          this.statusList = filter.data.status;
          this.functionList = filter.data.function;
        }
      });
      /*
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserRolesStatus))
      .subscribe((response: any) => {
        if (response) {
          this.loading = true;
          // this.statusLoading = false;
          this._store.dispatch(new ClearState());
          if (response && response.status === 'success') {
            this.loadPage(this._page);
            this.loading = false;
          }
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserRolesDelete))
      .subscribe((response: any) => {
        if (response) {
          this._store.dispatch(new ClearState());
          if (response && response.status === 'success') {
            this.loadPage(this._page);
          }
        }
      });
      */
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectPermissionsData))
      .subscribe((response: any) => {
        if (response) {
          this.permission = response.data.find(item => item.id === this.usersId);
        }
      });
    this._store.dispatch(new GetAdminRoleCheck());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetAdminRoleCheck))
      .subscribe((response: any) => {
        if (response) {
          this.isAdminRole = response.data.isAdminEnabled;
          this.adminName = response.data.adminRole;
        }
      });
  }

  ngOnInit() {
    this.translate.get(['USERROLE', 'STATUS', 'ROLEFUNCTIONS', 'ACTION']).subscribe(translation => {
      this.columns = [
        { prop: 'name', name: translation.USERROLE, Searchable: true },
        {
          cellTemplate: this.status,
          name: translation.STATUS,
          prop: 'locked',
        },
        {
          cellTemplate: this.roleFunctions,
          name: translation.ROLEFUNCTIONS,
          prop: 'roleFunctions',
          width: 150,
          sortable: false,
        },
        {
          cellTemplate: this.actions,
          name: translation.ACTION,
          prop: 'action',
          sortable: false,
        },
      ];
      this.searchValues();
    });
  }

  public searchValues() {
    this.searchData = this.columns
      .map(value => {
        if (value.Searchable) {
          return value.prop;
        }
      })
      .filter(item => item);
  }

  public roleFunctionsPopup(rowdata) {
    this.rowData = rowdata;
    this.openPopup();
  }

  public openPopup(): void {
    document.body.style.overflow = 'hidden';

    this.visibleRole = true;
    setTimeout(() => (this.visibleAnimateRole = true), 200);
  }

  public closePopup(): void {
    document.body.style.overflow = 'auto';

    this.visibleAnimate = false;
    setTimeout(() => (this.visibleRole = false), 100);
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

  public getFilterFunctionData(eventData: any) {
    if (!eventData) {
      delete this._filters['function'];
    } else {
      this._filters['function'] = eventData.id;
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
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public getRowData(row) {
    this._router.navigate(['/settings/user-roles/edit', row.id]);
  }

  public deleteRow(row) {
    this.objectData = row.name;
    this.rowId = row.id;
    this.confirmModal = this.modal.confirm({
      nzTitle: Utils.deleteWarning(row.name),
      nzOnOk: () => {
        this._store.dispatch(new DeleteUserRoles(this.rowId));
      },
    });
  }

  public delete() {
    this._store.dispatch(new DeleteUserRoles(this.rowId));
    this.cancel();
  }

  public cancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }
  public changeStatus(row) {
    const obj = Object.assign({}, row);
    obj.active = obj.locked;
    this._store.dispatch(new PutUserRolesStatus(obj));
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

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetUserRoles({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
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

  public resetSearch() {
    this.place = '';
    delete this._filters['name'];
    this._page = 1;
    this.loadPage(this._page);
    this.searchResetButton = true;
  }
  public resetFilterSearch() {
    this.filter = {};
    this._filters = [];
    this.place = '';
    this._page = 1;
    this.loadPage(this._page);
  }
  public verify(row) {
    if (this.currentUser.lastName.toString().toUppercase != row.name.toString().toUppercase) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
