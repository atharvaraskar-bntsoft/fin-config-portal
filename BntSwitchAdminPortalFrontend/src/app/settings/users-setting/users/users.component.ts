import { Component, OnInit, TemplateRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import {
  ClearState,
  DeleteUsers,
  GetUsers,
  PutUsersStatus,
} from '../../../store/actions/user.actions';
import {
  selectUserDelete,
  selectUserStatus,
  selectUserList,
} from '../../../store/selectors/user.selector';
import { GetFilterData } from '../../../store/actions/filter.actions';
import { selectFilterData } from '../../../store/selectors/filter.selectors';
import { Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { UserGetObject } from '@app/models/user.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

declare var jQuery: any;

@Component({
  selector: 'app-users',
  styleUrls: ['./users.component.css'],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any = {};
  public rows: any = [];
  public rowBackup: any;
  public columns: any;
  public searchData: any = [];
  public dimensions = {
    footerHeight: 40,
    headerHeight: 40,
    rowHeight: 72,
  };
  public visibleAnimate = false;
  public visible = false;
  public rowId: any;
  public statusList: any;
  public roleList: any;
  public loading = true;
  public usersId = 'link_user';
  public usersData: any;
  public permission: any;
  public objectData: any;
  public s: string;
  public totalRecords: Number;
  public readonly headerHeight = 40;
  public readonly rowHeight = 75;
  public readonly pageLimit = 15;
  public searchResetButton: Boolean = true;
  public componetDestroyed = new Subject();

  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('email', { static: true }) email: TemplateRef<any>;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  public place: any = '';
  public searchText = '';
  private _filters: Array<any> = [];
  private _search: Array<any> = [];
  private _page = 1;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private el: ElementRef,
  ) { }

  public ngOnInit() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserList))
      .subscribe((data: any) => {
        if (data) {
          
          this.usersData = data.data.usersList;
          if (this._page === 1) {
            this.rows = this._dataTransform(this.usersData);
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(this._dataTransform(this.usersData));
          }
          this.totalRecords = data.data['total-record'];
          this.loading = false;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectPermissionsData))
      .subscribe((response: any) => {
        if (response) {
          this.permission = response.data.find(item => item.id === this.usersId);
        }
      });
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
    this.loadPage(this._page);

    this._store.dispatch(new GetFilterData('/users/filter'));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectFilterData))
      .subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure') {
          this.statusList = filter.data.status;
          this.roleList = filter.data.role;
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserStatus))
      .subscribe((response: any) => {
        if (response) {
          this._store.dispatch(new ClearState());
          if (response && response.status === 'success') {
            this._store.dispatch(
              new GetUsers({
                filter: false,
                search: false,
              }),
            );
          }
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserDelete))
      .subscribe((response: any) => {
        if (response) {
          this._store.dispatch(new ClearState());
          if (response && response.status === 'failure') {
          } else if (response && response.status === 'success') {
            this.loadPage(this._page);
          }
        }
      });
    this.translate
      .get(['USERNAME', 'STATUS', 'CONTACTS', 'ACTION'])
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(translation => {
        this.columns = [
          { prop: 'name', name: translation.USERNAME, Searchable: true },
          {
            cellTemplate: this.status,
            name: translation.STATUS,
            prop: 'locked',
          },
          {
            Searchable: true,
            cellTemplate: this.email,
            name: translation.CONTACTS,
            prop: 'email',
          },
          // {
          //   cellTemplate: this.actions,
          //   name: translation.ACTION,
          //   prop: "action",
          //   sortable: false,
          // },
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
    this.searchData.push('mobileNum');
  }

  public deleteRow(row) {
    this.objectData = row.name;
    this.rowId = row.id;
    this.open();
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

  public delete() {
    this._store.dispatch(new DeleteUsers(this.rowId));
    this.cancel();
  }

  public getFilterStatusData(eventData: any) {
    if (!eventData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = eventData.id;
    }
    this._store.dispatch(
      new GetUsers({
        filter: true,
        filterStr: this._transFilters(),
        search: this.searchText.length ? true : false,
        searchStr: this.searchText.length !== 0 ? `searchText:${this.searchText}` : '',
      }),
    );
  }

  public getFilterRole(eventData: any) {
    if (!eventData) {
      delete this._filters['role'];
    } else {
      this._filters['role'] = eventData.id;
    }
    this._store.dispatch(
      new GetUsers({
        filter: true,
        filterStr: this._transFilters(),
        search: this.searchText.length ? true : false,
        searchStr: this.searchText.length !== 0 ? `searchText:${this.searchText}` : '',
      }),
    );
  }

  public getRowData(row) {
    this._router.navigate(['/settings/users/edit', row.id]);
  }

  public changeStatus(row) {
    const obj = Object.assign({}, row);
    obj.active = obj.locked;
    this._store.dispatch(new PutUsersStatus(obj));
  }

  public getFilterNameData(eventData: any) {
    if (this.place) {
      this.searchResetButton = false;
      this.searchText = eventData.currentTarget.value.trim();
      if (this.searchText) {
        this._store.dispatch(
          new GetUsers({
            filter: this._transFilters() && this._transFilters().length !== 0 ? true : false,
            filterStr: this._transFilters(),
            search: this.searchText.length ? true : false,
            searchStr: this.searchText.length !== 0 ? `searchText:${this.searchText}` : '',
          }),
        );
      }
    }
  }

  public resetSearch() {
    this.place = '';
    this.searchText = '';
    this.searchResetButton = true;
    this._store.dispatch(
      new GetUsers({
        filter: false,
        search: false,
      }),
    );
  }

  public resetUpload() {
    this._store.dispatch(new ClearState());
  }

  public onScroll(offsetY: any) {
    // total height of all rows in the viewport
    const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;

    if (
      jQuery('.datatable-body').scrollTop() ===
      jQuery('.datatable-body').get(0).scrollHeight -
        jQuery('.datatable-body').get(0).offsetHeight +
        15
    ) {
      // total number of results to load
      let pagenumber = this.pageLimit;

      // check if we haven't fetched any results yet
      pagenumber = Math.ceil(this.rows.length / this.pageLimit) + 1;

      this._page = ++this._page;
      this.loadPage(pagenumber);
    }
  }
  public ngOnDestroy() {
    this.componetDestroyed.next();
    this._store.dispatch(new ClearState());
    this.componetDestroyed.unsubscribe();
  }

  private _dataTransform(users: any) {
    users =
      users !== null
        ? users.map((item: any) => {
            item.name = item.firstName + ' ' + item.lastName;
            return item;
          })
        : null;

    return users;
  }

  private _transFilters() {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetUsers({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    // this.loading = true;
  }
}
