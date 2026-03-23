import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { ClearState, GetInvalidLogs } from '@app/store/actions/invalid-log.action';
import { selectInvalidLog } from '../../store/selectors/invalid-log.selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-invalid-log',
  styleUrls: ['./invalid-log.component.css'],
  templateUrl: './invalid-log.component.html',
})
export class InvalidLogComponent implements OnInit, OnDestroy {
  public currentPagination = '20';
  public currentLang: string;
  public columns: any;
  public rows: any = [];
  public keyData: any = {};
  public visible = false;
  public visibleAnimate = false;
  public dateFlag = false;
  public searchData: any = [];
  public temp: any;
  public detailsFlag = false;
  public otherFlag = true;
  public rowData: any;
  public userList: any;
  public loginList: any;
  public place: any = '';
  private _filters: Array<any> = [];
  public fromDate = null;
  public dateTimestamp1: any;
  public dateTimestamp2: any;
  public toDate = null;
  public resetButtonFlag: Boolean = false;
  public periodList = [
    { id: 1, name: 'All Time' },
    { id: 2, name: 'Last 7 days' },
    { id: 3, name: 'Last 30 days' },
    { id: 4, name: 'Last 6 Months' },
    { id: 5, name: 'Last Year' },
    { id: 6, name: 'Other' },
  ];
  public loading = true;
  public resetFlag = false;
  public filter: any = {};
  private _page = 1;
  public s: string;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  public totalRecords: Number;
  public request: Boolean = true;
  @Input() public data: any;
  @ViewChild('processingStatus', { static: true })
  processingStatus: TemplateRef<any>;
  @ViewChild('transactionTime', { static: true })
  transactionTime: TemplateRef<any>;
  @ViewChild('viewDetails', { static: true }) viewDetails: TemplateRef<any>;
  componetDestroyed = new Subject();
  @ViewChild('myTable', { static: true }) table;

  constructor(private _store: Store<IAppState>, private el: ElementRef) {
    this.loadPage(this._page);
  }
  loadData() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectInvalidLog))
      .subscribe((res: any) => {
        if (res) {
          this.request = true;
          if (this._page === 1) {
            this.rows = res.resultList;
          } else if (this.rows?.length !== 0) {
            this.rows = this.rows.concat(res.resultList);
          }
          if (res['total-record'] === this.rows?.length) {
            this.request = false;
          }
          this.totalRecords = res['total-record'];
          this.loading = false;
        }
      });
  }


  ngOnInit() {
    this._store.dispatch(new GetInvalidLogs());
    this.loadData();
    this.columns = [
      {
        prop: 'processingStatus',
        name: 'Processing Status',
        cellTemplate: this.processingStatus,
        width: 170,
      },
      { prop: 'adapterId', name: 'Adapter Id', width: 145 },
      { prop: 'clientAddress', name: 'Client Address', width: 130 },
      { prop: 'serverAddress', name: 'Server Address', width: 245 },
      {
        prop: '',
        name: 'Transaction Time',
        cellTemplate: this.transactionTime,
        width: 267,
      },
    ];
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
      new GetInvalidLogs({
        filter: 'null',
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  public keyDetails(row) {
    this.keyData = row.raw_message;
    this.open();
  }

  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }

  public close(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }
  ngOnDestroy() {
    this._store.dispatch(new ClearState());
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._page = 1;
  }
}
