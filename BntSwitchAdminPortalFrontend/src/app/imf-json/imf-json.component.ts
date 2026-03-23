import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { getIfmList, DeleteImfJsonSuccess } from '../store/selectors/imf-json.selector';
import { GetImfJsonView, DeleteImfJson } from '../store/actions/imf-json.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Utils } from 'src/utils';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { ImfJsonService } from '@app/services/imf-json.service';


@Component({
  selector: 'json-tree',
  styleUrls: ['./imf-json.component.scss'],
  templateUrl: './imf-json.component.html',
})
export class ImfJsonComponent implements OnInit {
  public currentLang: string;
  public columns: any;
  public rows: any;
  public totalRecords: Number;
  confirmModal?: NzModalRef;
  readonly headerHeight = 40;
  readonly rowHeight = 70;
  readonly pageLimit = 15;
  public request: Boolean = true;
  public imfVisible: Boolean = false;
  subscription: Subscription;
  componetDestroyed = new Subject();
  @ViewChild('Action', { static: true }) Action: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  public jsonObj: any;
  public visibleAnimate: any;
  public visible: any;
  public copied = false;
  public rowData: any;
  public objectData: any;
  public keyData: any;
  public deleteVisibleAnimate: any;
  public deleteVisible: any;
  public currentItem = [];
  public selectedImf: any;
  public element: any = {};
  public lastVersion: any;
  public loading = true;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };

  public linkImfId = 'link_imf';
  public type = 'IMF';
  constructor(
    private _clipboardService: ClipboardService,
    private _store: Store<IAppState>,
    private _router: Router,
    private translate: TranslateService,
    private modal: NzModalService,
	private imfJsonService: ImfJsonService 
  ) {}

  /**
   * on init
   */
  ngOnInit() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
          this._store.dispatch(new GetImfJsonView());
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(getIfmList))
      .subscribe((response: any) => {
        if (response) {
          const versionList = [];
          this.rows = Utils.newData(response.data.imfStructureList);
          this.rows.forEach(element => {
            versionList.push(element.version);
          });
          this.lastVersion = Math.max(...versionList);
          this.rows = this.rows.map((item, index) => {
            item.index = index;
            if (item.version === 0) {
              item.edit = true;
              item.delete = true;
            } else if (item.version === this.lastVersion) {
              item.edit = true;
            } else {
              item.edit = false;
              item.delete = false;
            }
            return item;
          });
          if (this.rows.length) {
            this.currentItem = [];
            this.selectedImf = this.rows[0];
            this.currentItem.push(this.selectedImf);
            this.currentItem = [...this.currentItem];
          }
          this.loading = false;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(DeleteImfJsonSuccess))
      .subscribe((response: any) => {
        if (response) {
          this._store.dispatch(new GetImfJsonView());
        }
      });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.linkImfId);
        this.permissionObject = this.permission;
      }
    });
    this.translate.get(['NAME', 'VERSION', 'IMF']).subscribe(translation => {
      this.columns = [
        { prop: 'name', name: translation.NAME, width: -20, sortable: false },
        {
          prop: 'version',
          name: translation.VERSION,
          cellTemplate: this.version,
          width: -150,
          sortable: false,
        },
        {
          prop: 'Action',
          name: translation.IMF,
          cellTemplate: this.Action,
          sortable: false,
        },
      ];
    });
  }

  /**
   * Copys to clipboard
   * @param item
   */
  copyToClipboard(item: string) {
    this.copied = true;
    this._clipboardService.copyFromContent(JSON.stringify(item));
    setTimeout(() => {
      this.copied = false;
    }, 1000);
  }

  /**
   * Gets imf data
   * @param event
   */
  public getImfData(event) {
    this.currentItem = [];
    this.currentItem.push(event);
  }

  /**
   * Views click
   * @param keyData
   */
  viewClick(keyData) {
    this.element = keyData;
    this.jsonObj = JSON.parse(keyData.imf);
    this.open();
  }

  /**
   * Views edit click
   * @param row
   */
  viewEditClick(row) {
    this._router.navigate(['/adapter-configuration/imf/edit', row.id]);
  }

  /**
   * Deletes imf json component
   */
  delete() {
    this._store.dispatch(new DeleteImfJson(this.keyData));
    this.closeDelete();
  }

  /**
   * Deletes row
   * @param row
   */
  public deleteRow(row) {
    this.confirmModal = this.modal.confirm({
      nzTitle: Utils.deleteWarning(row.name),
      nzOnOk: () => {
        this._store.dispatch(new DeleteImfJson(row.id));
        this._store
          .pipe(takeUntil(this.componetDestroyed), select(DeleteImfJsonSuccess))
          .subscribe((response: any) => {
            if (response) {
              this._store.dispatch(new GetImfJsonView());
            }
          });
      },
    });
  }

  /**
   * Opens imf json component
   */
  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visible = true), 200);
  }

  /**
   * Closes imf json component
   */
  public close(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  /**
   * Opens delete
   */
  public openDelete(): void {
    document.body.style.overflow = 'hidden';
    this.deleteVisible = true;
    setTimeout(() => (this.deleteVisible = true), 200);
  }

  /**
   * Closes delete
   */
  public closeDelete(): void {
    document.body.style.overflow = 'auto';
    this.deleteVisibleAnimate = false;
    setTimeout(() => (this.deleteVisible = false), 100);
  }

  compareJson() {
    this.imfVisible = true;
  }
  closePopup(): void {
    this.imfVisible = false;
  }
  
  async downloadImf(row: any) {
    const version = row.version;

    if (!version && version !== 0) {
      console.error('IMF version missing');
      return;
    }

    try {
      // Ask user where to save
      const dirHandle = await (window as any).showDirectoryPicker();

      this.imfJsonService.downloadImfByVersion(version).subscribe(async res => {
        if (res?.status === 'success' && res?.data?.files?.length) {
          const file = res.data.files[0];

          let content = file.content;

          // Pretty JSON
          try {
            content = JSON.stringify(JSON.parse(content), null, 2);
          } catch {}

          const fileHandle = await dirHandle.getFileHandle('imf.json', {
            create: true,
          });

          const writable = await fileHandle.createWritable();
          await writable.write(content);
          await writable.close();

          alert('IMF downloaded successfully!');
        }
      });
    } catch (err) {
      console.error('IMF download failed', err);
    }
  }
}
