import { ActivatedRoute, Router } from '@angular/router';
import {
  ClearState,
  DeleteMultiple,
  GetException,
  GetSAFQueue,
  GetSAFQueueDDL,
  MoveToSAFQueue,
} from './../../store/actions/invalid-log.action';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import {
  exceptionalQueueList,
  moveToSAFQueue,
  safDDLSelector,
  safQueueList,
  selectDeleteMultiple,
} from '@app/store/selectors/invalid-log.selector';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from 'src/utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs/internal/Subject';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { InvalidLogService } from '@app/services/invalid-log.service';
import { catchError, debounceTime, takeWhile } from 'rxjs/operators';
import { of } from 'rxjs';
declare var jQuery: any;

interface IFilterData {
  route: string;
  id?: string;
  status?: string;
}

@Component({
  selector: 'app-saf-queue',
  templateUrl: './saf-queue.component.html',
  styleUrls: ['./saf-queue.component.scss'],
})
export class SafQueueComponent implements OnInit {
  public data: any;
  public ids: any;
  subscription: Subscription[] = [];
  headerHeight = 40;
  rowHeight = 40;
  searchResetButton: Boolean = true;
  confirmModal?: NzModalRef;
  loading = true;
  public rows: any = [];
  public safQueueRows: any = [];
  isException = false;
  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  columns: (
    | { prop: string; name: any; cellTemplate?: undefined; sortable?: boolean }
    | { prop: string; name: any; cellTemplate: any; width?: any; sortable: boolean }
  )[];
  public currentPagination = '20';

  @ViewChild('action', { static: true }) action: TemplateRef<HTMLInputElement>;
  @ViewChild('attemptTime', { static: true }) attemptTime: TemplateRef<HTMLElement>;
  @ViewChild('nextAttemptTemplate', { static: true }) nextAttemptTemplate: TemplateRef<HTMLElement>;
  @ViewChild('dependentData', { static: true }) dependentData: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  @ViewChild('select', { static: true }) select: TemplateRef<any>;

  public request: boolean = false;
  page = 1;
  safeStatusDDL: any;
  safeProcessor: any;
  filter: string;
  isTableVisible: boolean;
  isChecked: boolean;
  dependentValues: any;
  filterData: any = {};
  searchTerm$ = new Subject<string>();
  public totalRecords: Number;
  warningError = false;
  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private _router: Router,
    private modal: NzModalService,
    public invalidLogService: InvalidLogService,
  ) {}
  loadData() {
    this.store.select(safQueueList).subscribe((result: any) => {
      if (result && result != null) {
        this.request = true;
        if (result['total-record'] === 0) {
          this.rows = result.safList;
        } else {
          if (this.page === 1) {
            if (result.safList) {
              this.rows = result.safList;
            }
          } else if (this.rows?.length !== 0) {
            this.rows = this.rows.concat(result.safList);
          }
          if (result['total-record'] === this.rows?.length) {
            this.request = false;
          }
        }
        this.totalRecords = result['total-record'];
        this.warningError = false;
        console.log('totalrecords', this.totalRecords);
        this.rows = [...this.rows]; // Refresh the data
      }
      this.loading = false;
    });
  }
  getExceptionQueueList() {
    this.store.select(exceptionalQueueList).subscribe((res: any) => {
      if (res && this.isException) {
        this.request = true;
        if (this.page === 1) {
          this.rows = res.exceptionList;
        } else if (this.rows?.length !== 0) {
          this.rows = this.rows.concat(res.exceptionList);
        }
        if (res['total-record'] === this.rows?.length) {
          this.request = false;
        }
        this.totalRecords = res['total-record'];
        this.rows = [...this.rows]; // Refresh the data
      }
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getExceptionQueueList();

    if (!this.isException) {
      this.loadData();
      this.getSafQueueDDL();
    }
    this.page = 1;
    this.isException = this.route.snapshot.data.exception;
    this.setColumns();
    this.loadPage(this.page);
  }

  getSafQueueDDL() {
    if (!this.isException) {
      this.store.dispatch(new GetSAFQueueDDL());
      this.store.select(safDDLSelector).subscribe(result => {
        if (result) {
          this.safeStatusDDL = result.data;
        }
      });
    }
  }

  getSafId(eventData) {
    if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
      this.filterData.id = eventData.currentTarget.value;
    } else {
      this.resetFilter();
    }
    this.page = 1;
    this.loadPage(this.page);
  }

  // ngAfterViewInit() {
  //   this.searchTerm$
  //     .pipe(
  //       catchError(err => of([])),
  //       debounceTime(400),
  //       takeWhile(ele => ele.length > 3),
  //     )
  //     .subscribe(res => {
  //       this.searchResetButton = false;
  //       this.loadPage(this.page);
  //     });
  // }

  private setColumns() {
    this.translate
      .get([
        'ID',
        'NAME',
        'NO_OF_ATTEMPTS',
        'LAST_ATTEMPT_TIME',
        'NEXT_ATTEMPT_TIME',
        'DEPENDENT_DATA',
        'STATUS',
        'ACTION',
      ])
      .subscribe(translation => {
        this.columns = [
          {
            prop: 'select',
            name: translation.SCHEDULE_SELECT,
            cellTemplate: this.select,
            sortable: false,
          },
          { prop: 'id', name: translation.ID },
          { prop: 'noOfAttempts', name: translation.NO_OF_ATTEMPTS },
          {
            prop: 'lastAttemptTime',
            name: translation.LAST_ATTEMPT_TIME,
            sortable: true,
            cellTemplate: this.attemptTime,
          },
          {
            prop: 'nextAttemptTime',
            name: translation.NEXT_ATTEMPT_TIME,
            sortable: true,
            cellTemplate: this.nextAttemptTemplate,
          },
          {
            prop: 'dependentData.name',
            name: translation.DEPENDENT_DATA,
            sortable: false,
            cellTemplate: this.dependentData,
          },
        ];
        if (this.isException) {
        } else {
          this.columns.splice(1, 0, {
            prop: 'status.name',
            name: translation.STATUS,
          });
        }
      });
  }

  checkPage() {
    if (this.isException) {
      return true;
    } else {
      return false;
    }
  }

  public onScroll(offsetY: any) {
    const THis = this;
    jQuery('.datatable-body').on('scroll', function () {
      let div = jQuery(this).get(0);
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (THis.request) {
          THis.page = ++THis.page;
          THis.loadPage(THis.page);
          console.log('page', THis.page);
        }
      }
    });
  }

  private _transFilters(): Object {
    if (this.filterData.id != '') {
      const output = Object.keys(this.filterData);
      return output
        .map(item => {
          return item + ':' + this.filterData[item];
        })
        .join(',');
    }
  }

  private loadPage(pagenumber: Number) {
    this.data = {
      page: pagenumber,
      'page-size': this.currentPagination,
      filter: this._transFilters(),
    };
    if (this.isException) {
      this.store.dispatch(new GetException(this.data));
    } else {
      this.store.dispatch(new GetSAFQueue(this.data));
    }
    this.request = false;
  }

  deleteSAF($event) {
    this.confirmModal = this.modal.confirm({
      nzTitle: Utils.deleteWarning($event.id),
      nzOnOk: () => {
        this.invalidLogService.deleteExceptionalQueue($event).subscribe((res: any) => {
          if (res && res.status === 'success') {
            this.loadPage(this.page);
          }
        });
      },
    });
  }

  navigateToSAF() {
    this.ids = this.rows.reduce((id, item) => {
      if (item.select) {
        id.push(item.id);
      }
      return id;
    }, []);

    if (this.ids.length > 0) {
      this.loading = true;
      this.store.dispatch(new MoveToSAFQueue(this.ids));
    }
    // Moving saf queue api
    this.store.select(moveToSAFQueue).subscribe(result => {
      if (result && result.status === 'success') {
        this._router.navigate(['logs/saf-queue']);
      } else {
        this.loading = false;
      }
    });
  }

  autoScroll() {
    setTimeout(function () {
      jQuery('.datatable-body').animate(
        {
          scrollTop: 10,
        },
        100,
      );
    });
  }

  resetFilter() {
    delete this.filterData.route;
    delete this.filterData.id;
    delete this.filterData.status;
    this.filter = '';
    this.filterData = {};
    this.searchResetButton = true;
    this.page = 1;
    this.isChecked = false;
    this.loadPage(this.page);
    this.autoScroll();
  }

  refreshPage() {
    delete this.filterData.route;
    delete this.filterData.id;
    delete this.filterData.status;
    this.filter = '';
    this.filterData = {};
    this.searchResetButton = true;
    this.page = 1;
    this.isChecked = false;
    this.loadPage(this.page);
    this.autoScroll();
  }

  getFilterData(data, type) {
    if (data) {
      if (type == 'status') {
        this.filterData.status = data.id;
      } else if (type == 'route') {
        this.filterData.route = data.id;
      }
      this.searchResetButton = false;
      this.page = 1;
      this.loadPage(this.page);
    } else {
      this.resetFilter();
    }
  }

  viewData(row) {
    if (row && row.dependentData) {
      this.isTableVisible = true;
      this.dependentValues = row.dependentData;
    }
  }

  ngOnDestroy() {
    this.rows = [];
    this.page = 1;
    this.store.dispatch(new ClearState({}));
    this.subscription.forEach(subs => subs.unsubscribe());
  }

  selectAllComponent($event: MatCheckboxChange) {
    this.warningError = false;
    if ($event.checked) {
      this.rows = this.rows.map(item => {
        item.select = true;
        return item;
      });
    } else {
      this.rows = this.rows.map(item => {
        item.select = false;
        return item;
      });
    }
  }

  deleteFilter() {
    const ids = this.rows.reduce((id, item) => {
      if (item.select) {
        id.push(item.id);
      }
      return id;
    }, []);
    if (ids.length == 0) {
      this.warningError = true;
      console.log('del', this.warningError);
    } else if (ids.length > 0) {
      this.warningError = false;
      this.confirmModal = this.modal.confirm({
        nzTitle: Utils.deleteWarning(ids),
        nzOnOk: () => {
          this.store.dispatch(new DeleteMultiple(ids));
          this.store.select(selectDeleteMultiple).subscribe(res => {
            if (res && res.status === 'success') {
              this.refreshPage();
            }
          });
        },
      });
    }
  }
}
