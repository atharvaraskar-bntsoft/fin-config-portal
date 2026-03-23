import { GetCurrentFilter } from './../../store/actions/audit-log.action';
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { getCurrentFilter, selectAuditLogs } from '../../store/selectors/audit-log.selector';
import { GetAuditLogs } from '../../store/actions/audit-log.action';
import moment from 'moment';
import { GetFilterData, ClearFilterData } from '@app/store/actions/filter.actions';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { TranslateService } from '@ngx-translate/core';
import { filter, pairwise, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Utils } from 'src/utils';
import {
  startOfToday,
  subMonths,
  subQuarters,
  subWeeks,
  differenceInCalendarDays,
  endOfYear,
  startOfYear,
} from 'date-fns';

declare var jQuery: any;

@Component({
  selector: 'app-audit-log',
  styleUrls: ['./audit-log.component.scss'],
  templateUrl: './audit-log.component.html',
})
export class AuditLogComponent implements OnInit, OnDestroy {
  public currentPagination = '20';
  public columns: any;
  public rows: any = [];
  public searchData: any = [];
  public userList: any;
  public entityTypeList: any;
  public actionTypeList: any;
  public _filters: Array<any> = [];
  public loading = false;
  private _page = 1;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  public request: Boolean = true;
  public resetButtonFlag: Boolean = false;
  public filter: any = {};
  isDataVisible: boolean;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('user', { static: true }) user: TemplateRef<any>;
  @ViewChild('action', { static: true }) action: TemplateRef<any>;
  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('object', { static: true }) object: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  componetDestroyed = new Subject();
  public differenceData: Array<any>;
  diffrence: any;
  subscription: Subscription;
  public savedFilter: any;
  public _filter: any = {};
  public auditLogStatusId = 'link_audit_log';
  data: any;

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
  };
  start = subWeeks(new Date(), 1);
  end = new Date();
  period = [subWeeks(new Date(), 1), new Date()];
  ranges: any = {};

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
  ) {
    this.loading = true;
    setInterval(() => {
      this.end = new Date();
      this.ranges = {
        'Today': [startOfToday(), new Date()],
        'Last 7 days': [subWeeks(new Date(), 1), new Date()],
        'Last 30 days': [subMonths(new Date(), 1), new Date()],
        'Last 6 months': [subQuarters(new Date(), 2), new Date()],
        'Last year': [
          startOfYear(subQuarters(new Date(), 3)),
          endOfYear(subQuarters(new Date(), 3)),
        ],
      };
    }, 1000);
  }
  loadData() {
    this._store.pipe(takeUntil(this.componetDestroyed), select(selectAuditLogs)).subscribe(res => {
      this.loading = true;
      if (res != null) {
        if (res && res.data) {
          this.request = true;
          if (this._page === 1) {
            this.rows = this._dataTransform(res.data.logsList);
          } else if (this.rows?.length !== 0) {
            this.rows = this.rows.concat(this._dataTransform(res.data.logsList));
          }
          if (res.data['total-record'] === this.rows?.length) {
            this.request = false;
          }
          this.totalRecords = res.data['total-record'];

          console.log('rows', this.rows);
        }
      }
      this.loading = false;
    });
  }

  public filterCall() {
    this._store.dispatch(new GetFilterData('/logs-audit/filter'));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectFilterData))
      .subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure') {
          this.userList = filter.data.user;
          this.entityTypeList = filter.data.entityType;
          this.actionTypeList = filter.data.actionType;
          this._store.dispatch(new ClearFilterData());
          this.fetchFilterData();
        }
      });

    this._store.pipe(takeUntil(this.componetDestroyed), select(getCurrentFilter)).subscribe(res => {
      if (res) {
        this.savedFilter = res;
        this.fetchFilterData();
      }
    });
  }

  private resetState() {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        pairwise(),
      )
      .subscribe((res: any) => {
        if (res[0].url !== '/logs/audit-log' || res[1].url !== '/logs/audit-log/details') {
          this._store.dispatch(new GetCurrentFilter(null));
        }
      });
  }

  private fetchFilterData() {
    if (this.savedFilter && this.entityTypeList && this.entityTypeList.length) {
      Object.assign(this.filter, this.savedFilter);
      if (this.savedFilter) {
        if (this.savedFilter.typeList) {
          this._filters['actionType'] = this.savedFilter.typeList;
        }
        if (this.savedFilter.entityType) {
          this._filters['entityType'] = this.savedFilter.entityType;
        }
      }
      this.loadPage(this._page);
    } else {
      this.setDefault();
    }
  }

  private setDefault() {
    const entity = this.entityTypeList && this.entityTypeList.find(ele => ele.id === 'deployment');
    this.getFilterLoginResultData(entity);
    this.filter.entityType = entity && entity.id;
  }

  ngOnInit() {
    this._filter.period = [this.start, this.end];
    this.onChange(this._filter.period);
    this.resetState();
    this.filterCall();
    this.loadData();
    this.translate
      .get(['DATE', 'OBJECT', 'STATUS', 'DESCRIPTION', 'USER_ROLE_ID', 'ACTIONS'])
      .subscribe(translation => {
        this.columns = [
          { prop: 'date', name: translation.DATE, cellTemplate: this.date },
          {
            prop: 'object',
            name: translation.OBJECT,
            cellTemplate: this.object,
          },

          {
            prop: 'role_details',
            name: translation.USER_ROLE_ID,
            cellTemplate: this.user,
            sortable: false,
          },
          {
            prop: 'actions',
            name: translation.STATUS,
            cellTemplate: this.action,
            sortable: false,
          },
          {
            prop: '',
            name: translation.ACTIONS,
            cellTemplate: this.actions,
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

  public resetFilterSearch() {
    this.filter = {};
    this._filters = [];
    this._page = 1;
    this.setDefault();
    this._page = 1;
    this._filter.period = [this.start, this.end];
    this.onChange(this._filter.period);
    this.loadPage(this._page);
  }

  public getFilterLoginResultData(eventData: any) {
    if (!eventData) {
      delete this._filters['entityType'];
    } else {
      this._filters['entityType'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getFilterActionType(eventData: any) {
    if (!eventData) {
      delete this._filters['actionType'];
    } else {
      this._filters['actionType'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getAuditLogsData(): void {
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

  private _dataTransform(Auditlogs: any) {
    const data = Utils.newData(Auditlogs);
    Auditlogs =
      Auditlogs !== null
        ? data.map((item: any) => {
            item.objectId = item.object.type.id;
            item.name = item.object.type.name;
            item.role_details = item.user.name;
            item.object.revisonId = item.id;
            return item;
          })
        : null;

    return Auditlogs;
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
    this.data = {
      filter: this._transFilters(),
      page: pagenumber,
      'page-size': this.currentPagination,
    };
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(new GetAuditLogs(this.data));
    this.request = false;
  }

  public viewdetails(row) {
    if (this.filter) {
      this._store.dispatch(new GetCurrentFilter(this.filter));
    }
    this._router.navigate(['/logs/audit-log/details'], {
      state: { rowData: row },
    });
  }

  public viewDiffrence(row) {
    if (row.difference) {
      this.isDataVisible = true;
      this.diffrence = row.difference;
    }
  }

  public checkButton(row) {
    if (row.difference) {
      const data = JSON.parse(row.difference);
      if (data.length) {
        this.differenceData = data.filter(
          item => item.columnName !== 'updatedOn' && item.columnName !== 'createdOn',
        );
        if (this.differenceData.length) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onChange(result: any): void {
    if (result && result.length === 2) {
      this._filters['period'] = `${moment(result[0]).format('X')}-${moment(result[1]).format('X')}`;
    }
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
