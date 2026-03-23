import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import {
  selectGetDeploymentWorkflow,
  selectGetByIdDeploymentWorkflow,
} from '@app/store/selectors/deployment-workflow-mapper.selector';
import {
  GetDeploymentWorkflow,
  GetByIdDeploymentWorkflow,
} from '@app/store/actions/deployment-workflow-mapper.action';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DeploymentWorkflowService } from '@app/services/deployment-workflow-mapper.service';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
declare var jQuery: any;

@Component({
  selector: 'app-deployment-workflow-mapper',
  styleUrls: ['./deployment-workflow-mapper.component.scss'],
  templateUrl: './deployment-workflow-mapper.component.html',
})
export class DeploymentWorkflowMapperComponent implements OnInit, OnDestroy {
  public request: Boolean = true;
  public deploymentWorkflowData: any;
  private _page = 1;
  public rows: any = [];
  public totalRecords: Number;
  public loading = true;
  public currentPagination = '20';
  public currentLang: string;
  public visibleAnimate = false;
  public visible = false;
  private _filters: Array<any> = [];
  public keyData: any = {};
  public columns: Array<any> = [];
  readonly headerHeight = 40;
  readonly rowHeight = 45;
  @ViewChild('action', { static: true }) action: TemplateRef<any>;
  @ViewChild('name', { static: true }) name: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  componetDestroyed = new Subject();
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public deploymentL2jsonId = 'link_deployment_l2json';
  constructor(private _store: Store<IAppState>, private translate: TranslateService,  @Inject(DeploymentWorkflowService) private _deploymentWorkflowService: DeploymentWorkflowService) {  }

  ngOnInit() {
    
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetDeploymentWorkflow))
      .subscribe((data: any) => {
        if (data) {
          
          this.request = true;
          this.deploymentWorkflowData = data.data;
          if (this._page === 1) {
            this.rows = this.deploymentWorkflowData.diploymentWorkkflowlist;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(this.deploymentWorkflowData.diploymentWorkkflowlist);
          }
          if (this.deploymentWorkflowData['total-record'] === this.rows.length) {
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
          this.translate.setDefaultLang(this.currentLang);
          this.loadPage(this._page);
        }
      });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.deploymentL2jsonId);
        this.permissionObject = this.permission;
      }
    });
    this.translate.get(['ID', 'NAME', 'WORKFLOW_JSON']).subscribe(translation => {
      this.columns = [
        { prop: 'deploymentId', name: translation.ID },
        { prop: 'name', name: translation.NAME, cellTemplate: this.name, sortable: false },
        {
          prop: '',
          name: translation.WORKFLOW_JSON,
          cellTemplate: this.action,
          sortable: false,
        },
      ];
    });
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

  private _transFilters(): String {
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
      new GetDeploymentWorkflow({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }

  public keyDetails(keyData) {
    this._store.dispatch(new GetByIdDeploymentWorkflow(keyData));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetByIdDeploymentWorkflow))
      .subscribe((response: any) => {
        if (response) {
          this.keyData = response.data;
          this.open();
        }
      });
  }

  public jsonData(value) {
    return JSON.parse(value);
  }
  
  public async downloadL2Workflow(row: any) {
    console.log('Row passed to downloadL2Workflow:', row);

    try {
      // Ask user to pick a directory
      const dirHandle = await (window as any).showDirectoryPicker();

      // Create/get "beans" folder
      const beansDirHandle = await dirHandle.getDirectoryHandle('beans', { create: true });

      this._deploymentWorkflowService
        .downloadL2Workflow(row.deploymentId)
        .subscribe(async (res: any) => {

          if (res?.data?.files?.length) {

            for (const file of res.data.files) {
              let content = file.content;

              // Pretty-print JSON if needed
              if (file.contentType === 'application/json') {
                try {
                  content = JSON.stringify(JSON.parse(file.content), null, 2);
                } catch (e) {
                  console.warn('Invalid JSON, saving raw content.', e);
                }
              }

              // Decide target folder
              const targetDir =
                file.fileName.startsWith('channel') ||
				file.fileName.startsWith('orchestration')
                  ? beansDirHandle
                  : dirHandle;

              try {
                const fileHandle = await targetDir.getFileHandle(file.fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(content);
                await writable.close();
              } catch (fileErr) {
                console.error(`Failed to save file ${file.fileName}:`, fileErr);
              }
            }

            console.log('L2 workflow files saved successfully!');
            alert('L2 workflow files downloaded successfully!');
          } else {
            alert('No workflow files found for this deployment.');
          }
        },
        err => {
          console.error('Service error while downloading L2 workflow:', err);
          alert('Failed to fetch workflow files from server.');
        });

    } catch (err) {
      console.error('Error picking folder or downloading L2 workflow:', err);
      alert('Error downloading workflow. Check console for details.');
    }
  }


  public close(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
