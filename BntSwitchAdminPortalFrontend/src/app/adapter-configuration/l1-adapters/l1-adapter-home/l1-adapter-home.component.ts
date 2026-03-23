import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { selectL1AdapterMenu } from '@app/store/selectors/l1-adapter.selectors';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Subject } from 'rxjs';
import { GetMenu } from '@app/store/actions/l1-adapter.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Utils } from 'src/utils';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { AlertService } from '@app/services/alert.service';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { GetImfJsonView } from '@app/store/actions/imf-json.action';
import { getIfmList } from '@app/store/selectors/imf-json.selector';
declare var jQuery: any;

@Component({
  selector: 'app-l1-adapter-home',
  styleUrls: ['./l1-adapter-home.component.scss'],
  templateUrl: './l1-adapter-home.component.html',
})
export class L1AdapterHomeComponent implements OnInit {
  public adaptorMenu: any = [];
  componetDestroyed = new Subject();
  public loading = true;
  public visibleCopy = false;
  public visibleCopyAnimate = false;
  public rows: any = [];
  public columns: Array<any> = [];
  readonly headerHeight = 40;
  public request: boolean = true;
  private _page = 1;
  private _filters: Array<any> = [];
  public visible = false;
  public visibleAnimate = false;
  public finalId: any;
  public currentPagination = '20';
  readonly rowHeight = 48;
  public currentLang: string;
  public totalRecords: number;
  public selectedVersion: any;
  public currentItem: any;
  public rowData: any = [];
  public copyObj: any = {
    configuraionId: null,
    adapterName: null,
    imfId: null,
  };
  public getIfmList: any = [];
  public isSaveCopy = false;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
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

  public l1AdaptersId = 'link_l1_adapters';
  public selectedAdapterName: any;
  public jsonVisible: Boolean = false;
  public type = 'L1';
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _l1AdapterService: L1AdapterService,
    private _router: Router,
    private alertService: AlertService,
  ) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectL1AdapterMenu))
      .subscribe((response: any) => {
        if (response) {
          this.rowData = Utils.newData(response.adaptorlist);
          this.rowData = this.rowData.map(item => {
            item.status = item.adapterConfigSummaryUIWapper.length
              ? item.adapterConfigSummaryUIWapper[0].status
              : null;
            item.version = item.adapterConfigSummaryUIWapper.length
              ? item.adapterConfigSummaryUIWapper[0].version
              : null;
            item.action = item.adapterConfigSummaryUIWapper.length
              ? item.adapterConfigSummaryUIWapper[0].action
              : null;
            return item;
          });

          this.request = true;
          if (this._page === 1) {
            this.adaptorMenu = Utils.newData(response.adaptorlist);
          } else if (this.adaptorMenu.length !== 0) {
            this.adaptorMenu = this.adaptorMenu.concat(Utils.newData(response.adaptorlist));
          }
          if (response['total-record'] === this.adaptorMenu.length) {
            this.request = false;
          }
          this.totalRecords = response['total-record'];
          this.loading = false;
        }
      });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });

    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.l1AdaptersId);
        this.permissionObject = this.permission;
      }
    });

    this._store.dispatch(new GetImfJsonView());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(getIfmList))
      .subscribe((response: any) => {
        if (response) {
          let IfmList = response.data.imfStructureList;
          IfmList = IfmList.filter(item => item.version !== 0);
          this.getIfmList = [];
          const size = 2;
          const items = IfmList.slice(0, size);
          this.getIfmList = items.map(item => {
            return {
              id: item.id,
              name: item.name,
              version: item.version,
            };
          });
        }
      });
  }

  /**
   * on init
   */
  ngOnInit() {
    this.translate.get(['NAME', 'TEMPLATE', 'VERSION', 'ACTION']).subscribe(translation => {
      this.columns = [
        { prop: 'name', name: translation.NAME },
        { prop: 'template', name: translation.TEMPLATE },
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

  public onScroll() {
    const THis = this;
    jQuery('.datatable-body').on('scroll', function () {
      let div = jQuery(this).get(0);
      if (Math.ceil(div.scrollTop) + div.clientHeight >= div.scrollHeight) {
        if (THis.request) {
          THis._page = ++THis._page;
          THis.loadPage(THis._page);
        }
      }
    });
  }

  /**
   * Loads page
   * @param pagenumber
   */
  private loadPage(pagenumber: number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetMenu({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  /**
   * Gets row data
   * @param row
   */
  public getRowData(row): void {
    let id = row.id;
    row.adapterConfigSummaryUIWapper.forEach(item => {
      if (item.version === row.version) {
        id = item.id;
      }
    });
    this._router.navigate(['adapter-configuration/l1-adapters', id]);
  }

  
  async downloadRow(row: any) {
    console.log('Adapter ID:', row.id);
    console.log('Version ID:', row.adapterConfigSummaryUIWapper[0].id);
    console.log('Version:', row.adapterConfigSummaryUIWapper[0].version);

    const adapterId = row.id;

    const selectedVersionObj = row.adapterConfigSummaryUIWapper.find(
      item => item.version === row.version
    );

    if (!selectedVersionObj) {
      console.error('Selected version not found!');
      return;
    }

    const version = selectedVersionObj.version;
    const configId = selectedVersionObj.id;

    console.log('FINAL adapterId:', adapterId);
    console.log('FINAL version:', version);

    const payload = { adapterId, version };

    try {
      // Ask user to pick a directory
      const dirHandle = await (window as any).showDirectoryPicker();

      // Create/get "beans" folder
      const beansDirHandle = await dirHandle.getDirectoryHandle('beans', { create: true });

      // Call service to download adapter files
      this._l1AdapterService.downloadL1Adapter(payload).subscribe(async res => {
        if (res?.status === 'success' && res?.data?.files?.length) {
          for (const file of res.data.files) {
            let content = file.content;

            // Pretty-print JSON if needed
            if (file.contentType === 'application/json') {
              try {
                const parsed = JSON.parse(file.content);
                content = JSON.stringify(parsed, null, 2);
              } catch (e) {
                console.error('Error parsing JSON', e);
              }
            }

            // Decide target folder: beans for channel/workflow files
            const targetDir = file.fileName.startsWith('channel') || file.fileName.startsWith('workflow')
              ? beansDirHandle
              : dirHandle;

            // Save file to the folder
            const fileHandle = await targetDir.getFileHandle(file.fileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
          }
          console.log('All files saved successfully!');
		  alert('All adapter configuration files have been downloaded successfully!');
        }
      });
    } catch (err) {
      console.error('Error downloading adapter config:', err);
    }
  }

  /**
   * Gets row data
   * @param row
   */
  public getViewRowData(row): void {
    let id = row.id;
    row.adapterConfigSummaryUIWapper.forEach(item => {
      if (item.version === row.version) {
        id = item.id;
      }
    });
    this._router.navigate(['adapter-configuration/l1-adapters/', id, 'view']);
  }

  /**
   * Changes row
   * @param event
   * @param row
   */
  public changeRow(event, row) {
    row.status = event.status;
    row.version = event.version;
    row.action = event.action;
  }

  /**
   * Checks edit
   * @param row
   * @returns
   */
  public checkEdit(row) {
    if (row.action && row.action.includes('M')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks delete
   * @param row
   * @returns
   */
  public checkDelete(row) {
    if (row.action && row.action.includes('D')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Trans filters
   * @returns filters
   */
  private _transFilters(): string {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  /**
   * Deletes row
   * @param row
   */
  public deleteRow(row) {
    this.finalId = row.id;
    row.adapterConfigSummaryUIWapper.forEach(item => {
      if (item.version === row.version) {
        this.finalId = item.id;
      }
    });
    this._l1AdapterService
      .deleteRow(this.finalId)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(res => {
        if (res && res.status === 'success') {
          this.alertService.responseMessage(res);
          this.loadPage(this._page);
        }
      });
  }

  /**
   * Copys click
   * @param row
   */
  public copyClick(row) {
    document.body.style.overflow = 'hidden';
    this.visibleCopy = true;
    this.currentItem = row;
    row.adapterConfigSummaryUIWapper.forEach(item => {
      if (item.version === row.version) {
        this.copyObj.configuraionId = item.id;
      }
    });
    this.copyObj.adapterName = null;
    this.copyObj.imfId = null;
    this.isSaveCopy = false;
    setTimeout(() => (this.visibleCopyAnimate = true), 200);
  }

  /**
   * Saves copy
   */
  public saveCopy() {
    if (this.copyObj.adapterName && this.copyObj.imfId) {
      const formData = new FormData();
      this.isSaveCopy = true;
      formData.append('adapterName', this.copyObj.adapterName);
      formData.append('configuraionId', this.copyObj.configuraionId);
      formData.append('imfId', this.copyObj.imfId);
      setTimeout(() => {
        this._l1AdapterService.copyL1Adapter(formData).subscribe(item => {
          if (item && item.status !== 'failure') {
            this.alertService.responseMessage(item);
            this.isSaveCopy = false;
          }
          this.isSaveCopy = false;
          this.visibleCopy = false;
          this.loadPage(this._page);
        });
        this.isSaveCopy = false;
      }, 5000);
    } else {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please Enter Mandatory Fields',
      });
    }
  }

  /**
   * Copys cancel
   */
  public copyCancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleCopyAnimate = false;
    setTimeout(() => (this.visibleCopy = false), 100);
  }

  compareJson(row) {
    this.selectedAdapterName = row.name;
    this.jsonVisible = true;
  }
  closePopup(): void {
    this.jsonVisible = false;
  }

  public ngOnDestroy(): void {
    this.componetDestroyed.unsubscribe();
  }
}
