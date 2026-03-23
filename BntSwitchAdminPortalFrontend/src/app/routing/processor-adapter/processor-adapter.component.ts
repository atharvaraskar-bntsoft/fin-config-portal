import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Router } from '@angular/router';
import { GetProcessorAdapter } from '@app/store/actions/processor-adapter.action';
import { selectprocessorAdapterList } from '@app/store/selectors/processor-adapter.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
declare var jQuery: any;

@Component({
  selector: 'app-processor-adapter',
  styleUrls: ['./processor-adapter.component.scss'],
  templateUrl: './processor-adapter.component.html',
})
export class ProcessorAdapterComponent implements OnInit, OnDestroy {
  public currentLang: string;
  public Labels: any;
  public rows: any = [];
  public rowBackup: any;
  public columns: any;
  public dimensions = {
    footerHeight: 40,
    headerHeight: 40,
    rowHeight: 55,
  };
  public loading = true;
  public permission: any;
  public request: Boolean = true;
  private _page = 1;
  public currentPagination = 20;
  public totalRecords: Number;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('active', { static: true }) active: TemplateRef<any>;
  @ViewChild('service', { static: true }) service: TemplateRef<any>;
  @ViewChild('cartiage', { static: true }) cartiage: TemplateRef<any>;
  @ViewChild('isSAFEnabled', { static: true }) isSAFEnabled: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  componetDestroyed = new Subject();
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };

  public processorAdapterId = 'link_processor_adapter';
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
  ) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectprocessorAdapterList))
      .subscribe((data: any) => {
        if (data) {
          this.request = true;
          if (this._page === 1) {
            this.rows = data.processorAdapterList;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(data.processorAdapterList);
          }
          if (data['total-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = data['total-record'];
          this.loading = false;
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
          this.loadPage(this._page);
        }
      });

    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.processorAdapterId);
        this.permissionObject = this.permission;
      }
    });
  }

  ngOnInit() {
    this.translate
      .get(['ID', 'CODE', 'STATUS', 'IS_SAF_ENABLED', 'SERVICE', 'CARTIAGE', 'ACTIONS'])
      .subscribe(translation => {
        this.columns = [
          { prop: 'code', name: translation.CODE, sortable: false, width: 60 },
          { prop: 'name', name: translation.NAME, sortable: false, width: 80 },
          {
            prop: 'active',
            name: translation.STATUS,
            cellTemplate: this.active,
            sortable: false,
            width: 40,
          },
          {
            prop: 'isSAFEnabled',
            name: translation.IS_SAF_ENABLED,
            cellTemplate: this.isSAFEnabled,
            sortable: false,
            width: 40,
          },
          {
            prop: 'lookupvalueId',
            name: translation.SERVICE,
            cellTemplate: this.service,
            sortable: false,
            width: 80,
          },
          {
            prop: 'adapterId',
            name: translation.CARTIAGE,
            cellTemplate: this.cartiage,
            sortable: false,
            width: 130,
          },
          {
            prop: 'action',
            name: translation.ACTIONS,
            cellTemplate: this.actions,
            sortable: false,
            width: 40,
          },
        ];
      });
  }

  public getRowData(row) {
    this._router.navigate(['/routing/processor-adapter/edit', row.id]);
  }

  viewItem(row) {
    this._router.navigate(['/routing/processor-adapter/', row.id, 'view']);
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
      new GetProcessorAdapter({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
