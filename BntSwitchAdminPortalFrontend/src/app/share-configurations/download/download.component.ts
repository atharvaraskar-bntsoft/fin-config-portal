import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from '@app/store/state/app.state';
import { GetMenu } from '@app/store/actions/l1-adapter.action';
import { selectL1AdapterMenu } from '@app/store/selectors/l1-adapter.selectors';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { selectL3AdapterList } 
from '@app/store/selectors/l3-adapter.selectors';
import { L3AdapterService } from '@app/services/l3-adapter.service';
import { GetL3AdapterList } from '@app/store/actions/l3-adapter.action';
import { DeploymentWorkflowService } from '@app/services/deployment-workflow-mapper.service';
import { GetDeploymentWorkflow } from '@app/store/actions/deployment-workflow-mapper.action';
import { selectGetDeploymentWorkflow } from '@app/store/selectors/deployment-workflow-mapper.selector';
import { ImfJsonService } from '@app/services/imf-json.service';
import { GetCoreProperties } from '@app/store/actions/core-properties.action';
import { selectCorePropertiesListGet } from '@app/store/selectors/core-properties.selector';
import { CorePropertiesService } from '@app/services/core-properties.service';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, OnDestroy {

  public adaptorMenu: any[] = [];
  public columns: any[] = [];
  public l3Columns: any[] = [];

  public loading = true;
  private componetDestroyed = new Subject();
  private _page = 1;
  public l3AdaptorMenu: any[] = [];
  public l2Rows: any[] = [];
  public l2Columns: any[] = [];
  public l2ImfColumns: any[] = [];
  public l2ImfRows: any[] = [];
  public coreProperties: any[] = [];
  public coreColumns: any[] = [];
  public isLoading = false;
  public loaderText: string = 'Downloading files...';



 



  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('l3Action', { static: true }) l3Actions: TemplateRef<any>;
  @ViewChild('l2Action', { static: true }) l2Action: TemplateRef<any>;
  @ViewChild('l2Name', { static: true }) l2Name: TemplateRef<any>;
  @ViewChild('l2ImfAction', { static: true }) l2ImfAction: TemplateRef<any>;
  @ViewChild('l2ImfVersion', { static: true }) l2ImfVersion: TemplateRef<any>;
  @ViewChild('l2ImfName', { static: true }) l2ImfName: TemplateRef<any>;
  @ViewChild('coreVersionTemplate', { static: true }) coreVersionTemplate: TemplateRef<any>;
  @ViewChild('coreActionTemplate', { static: true }) coreActionTemplate: TemplateRef<any>;
  @ViewChild('naVersionTemplate', { static: true })naVersionTemplate: TemplateRef<any>;






  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
	private _l1AdapterService: L1AdapterService,
	private _l3AdapterService: L3AdapterService,
	private _deploymentWorkflowService: DeploymentWorkflowService,
	private _imfJsonService: ImfJsonService,
	private _corePropertiesService: CorePropertiesService 

  ) {}

  ngOnInit(): void {
	
    // Define table columns
    this.translate.get(['NAME', 'TEMPLATE', 'VERSION', 'STATUS', 'ACTION']).subscribe(trans => {
      this.columns = [
        { prop: 'name', name: trans.NAME },
        { prop: 'template', name: trans.TEMPLATE },
        { prop: 'version', name: trans.VERSION, cellTemplate: this.version },
        { prop: 'action', name: trans.ACTION, cellTemplate: this.actions },
      ];
	  this.l3Columns = [
	      { prop: 'name', name: trans.NAME },
	      { prop: 'template', name: trans.TEMPLATE },
	      { prop: 'version', name: trans.VERSION, cellTemplate: this.version },
	      { prop: 'action', name: trans.ACTION, cellTemplate: this.l3Actions },
	    ];
		this.l2Columns = [
		  { name: trans.NAME, cellTemplate: this.l2Name },   
		  { name: trans.TEMPLATE, cellTemplate: this.naVersionTemplate }, 
		  { name: trans.VERSION, cellTemplate: this.naVersionTemplate },  
		  { name: trans.ACTION, cellTemplate: this.l2Action },
		];
		
		this.l2ImfColumns = [
		  { prop: 'name', name: trans.NAME,cellTemplate: this.l2ImfName },
		  { prop: 'template', name: trans.TEMPLATE , cellTemplate: this.naVersionTemplate },
		  { prop: 'version', name: trans.VERSION, cellTemplate: this.l2ImfVersion },
		  { prop: 'action', name: trans.ACTION, cellTemplate: this.l2ImfAction},
		];
		
		this.translate.get(['NAME', 'TYPE', 'VERSION', 'ACTION']).subscribe(trans => {
		  this.coreColumns = [
		    { prop: 'name', name: trans.NAME },
		    { prop: 'type', name: trans.TYPE },
		    { prop: 'version', name: trans.VERSION, cellTemplate: this.coreVersionTemplate },
		    { prop: 'action', name: trans.ACTION, cellTemplate: this.coreActionTemplate },
		  ];
		});


	
	


	
    });

    // Subscribe to store
    this._store.pipe(
      takeUntil(this.componetDestroyed),
      select(selectL1AdapterMenu)
    ).subscribe(response => {
      if (response && response.adaptorlist) {
        // Sort adapterConfigSummaryUIWapper descending by version
        this.adaptorMenu = response.adaptorlist.map(item => {
          const sortedSummary = item.adapterConfigSummaryUIWapper?.sort((a, b) => b.version - a.version) || [];
          return {
            ...item,
            selectedVersion: sortedSummary[0] || { version: null, status: 'N/A', action: 'N/A' }, // default highest version
            adapterConfigSummaryUIWapper: sortedSummary
          };
        });
        this.loading = false;
      }
    });

  
	// Subscribe to L3 store
	this._store.pipe(
	  takeUntil(this.componetDestroyed),
	  select(selectL3AdapterList)
	).subscribe(response => {

	  if (response && response.data && response.data.adaptorlist) {

	    this.l3AdaptorMenu = response.data.adaptorlist.map(item => {

	      const sortedSummary =
	        item.adapterConfigSummaryUIWapper?.sort((a, b) => b.version - a.version) || [];

	      return {
	        ...item,
	        selectedVersion: sortedSummary[0] || { version: null, status: 'N/A' },
	        adapterConfigSummaryUIWapper: sortedSummary
	      };
	    });

	    this.loading = false;
	  }
	});
	
	
	this._store.pipe(
	  takeUntil(this.componetDestroyed),
	  select(selectGetDeploymentWorkflow)
	).subscribe((response: any) => {

	  if (response && response.data && response.data.diploymentWorkkflowlist) {

	    this.l2Rows = response.data.diploymentWorkkflowlist;
	    this.loading = false;
	  }
	});
	
	this._imfJsonService.getImfList().subscribe((res: any) => {
	  if (res?.data?.imfStructureList) {

	    const imfList = res.data.imfStructureList;

	    // sort full objects
	    const sorted = imfList.sort((a, b) => b.version - a.version);

	    const grouped = {
	      versions: sorted,            // ✅ store full objects
	      selectedVersion: sorted[0]   // ✅ default highest object
	    };

	    this.l2ImfRows = [grouped];
	  }
	});
	
	
	// Dispatch L2 core properties action
	this._store.dispatch(new GetCoreProperties({ filter: '', page: this._page, 'page-size': 20 }));


	 this._store.pipe(
	   takeUntil(this.componetDestroyed),
	   select(selectCorePropertiesListGet)
	 ).subscribe((res: any) => {
	   if (res?.data?.corePropertiesList) {
	     this.coreProperties = res.data.corePropertiesList.map(item => {
	       const sortedVersions = item.corePropertiesDetails?.sort((a, b) => b.version - a.version) || [];
	       return {
	         ...item,
	         selectedVersion: sortedVersions[0] || { version: null },
	         corePropertiesDetails: sortedVersions
	       };
	     });
	     this.loading = false;
	   }
	 });





	
	this.loadPage(this._page);
	


  }

  private loadPage(page: number) {
	this.loading = true;

	 // L1
	 this._store.dispatch(
	   new GetMenu({ filter: '', page, 'page-size': 20 })
	 );

	 // L3
	 this._store.dispatch(
	   new GetL3AdapterList({ filter: '', page, 'page-size': 20 })
	 );
	 
	 //l2 core propeties
	 this._store.dispatch(
	     new GetDeploymentWorkflow({
	       filter: '',
	       page,
	       'page-size': 20,
	     })
	   );
  }

  /**
   * Handles version selection change from dropdown
   */
  public onVersionChange(selected: any, row: any) {
    row.selectedVersion = selected;
    console.log('Selected version for row:', row.name, selected.version);
  }

  /**
   * Placeholder for download action
   */
  /**
   * Downloads adapter files for the selected row and version.
   */
  
  async downloadRow(row: any) {
    this.isLoading = true;

    const adapterId = row.id;

    const selectedVersionObj = row.adapterConfigSummaryUIWapper.find(
      item => item.version === row.selectedVersion.version
    );

    if (!selectedVersionObj) {
      console.error('Selected version not found!');
      this.isLoading = false;
      return;
    }

    const version = selectedVersionObj.version;
    const payload = { adapterId, version };

    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      const beansDirHandle = await dirHandle.getDirectoryHandle('beans', { create: true });

      this._l1AdapterService.downloadL1Adapter(payload).subscribe({
        next: async (res) => {
          try {
            if (res?.status === 'success' && res?.data?.files?.length) {
              for (const file of res.data.files) {
                let content = file.content;

                if (file.contentType === 'application/json') {
                  try {
                    content = JSON.stringify(JSON.parse(file.content), null, 2);
                  } catch (e) {
                    console.error('JSON parse error', e);
                  }
                }

                const targetDir =
                  file.fileName.startsWith('channel') || file.fileName.startsWith('workflow')
                    ? beansDirHandle
                    : dirHandle;

                const fileHandle = await targetDir.getFileHandle(file.fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(content);
                await writable.close();
              }

              //alert('All adapter configuration files have been downloaded successfully!');
			  Swal.fire({
			  		 			   title: 'Success',
			  		 			   text: 'All L1 adapter configuration files have been downloaded successfully!',
			  		 			   icon: 'success',
			  		 			   width: '700px',   // bigger modal
			  		 			   customClass: {
			  		 			     popup: 'big-swal'
			  		 			   }
			  		 			 });
            } else {
              alert('No files available to download');
            }
          } catch (err) {
            console.error('Error saving files', err);
            alert('Error saving files!');
          } finally {
            // ✅ Stop loader only after all files written
            this.isLoading = false;
          }
        },

        error: (err) => {
          console.error('Download failed:', err);
          alert('Download failed!');
          this.isLoading = false;
        }

        // ❌ Remove complete block
      });
    } catch (err) {
      console.error('Error downloading adapter config:', err);
      this.isLoading = false;
    }
  }

  
  
  
  
  async downloadL3Row(row: any) {
    this.isLoading = true;

    const adapterId = row.id;

    const selectedVersionObj = row.adapterConfigSummaryUIWapper.find(
      item => item.version === row.selectedVersion.version
    );

    if (!selectedVersionObj) {
      console.error('Selected version not found!');
      this.isLoading = false;
      return;
    }

    const version = selectedVersionObj.version;
    const payload = { adapterId, version };

    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      const beansDirHandle = await dirHandle.getDirectoryHandle('beans', { create: true });

      this._l3AdapterService.downloadL3Adapter(payload).subscribe({
        next: async (res) => {
          try {
            if (res?.status === 'success' && res?.data?.files?.length) {
              for (const file of res.data.files) {
                let content = file.content;

                if (file.contentType === 'application/json') {
                  try {
                    content = JSON.stringify(JSON.parse(file.content), null, 2);
                  } catch (e) {
                    console.error('JSON parse error', e);
                  }
                }

                const targetDir =
                  file.fileName.startsWith('channel') || file.fileName.startsWith('workflow')
                    ? beansDirHandle
                    : dirHandle;

                const fileHandle = await targetDir.getFileHandle(file.fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(content);
                await writable.close();
              }

             // alert('L3 adapter configuration files downloaded successfully!');
			 Swal.fire({
			 		 			   title: 'Success',
			 		 			   text: 'L3 adapter configuration files downloaded successfully!',
			 		 			   icon: 'success',
			 		 			   width: '700px',   // bigger modal
			 		 			   customClass: {
			 		 			     popup: 'big-swal'
			 		 			   }
			 		 			 });
            } else {
              alert('No files available to download');
            }
          } catch (err) {
            console.error('Error saving files', err);
            alert('Error saving files!');
          } finally {
            // ✅ Stop loader only after all files written
            this.isLoading = false;
          }
        },

        error: (err) => {
          console.error('Download failed:', err);
          alert('Download failed!');
          this.isLoading = false;
        }

        // ❌ Remove complete block
      });
    } catch (err) {
      console.error('Error downloading L3 adapter config:', err);
      this.isLoading = false;
    }
  }
  
  public async downloadL2Workflow(row: any) {
    this.isLoading = true;

    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      const beansDirHandle = await dirHandle.getDirectoryHandle('beans', { create: true });

      this._deploymentWorkflowService.downloadL2Workflow(row.deploymentId).subscribe({
        next: async (res: any) => {
          try {
            if (res?.data?.files?.length) {
              for (const file of res.data.files) {
                let content = file.content;

                if (file.contentType === 'application/json') {
                  try {
                    content = JSON.stringify(JSON.parse(file.content), null, 2);
                  } catch (e) {
                    console.error('JSON parse error', e);
                  }
                }

                const targetDir =
                  file.fileName.startsWith('channel') || file.fileName.startsWith('orchestration')
                    ? beansDirHandle
                    : dirHandle;

                const fileHandle = await targetDir.getFileHandle(file.fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(content);
                await writable.close();
              }

             // alert('L2 workflow files downloaded successfully!');
			 Swal.fire({
			   title: 'Success',
			   text: 'L2 workflow files downloaded successfully!',
			   icon: 'success',
			   width: '700px',   // bigger modal
			   customClass: {
			     popup: 'big-swal'
			   }
			 });
            } else {
              alert('No files available to download');
            }
          } catch (err) {
            console.error('Error saving files', err);
            alert('Error saving files!');
          } finally {
            // ✅ Stop loader after processing
            this.isLoading = false;
          }
        },

        error: (err) => {
          console.error('Download failed:', err);
          alert('Download failed!');
          this.isLoading = false;
        }

        // ❌ Removed complete block
      });
    } catch (err) {
      console.error('Error downloading L2 workflow:', err);
      this.isLoading = false;
    }
  }
  
  public async downloadL2Imf(row: any) {
    this.isLoading = true;

    try {
      const versionObj = row.selectedVersion;

      if (!versionObj || !versionObj.version) {
        console.error('IMF version missing');
        this.isLoading = false;
        return;
      }

      const version = versionObj.version;
      const dirHandle = await (window as any).showDirectoryPicker();

      this._imfJsonService.downloadImfByVersion(version).subscribe({
        next: async (res: any) => {
          try {
            if (res?.data?.files?.length) {
              const file = res.data.files[0];
              let content = file.content;

              try {
                content = JSON.stringify(JSON.parse(content), null, 2);
              } catch (e) {
                console.error('JSON parse error', e);
              }

              const fileHandle = await dirHandle.getFileHandle('imf.json', { create: true });
              const writable = await fileHandle.createWritable();
              await writable.write(content);
              await writable.close();

             // alert('L2 IMF downloaded successfully!');
			 Swal.fire({
			 			   title: 'Success',
			 			   text: 'L2 IMF downloaded successfully!',
			 			   icon: 'success',
			 			   width: '700px',   // bigger modal
			 			   customClass: {
			 			     popup: 'big-swal'
			 			   }
			 			 });
            } else {
              alert('No IMF file available');
            }
          } catch (err) {
            console.error('Error saving IMF file', err);
            alert('Error saving IMF file!');
          } finally {
            this.isLoading = false;
          }
        },

        error: (err) => {
          console.error('Download failed:', err);
          alert('Download failed!');
          this.isLoading = false;
        }
      });
    } catch (err) {
      console.error('Error downloading L2 IMF:', err);
      this.isLoading = false;
    }
  }
  
  public async downloadCoreProperties(row: any) {
    this.isLoading = true;

    try {
      const versionObj = row.selectedVersion;

      if (!versionObj || !versionObj.id) {
        console.error('Core Properties versionId missing');
        this.isLoading = false;
        return;
      }

      const versionId = versionObj.id;
      const dirHandle = await (window as any).showDirectoryPicker();

      this._corePropertiesService.downloadCoreProperties(versionId).subscribe({
        next: async (res: any) => {
          try {
            if (res?.status === 'success' && res?.data?.files?.length) {
              const file = res.data.files[0];
              let content = file.content;

              try {
                content = JSON.stringify(JSON.parse(content), null, 2);
              } catch (e) {
                console.error('JSON parse error', e);
              }

              const fileHandle = await dirHandle.getFileHandle(
                file.fileName || 'core-properties.json',
                { create: true }
              );

              const writable = await fileHandle.createWritable();
              await writable.write(content);
              await writable.close();

              //alert('Core Properties downloaded successfully!');
			  Swal.fire({
			  		 			   title: 'Success',
			  		 			   text: 'Core Properties downloaded successfully!',
			  		 			   icon: 'success',
			  		 			   width: '700px',   // bigger modal
			  		 			   customClass: {
			  		 			     popup: 'big-swal'
			  		 			   }
			  		 			 });
            } else {
              alert('No file available to download');
            }
          } catch (err) {
            console.error('Error saving Core Properties file', err);
            alert('Error saving Core Properties file!');
          } finally {
            this.isLoading = false;
          }
        },

        error: (err) => {
          console.error('Download failed:', err);
          alert('Download failed!');
          this.isLoading = false;
        }
      });

    } catch (err) {
      console.error('Error downloading Core Properties:', err);
      this.isLoading = false;
    }
  }
  public onCoreVersionChange(selected: any, row: any) {
    row.selectedVersion = selected;
  }





  ngOnDestroy() {
    this.componetDestroyed.next(null);
    this.componetDestroyed.complete();
  }
}
