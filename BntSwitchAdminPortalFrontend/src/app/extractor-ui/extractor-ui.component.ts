import { Component, OnInit, ContentChild, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import {  Router } from '@angular/router';
import {
  selectExtractors,
  selectPauseExtractor,
  selectResumeExtractor,
  selectStartExtractor,
  selectStopExtractor,
} from '../store/selectors/extractor.selector';
import {
  GetExtractor,
  ClearState,
  PutExtractor,
  StartExtractor,
  StopExtractor,
  PauseExtractor,
  ResumeExtractor,
} from '../store/actions/extractor.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
declare var jQuery: any;

@Component({
  selector: 'app-extractor-ui',
  templateUrl: './extractor-ui.component.html',
  styleUrls: ['./extractor-ui.component.css'],
})
export class ExtractorUiComponent implements OnInit {
  public loading = false;
  public columns: Array<any> = [];
  public rows: any = [];
  readonly rowHeight = 55;
  readonly headerHeight = 40;
  public request: Boolean = true;
  private _page = 1;
  public currentPagination = '20';
  private _filters: Array<any> = [];
  componetDestroyed = new Subject();
  public rowData: any = [];
  public totalRecords: Number;
  public currentLang: string;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  @ViewChild('jobName', { static: true }) jobName: TemplateRef<any>;
  @ViewChild('jobGroup', { static: true }) jobGroup: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public extractorId = 'link_extractor';
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private router: Router,
  ) {
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.extractorId);
        this.permissionObject = this.permission;
      }
    });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectExtractors))
      .subscribe((response: any) => {
        if (response) {
          this.request = true;
          response.data.jobgroup = response.data.jobgroup.map((item) => {
            item.version = item.versions.length
            ? item.versions[0].version
            : null;
            item.versionId = item.versions.length
            ? item.versions[0].id
            : null;
            item.jobStatus = item.versions.length
            ? item.versions[0].jobStatus
            : null;
            item.deployed = item.versions.length
            ? item.versions[0].deployed
            : null;
            return item;
          })
          if (this._page === 1) {
            this.rows = response.data.jobgroup;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(response.data.jobgroup);
          }
          if (response.data['total-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = response.data['total-record'];
          this.loading = false;
        }
      });

    this._store.pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectStartExtractor))
      .subscribe((response: any) => {
        if (response && response.status === 'success') {
          this.loadPage(this._page);
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectPauseExtractor))
      .subscribe((response: any) => {
        if (response && response.status === 'success') {
          this.loadPage(this._page);
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectResumeExtractor))
      .subscribe((response: any) => {
        if (response && response.status === 'success') {
          this.loadPage(this._page);
        }
      });

      this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectStopExtractor))
      .subscribe((response: any) => {
        if (response && response.status === 'success') {
          this.loadPage(this._page);
        }
      });
  }

  ngOnInit() {
    this.translate.get(['JOBNAME', 'jobGroup', 'VERSION', 'STATUS' , 'ACTION']).subscribe(translation => {
      this.columns = [
        {
          prop: 'jobName',
          name: translation.NAME,
          sortable: false
        },
        {
          prop: 'jobGroup',
          name: translation.TYPE,
          sortable: false
        },
        {
          prop: 'version',
          name: translation.VERSION,
          cellTemplate: this.version,
          sortable: false
        },
        {
          prop: 'status',
          name: translation.STATUS,
          cellTemplate: this.status,
          sortable: false
        },
        {
          prop: 'action',
          name: translation.ACTION,
          cellTemplate: this.actions,
          sortable: false
        },
      ];
    });
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
      new GetExtractor({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  private _transFilters(): String {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public changeRow(event, row) {
    row.version = event.version;
    row.versionId = event.id;
    row.action = event.action;
    row.jobStatus = event.jobStatus;
    row.deployed = event.deployed;
  }

  editExtractor(row) {
    this.router.navigate(['/extractor-ui/edit', row.versionId]);
  }
  public startExtractor(row): void {
    this._store.dispatch(new StartExtractor(row));
  }

  public stopExtractor(row): void {
    this._store.dispatch(new StopExtractor(row));
  }

  public pauseExtractor(row): void {
    this._store.dispatch(new PauseExtractor(row));
  }

  public resumeExtractor(row): void {
    this._store.dispatch(new ResumeExtractor(row));
  }
}
