import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { CorePropertiesService } from '@app/services/core-properties.service';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ClearState, GetCoreProperties } from '../../store/actions/core-properties.action';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { selectCorePropertiesListGet } from '../../store/selectors/core-properties.selector';
import { Utils } from 'src/utils';
import { Router } from '@angular/router';
import { AlertService } from '@app/services/alert.service';
declare var jQuery: any;

@Component({
  selector: 'app-core-properties',
  templateUrl: './core-properties.component.html',
  styleUrls: ['./core-properties.component.css'],
})
export class CorePropertiesComponent implements OnInit, OnDestroy {
  public coreProperties: any = [];
  public columns: Array<any> = [];
  readonly rowHeight = 45;
  headerHeight = 36;
  public loading = false;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public corePropertiesId = 'link_l1_adapters';
  public currentLang: string;
  public request: boolean = true;
  public _page = 1;
  public currentPagination = '20';
  public _filters: Array<any> = [];
  public componetDestroyed = new Subject();
  public subscription = new Subscription();
  public rowData: any = [];
  public totalRecords: number;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  @ViewChild('type', { static: true }) type: TemplateRef<any>;
  @ViewChild('subType', { static: true }) subType: TemplateRef<any>;
  @ViewChild('name', { static: true }) name: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  constructor(
    public _store: Store<IAppState>,
    public translate: TranslateService,
    public corePropertiesService: CorePropertiesService,
    public router: Router,
    public alertService: AlertService,
  ) {}

  loadData() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectCorePropertiesListGet))
      .subscribe((response: any) => {
        if (response) {
          this.rowData = Utils.newData(response.data.corePropertiesList);
          this.rowData = this.rowData.map(item => {
            item.name = item.name ? item.name : null;
            item.type = item.type ? item.type : null;
            item.subType = item.subType ? item.subType : null;
            item.version = item.corePropertiesDetails.length
              ? item.corePropertiesDetails[item.corePropertiesDetails.length - 1].version
              : null;
            item.versionId = item.corePropertiesDetails.length
              ? item.corePropertiesDetails[item.corePropertiesDetails.length - 1].id
              : null;
            return item;
          });
          this.request = true;
          if (this._page === 1) {
            this.coreProperties = Utils.newData(response.data.corePropertiesList);
          } else if (this.coreProperties.length !== 0) {
            this.coreProperties = this.coreProperties.concat(
              Utils.newData(response.data.corePropertiesList),
            );
          }
          if (response.data['total-record'] === this.coreProperties.length) {
            this.request = false;
          }
          this.totalRecords = response.data['total-record'];
          this.loading = false;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
          this.loadPage(this._page);
        }
      });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find((item: any) => item.id === this.corePropertiesId);
        this.permissionObject = this.permission;
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.createColumns();
  }

  public createColumns() {
    this.translate.get(['NAME', 'TYPE', 'SubType', 'VERSION', 'ACTION']).subscribe(translation => {
      this.columns = [
        {
          prop: 'name',
          name: translation.NAME,
          sortable: false,
        },
        {
          prop: 'type',
          name: translation.TYPE,
          sortable: false,
        },
        {
          prop: 'subType',
          name: translation.SUBTYPE,
          sortable: false,
        },
        {
          prop: 'version',
          name: translation.VERSION,
          cellTemplate: this.version,
          sortable: false,
        },
        {
          prop: 'action',
          name: translation.ACTION,
          cellTemplate: this.actions,
          sortable: false,
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

  public loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator

    this._store.dispatch(
      new GetCoreProperties({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  public _transFilters(): String {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public changeRow(event = null, row = null) {
    if (event != null && row != null) {
      row.version = event.version;
      row.versionId = event.id;
      row.action = event.action;
    }
  }
  
  async downloadCoreProperties(row: any) {
    console.log("Full row object:", row);

    const versionId = row.versionId;

    if (!versionId && versionId !== 0) {
      console.error('Core Properties versionId missing');
      return;
    }

    try {
      // Ask user where to save
      const dirHandle = await (window as any).showDirectoryPicker();

       this.corePropertiesService
	    .downloadCoreProperties(versionId)
        .subscribe(async (res: any) => {

          if (res?.status === 'success' && res?.data?.files?.length) {

            const file = res.data.files[0];
            let content = file.content;

            try {
              content = JSON.stringify(JSON.parse(content), null, 2);
            } catch {}

            const fileHandle = await dirHandle.getFileHandle(
              file.fileName || 'core-properties.json',
              { create: true }
            );

            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();

            alert('Core Properties downloaded successfully!');
          }
        });

    } catch (err) {
      console.error('Core Properties download failed', err);
    }
  }



  editCoreProperties(row: any) {
    if (row) {
      this.router.navigate(['/processor-config/core-properties/update', row.versionId]);
    }
  }

  deleteCoreProperties(row: any = null) {
    if (row != null) {
      if (row.version == 0) {
        this.corePropertiesService
          .deleteCoreProperties(row.versionId)
          .pipe(takeUntil(this.componetDestroyed))
          .subscribe(response => {
            if (response && response.status == 'success') {
              this.alertService.responseMessage(response);
              this.loadPage(this._page);
            }
          });
      }
    }
  }
  /**
   * on destroy
   */
  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this.subscription.unsubscribe();
  }
}
