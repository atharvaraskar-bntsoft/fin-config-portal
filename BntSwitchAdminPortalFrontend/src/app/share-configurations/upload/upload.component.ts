import { Component, OnInit } from '@angular/core';
import { ImfJsonService } from '@app/services/imf-json.service';
import { ViewChild, ElementRef } from '@angular/core';
import { CorePropertiesService } from '@app/services/core-properties.service';
import { L1AdapterService } from '@app/services/l1-adapter.service'; 
import { L3AdapterService } from '@app/services/l3-adapter.service';

import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetMenu } from '@app/store/actions/l1-adapter.action';
import { selectL1AdapterMenu } from '@app/store/selectors/l1-adapter.selectors';
import { IAppState } from '@app/store/state/app.state';
import { Utils } from 'src/utils';
import { GetL3AdapterList } from '@app/store/actions/l3-adapter.action';
import { selectL3AdapterList } from '@app/store/selectors/l3-adapter.selectors';
import { DeploymentWorkflowService } from '@app/services/deployment-workflow-mapper.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
	
	public isLoading = false;
	public loaderText: string = 'Uploading files...';
	
	imfList: any[] = [];
	selectedL1ImfId: number | null = null;
	selectedL3ImfId: number | null = null;
	
	// ===== IMF =====
	  imfVersion: number | null = null;
	  selectedFile: File | null = null;
	 
	  // ===== CORE PROPERTIES =====
	   corePropertiesList: any[] = [];
	   selectedCorePropertyId: number | null = null;
	   coreSelectedFile: File | null = null;
	   coreVersion: number | null = null;
	   
	   // ===== L1 ADAPTER =====
	   adapterList: any[] = [];
	   selectedAdapterId: number | null = null;
	   adapterVersion: number | null = null;

	   componentDestroyed = new Subject<void>();
	   adapterFiles: any = {
	     properties: null,
	     responseCode: null,
	     packager: null,
	     requestMapping: null,
	     imf: null
	   };
	   
	   // ===== L3 ADAPTER =====
	   l3List: any[] = [];
	   selectedL3Id: number | null = null;
	   l3Version: number | null = null;

	   l3Files: any = {
	     properties: null,
	     responseCode: null,
	     packager: null,
	     requestMapping: null,
	     imf: null,
		 networkHandler: null
	   };
	   
	   workflowFile: File | null = null;
	   workflowCorePropertyDetailId: number | null = null;
	   workflowCorePropertyDetailsList: any[] = [];
	   selectedWorkflowCorePropertyDetailId: number | null = null;

	   @ViewChild('adapterFileInput') adapterFileInput!: ElementRef;;
	  
	  
	  @ViewChild('fileInput') fileInput!: ElementRef;
	  @ViewChild('coreFileInput') coreFileInput!: ElementRef;

	  constructor(
		private _imfJsonService: ImfJsonService,
		private _corePropertiesService: CorePropertiesService,
		private _store: Store<IAppState>,
		private _l1AdapterService: L1AdapterService,
		private _l3AdapterService: L3AdapterService ,
		private _deploymentWorkflowService: DeploymentWorkflowService,
	  ) {}
	  
	  ngOnInit(): void {
		this.loadCoreProperties();
		this.loadAdapters();
		this.loadL3Adapters();
		this.loadWorkflowCoreProperties();
		this.loadImfList(); 
	  }
	  
	  loadImfList() {
	    this._imfJsonService.getImfList().subscribe((res: any) => {
	      if (res?.data?.imfStructureList) {

	        const list = res.data.imfStructureList;

	        this.imfList = list
	          .sort((a, b) => b.version - a.version)
	          .map((item: any) => ({
	            id: item.id || item.imfId,   // ✅ FIX HERE
	            version: item.version
	          }));

	        console.log('IMF LIST:', this.imfList);
	      }
	    });
	  }
	  
	  loadCoreProperties() {
	    this._corePropertiesService
	      .getCorePropetiesList({ payload: { page: 1, 'page-size': 20 } })
	      .subscribe((res: any) => {

	        const list = res?.data?.corePropertiesList || [];

	        // Map core properties for dropdown
	        this.corePropertiesList = list.map((item: any) => {
	          return {
	            name: item.name,
	            id: item.corePropertyId  // ✅ Use the corePropertyId from API
	          };
	        });

	        console.log('FINAL LIST:', this.corePropertiesList);
	      });
	  }
	  
	  loadWorkflowCoreProperties() {
	    this._corePropertiesService
	      .getCorePropetiesList({ payload: { page: 1, 'page-size': 20 } })
	      .subscribe((res: any) => {

	        const list = res?.data?.corePropertiesList || [];

	        this.workflowCorePropertyDetailsList = list.map((item: any) => {
	          return {
	            name: item.name,
	            id: item.corePropertyId
	          };
	        });

	        console.log('Workflow List:', this.workflowCorePropertyDetailsList);
	      });
	  }
	  
	  
	  
	  
	  
	
	  loadAdapters() {
	    this._store.dispatch(new GetMenu({ page: 1, 'page-size': 100 }));

	    this._store
	      .pipe(takeUntil(this.componentDestroyed), select(selectL1AdapterMenu))
	      .subscribe((response: any) => {
	        if (response?.adaptorlist) {
	          const list = Utils.newData(response.adaptorlist);
	          this.adapterList = list.map((item: any) => ({
	            id: item.id,
	            name: item.name,
	          }));
	        }
	      });
	  }
	  
	  loadL3Adapters() {

	    this._store.dispatch(
	      new GetL3AdapterList({
	        page: 1,
	        'page-size': 100
	      })
	    );

	    this._store
	      .pipe(takeUntil(this.componentDestroyed), select(selectL3AdapterList))
	      .subscribe((response: any) => {

	        if (response?.data?.adaptorlist) {

	          const list = Utils.newData(response.data.adaptorlist);

	          this.l3List = list.map((item: any) => ({
	            id: item.id,
	            name: item.name
	          }));

	        }

	      });

	  }
	
	
	  onFileSelected(event: any) {
	    if (event.target.files.length > 0) {
	      this.selectedFile = event.target.files[0];
	    }
	  }

	  uploadImf() {
	    if (!this.selectedFile) {
	      alert('Please select file');
	      return;
	    }
		this.isLoading = true;
	    const reader = new FileReader();

	    reader.onload = () => {
	      const jsonContent = reader.result as string;

	      const payload: any = {
	        imf: jsonContent
	      };

	  
		  if (this.imfVersion !== null && this.imfVersion !== undefined) {
		    payload.version = this.imfVersion;
		  }

	      this._imfJsonService.uploadImf(payload).subscribe({
	        next: (response: any) => {
	          console.log('Upload Response:', response);

	          // Check backend statusCode instead of HTTP error
	          if (response.data?.statusCode === 309) {
	            const confirmUpdate = confirm(
	              '⚠ IMF version already exists. Do you want to overwrite it?'
	            );

	            if (confirmUpdate) {
				const versionToUse = this.imfVersion ?? response.data.version;

	              const overwritePayload: any = {
	                imf: jsonContent,
	                version: versionToUse,
	                overwrite: true
	              };

	              this._imfJsonService.uploadImf(overwritePayload).subscribe({
	                next: res => {
						this.isLoading = false;	
	                 // alert(res.data?.message || 'IMF updated successfully');
					 this.showSuccess(response.data?.message || 'IMF updated successfully');
                      
	                  // Reset UI
					  this.loadImfList();
					  this.imfVersion = null;
	                  this.selectedFile = null;
	                  this.fileInput.nativeElement.value = '';
	                },
	                error: e => {
						this.isLoading = false;	
	                  alert(e.error?.message || 'Failed to overwrite IMF');
	                }
	              });
	            }
				else {
				    // ✅ ADD THIS LINE RIGHT HERE
				    this.isLoading = false;
				  }
	          } else {
	            // Normal success
				this.isLoading = false;
	           // alert(response.data?.message || 'IMF uploaded successfully');
			   this.showSuccess(response.data?.message || 'IMF uploaded successfully');

	            // Reset UI
				this.loadImfList();
				this.imfVersion = null;
	            this.selectedFile = null;
	            this.fileInput.nativeElement.value = '';
	          }
	        },
	        error: (error) => {
			this.isLoading = false;	
	          console.error('Upload Failed:', error);

	          // Handle bad request (400)
	          if (error.status === 400) {
	            alert(error.error?.message || 'Invalid request');
	          } else {
	            alert('Upload Failed. Please try again.');
	          }
	        }
	      });
	    };

	    reader.readAsText(this.selectedFile);
	  }
	  
	  
	  // ================= CORE PROPERTIES SECTION =================
	   onCoreFileSelected(event: any) {
	     if (event.target.files.length > 0) {
	       this.coreSelectedFile = event.target.files[0];
	     }
	   }

	   uploadCoreProperties() {
	      
		if (!this.coreSelectedFile || !this.selectedCorePropertyId) {
		  alert('Please select Core Instance and file');
		  return;
		}
		this.isLoading = true;
	     const reader = new FileReader();

	     reader.onload = () => {
	       const jsonContent = reader.result as string;

	       const payload: any = {
	         corePropertyId: this.selectedCorePropertyId,
			 properties: jsonContent
	       };

	       if (this.coreVersion !== null && this.coreVersion !== undefined) {
	         payload.version = this.coreVersion;
	       }

	       this._corePropertiesService.uploadCorePropertiesFile(payload)
	         .subscribe({
	           next: (response: any) => {

	             console.log('Core Upload Response:', response);

	             // ✅ CHECK VERSION CONFLICT (LIKE IMF)
	             if (response.data?.statusCode === 309) {

	               const confirmUpdate = confirm(
	                 '⚠ Core Properties version already exists. Do you want to overwrite it?'
	               );

	               if (confirmUpdate) {

	                 const versionToUse =
	                   this.coreVersion ?? response.data.version;

	                 const overwritePayload: any = {
	                   corePropertyId: this.selectedCorePropertyId,
					   properties: jsonContent,
	                   version: versionToUse,
	                   overwrite: true
	                 };

	                 this._corePropertiesService
	                   .uploadCorePropertiesFile(overwritePayload)
	                   .subscribe({
	                     next: (res: any) => {
							this.isLoading = false;	
	                      // alert(res.data?.message || 'Core Properties updated successfully');
						  this.showSuccess(res.data?.message || 'Core Properties updated successfully');
	                       this.resetCore();
	                     },
	                     error: (err) => {
							this.isLoading = false;	
	                       alert(err.error?.message || 'Failed to overwrite Core Properties');
	                     }
	                   });
	               }
				   else {
				                 this.isLoading = false; 
				               }

	             } else {
					this.isLoading = false;
	              // alert(response.data?.message || 'Core Properties uploaded successfully');
				   this.showSuccess(response.data?.message || 'Core Properties uploaded successfully');
	               this.resetCore();
	             }

	           },
	           error: (error) => {
				this.isLoading = false;
	             console.error('Core Upload Failed:', error);

	             if (error.status === 400) {
	               alert(error.error?.message || 'Invalid request');
	             } else {
	               alert('Core Properties Upload Failed. Please try again.');
	             }
	           }
	         });
	     };

	     reader.readAsText(this.coreSelectedFile);
	   }

	   resetCore() {
	     this.coreVersion = null;
	     this.coreSelectedFile = null;
	     this.selectedCorePropertyId = null;
	     this.coreFileInput.nativeElement.value = '';
	   }
	   
	
	   
	   onAdapterFileChange(event: any, type: string) {
	     const file = event.target.files[0];
	     if (!file) return;

	     const allowedFileNames: any = {
	       properties: "adapter_conf.properties",
	       responseCode: "response-code.properties",
	       packager: "packager.json",
	       requestMapping: "adapter_transactions_mapping.json",
	       imf: "imf.json",
	     };

	     // Check file name
	     if (file.name !== allowedFileNames[type]) {
	       alert(`Please select the correct file: ${allowedFileNames[type]}`);
	       event.target.value = ''; // clear the input
	       this.adapterFiles[type] = null;
	       return;
	     }

	     // File is valid
	     this.adapterFiles[type] = file;

	     // Display selected file name in a span after the input
	     const fileNameSpan = event.target.parentElement.querySelector('.file-name-display');
	     if (fileNameSpan) {
	       fileNameSpan.innerText = file.name;
	     }
	   }
	   

	   
	   
	   
	   
	   
	   
	   uploadL1AdapterFiles() {

	     if (!this.selectedAdapterId) {
	       alert('Please select Adapter Instance');
	       return;
	     }

	     if (!this.adapterFiles.properties ||
	         !this.adapterFiles.responseCode ||
	         !this.adapterFiles.packager ||
	         !this.adapterFiles.requestMapping ||
	         this.selectedL1ImfId === null) {

	       alert('Please upload all 5 files');
	       return;
	     }

	     this.isLoading = true;

	     const payload: any = {
	       adapterId: this.selectedAdapterId
	     };

	     if (this.adapterVersion !== null && this.adapterVersion !== undefined) {
	       payload.version = this.adapterVersion;
	     }

	     const readFile = (file: File) =>
	       new Promise<string>((resolve, reject) => {
	         const reader = new FileReader();
	         reader.onload = () => resolve(reader.result as string);
	         reader.onerror = () => reject('File read failed'); // ✅ important
	         reader.readAsText(file);
	       });

	     Promise.all([
	       readFile(this.adapterFiles.properties),
	       readFile(this.adapterFiles.responseCode),
	       readFile(this.adapterFiles.packager),
	       readFile(this.adapterFiles.requestMapping),
	     ])
	     .then((results: string[]) => {

	       payload.properties = results[0];
	       payload.responseCode = results[1];
	       payload.packager = results[2];
	       payload.requestMapping = results[3];
	       payload.imfId = this.selectedL1ImfId;

	       console.log("🚀 FINAL L1 PAYLOAD:", payload);

	       this._l1AdapterService.uploadL1AdapterFiles(payload).subscribe({

	         next: (response: any) => {

	           if (response.data?.statusCode === 309) {

	             const confirmUpdate = confirm(
	               '⚠ Adapter version already exists. Do you want to overwrite it?'
	             );

	             if (confirmUpdate) {

	               const versionToUse = this.adapterVersion ?? response.data.version;

	               const overwritePayload: any = {
	                 adapterId: this.selectedAdapterId,
	                 properties: payload.properties,
	                 responseCode: payload.responseCode,
	                 packager: payload.packager,
	                 requestMapping: payload.requestMapping,
	                 imfId: this.selectedL1ImfId,
	                 version: versionToUse,
	                 overwrite: true
	               };

	               this._l1AdapterService.uploadL1AdapterFiles(overwritePayload)
	                 .subscribe({
	                   next: (res: any) => {
	                     this.isLoading = false;
	                    // alert(res.data?.message || 'Adapter files updated successfully');
						this.showSuccess(res.data?.message || 'L1 Adapter files updated successfully');
	                     this.resetAdapterFiles();
	                   },
	                   error: (err) => {
	                     this.isLoading = false;
	                     alert(err.error?.message || 'Failed to overwrite Adapter files');
	                   }
	                 });

	             } else {
	               this.isLoading = false;
	             }

	           } else {
	             this.isLoading = false;
	             //alert(response.data?.message || 'Adapter files uploaded successfully');
				 this.showSuccess(response.data?.message || 'L1 Adapter files uploaded successfully');
	             this.resetAdapterFiles();
	           }

	         },

	         error: (error) => {
	           this.isLoading = false;
	           console.error('Upload Failed:', error);

	           if (error.status === 400) {
	             alert(error.error?.message || 'Invalid request');
	           } else {
	             alert('Upload Failed. Please try again.');
	           }
	         }

	       });

	     })
	     .catch((err) => {   // ✅ CORRECT PLACE
	       this.isLoading = false;
	       console.error('File Read Error:', err);
	       alert('Error reading files. Please try again.');
	     });
	   }
	

	   // Reset after upload
	   resetAdapterFiles() {
	     this.adapterFiles = {
	       properties: null,
	       responseCode: null,
	       packager: null,
	       requestMapping: null,
	       imf: null,
		  
	     };
		 this.selectedL1ImfId = null;
	     this.selectedAdapterId = null;
	     this.adapterVersion = null;

	     // Reset file input values
	     const fileInputs = document.querySelectorAll<HTMLInputElement>(
	       'input[type="file"]'
	     );
	     fileInputs.forEach(input => (input.value = ''));
	   }
	   
	  

	   uploadL3AdapterFiles() {

	     if (!this.selectedL3Id) {
	       alert('Please select L3 Instance');
	       return;
	     }

	     if (
	       !this.l3Files.properties ||
	       !this.l3Files.responseCode ||
	       !this.l3Files.packager ||
	       !this.l3Files.requestMapping ||
	       this.selectedL3ImfId === null ||
	       !this.l3Files.networkHandler
	     ) {
	       alert('Please upload all 6 files');
	       return;
	     }

	     this.isLoading = true;

	     const payload: any = {
	       adapterId: this.selectedL3Id
	     };

	     if (this.l3Version !== null && this.l3Version !== undefined) {
	       payload.version = this.l3Version;
	     }

	     const readFile = (file: File) =>
	       new Promise<string>((resolve, reject) => {
	         const reader = new FileReader();

	         reader.onload = () => resolve(reader.result as string);
	         reader.onerror = (err) => reject(err);   // ✅ IMPORTANT

	         reader.readAsText(file);
	       });

	     Promise.all([
	       readFile(this.l3Files.properties),
	       readFile(this.l3Files.responseCode),
	       readFile(this.l3Files.packager),
	       readFile(this.l3Files.requestMapping),
	       readFile(this.l3Files.networkHandler)
	     ])
	     .then((results: string[]) => {

	       payload.properties = results[0];
	       payload.responseCode = results[1];
	       payload.packager = results[2];
	       payload.requestMapping = results[3];
	       payload.imfId = this.selectedL3ImfId;
	       payload.networkHandler = results[4];

	       this._l3AdapterService.uploadL3Adapter(payload).subscribe({
	         next: (response: any) => {

	           if (response.data?.statusCode === 309) {

	             const confirmUpdate = confirm(
	               '⚠ L3 Adapter version already exists. Do you want to overwrite it?'
	             );

	             if (confirmUpdate) {

	               const versionToUse = this.l3Version ?? response.data.version;

	               const overwritePayload: any = {
	                 adapterId: this.selectedL3Id,
	                 properties: payload.properties,
	                 responseCode: payload.responseCode,
	                 packager: payload.packager,
	                 requestMapping: payload.requestMapping,
	                 imfId: this.selectedL3ImfId,
	                 networkHandler: payload.networkHandler,
	                 version: versionToUse,
	                 overwrite: true
	               };

	               this._l3AdapterService.uploadL3Adapter(overwritePayload).subscribe({
	                 next: (res: any) => {
	                   this.isLoading = false;
	                   //alert(res.data?.message || 'L3 Adapter updated successfully');
					   this.showSuccess(res.data?.message || 'L3 Adapter updated successfully');
	                   this.resetL3Files();
	                 },
	                 error: (err) => {
	                   this.isLoading = false;
	                   alert(err.error?.message || 'Failed to overwrite L3 Adapter files');
	                 }
	               });

	             } else {
	               this.isLoading = false;
	             }

	           } else {
	             this.isLoading = false;
	             //alert(response.data?.message || 'L3 Adapter uploaded successfully');
				 this.showSuccess(response.data?.message || 'L3 Adapter uploaded successfully');
	             this.resetL3Files();
	           }
	         },

	         error: (error) => {
	           this.isLoading = false;
	           console.error('Upload Failed:', error);

	           if (error.status === 400) {
	             alert(error.error?.message || 'Invalid request');
	           } else {
	             alert('Upload Failed. Please try again.');
	           }
	         }
	       });
	     })

	     .catch((err) => {   // ✅ THIS WAS MISSING
	       this.isLoading = false;
	       console.error('File Read Error:', err);
	       alert('Error reading files. Please try again.');
	     });
	   }
	   
	   // Reset L3 files and UI
	   resetL3Files() {
	     this.l3Files = {
	       properties: null,
	       responseCode: null,
	       packager: null,
	       requestMapping: null,
	       imf: null,
		   networkHandler: null ,
		   
	     };
	     this.selectedL3Id = null;
	     this.l3Version = null;
		 this.selectedL3ImfId = null;

	     // Reset file input values
	     const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
	     fileInputs.forEach((input) => (input.value = ''));
	   }
	   
	   onL3FileChange(event: any, type: string) {

	   const file = event.target.files[0];
	   if (!file) return;

	   const allowedFileNames: any = {
	   properties: "cart_conf.properties",
	   responseCode: "response-code.properties",
	   packager: "packager.xml",
	   requestMapping: "cart_transactions_mapping.json",
	   imf: "imf.json",
	   networkHandler: "network_handler.json"
	   };

	   if (file.name !== allowedFileNames[type]) {

	   alert(`Please select correct file: ${allowedFileNames[type]}`);

	   event.target.value = '';
	   this.l3Files[type] = null;
	   return;

	   }

	   this.l3Files[type] = file;

	   }
	   
	   
	   onWorkflowFileSelected(event: any) {
	     if (event.target.files.length > 0) {
	       this.workflowFile = event.target.files[0];
	     }
	   }
	   
	   uploadWorkflow() {

	     if (!this.workflowFile || !this.selectedWorkflowCorePropertyDetailId) {
	       alert('Please select file and Core Property Detail ID');
	       return;
	     }
		 this.isLoading = true;

	     const reader = new FileReader();

	     reader.onload = () => {

	       const payload: any = {
	         workflowJson: reader.result as string,
	         corePropertyDetailId: this.selectedWorkflowCorePropertyDetailId
	       };

	       this._deploymentWorkflowService.uploadWorkflow(payload)
	         .subscribe({
	           next: (response: any) => {
				this.isLoading = false; 
	            // alert(response.data?.message || 'Workflow uploaded successfully');
				this.showSuccess(response.data?.message || 'Workflow uploaded successfully');

	             this.workflowFile = null;
	             this.selectedWorkflowCorePropertyDetailId = null;
	           },
	           error: (error: any) => {
				this.isLoading = false; 
	             console.error(error);
	             alert(error.error?.message || 'Workflow upload failed');
	           }
	         });

	     };

	     reader.readAsText(this.workflowFile);
	   }
	   
	   showSuccess(message: string) {
	     Swal.fire({
	       title: 'Success',
	       text: message,
	       icon: 'success',
	       width: '700px',
	       customClass: {
	         popup: 'big-swal'
	       }
	     });
	   }
	   
	   
	   ngOnDestroy() {
	     this.componentDestroyed.next();
	     this.componentDestroyed.complete();
	   }
}
