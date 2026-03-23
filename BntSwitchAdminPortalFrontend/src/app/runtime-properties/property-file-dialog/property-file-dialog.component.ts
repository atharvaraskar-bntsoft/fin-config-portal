import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { SubscribeService } from '@app/services/subscribe.services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { RuntimePropertiesService } from '@app/services/runtime-Properties.service';
import { AlertService } from '@app/services/alert.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-newFolderDialog',
  templateUrl: './property-file-dialog.component.html',
  styleUrls: ['./property-file-dialog.component.scss'],
})
export class PropertyFileDialogComponent implements OnInit {
  public currentLang: string;
  folderName: string;
  public propertyListForm: UntypedFormArray;
  componetDestroyed = new Subject();
  public path: string;
  public fileName: string;
  public rows: any = [];
  public fileInfo: any = {};
 @Input() fileData: any;
  public infoForm: UntypedFormGroup;
  public totals = 3;
  public formObj: any = {};
  public tableSize = 'small';
  public isSubmit = false;
  public nzPageIndex = 1;
  constructor(
    public formBuilder: UntypedFormBuilder,
    private translate: TranslateService,
    private subscribeService: SubscribeService,
    public _runtimePropertiesService: RuntimePropertiesService,
    public __alertService: AlertService,
    private _store: Store<IAppState>,
  ) {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }

  ngOnInit() {
      this._runtimePropertiesService
      .getItems()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(obj => {
        if(obj){
          this.nzPageIndex = 1;
          this.dataModification(obj);
        }
      });


    if (this.fileData) {
      if (this.fileData.path) {
        this.nzPageIndex = 1;
        let fullpath = null;
        fullpath = this.fileData.path.split('/');
        this.fileInfo['parentPath'] = fullpath.join('/');
        this.fileInfo['parentPath'] = this.fileInfo['parentPath'].substring(
          0,
          this.fileInfo['parentPath'].length - 1,
        );
        let newpath = '/';
        this.fileInfo['parentPath'] = newpath.concat(this.fileInfo['parentPath']);
      } else {
        this.fileInfo['parentPath'] = 'root';
      }

      this.fileInfo['fileName'] = this.fileData.fileName;
      this.fatchPropertyFileDetails(this.fileInfo);
    }
  }

  dataModification(fileData){
    if (fileData) {
        if (fileData.path) {
          this.nzPageIndex = 1;
          let fullpath = null;
          fullpath = fileData.path.split('/');
          this.fileInfo['parentPath'] = fullpath.join('/');
          this.fileInfo['parentPath'] = this.fileInfo['parentPath'].substring(
            0,
            this.fileInfo['parentPath'].length - 1,
          );
          let newpath = '/';
          this.fileInfo['parentPath'] = newpath.concat(this.fileInfo['parentPath']);
        } else {
          this.fileInfo['parentPath'] = 'root';
        }

        this.fileInfo['fileName'] = fileData.fileName;
        this.fatchPropertyFileDetails(this.fileInfo);
        this._runtimePropertiesService.sendItems(null);
      }
  }

  saveProperty() {
    this.rows.forEach(element => {
      if (this.infoForm.controls[element.key].touched) {
        element.value = this.infoForm.value[element.key];
        element.modified = this.infoForm.controls[element.key].touched;
      }
    });
    if (this.infoForm.valid) {
      var finalData = {};
      if (!this.fileData.path) {
        finalData['parentPath'] = 'root';
      } else {
        finalData['parentPath'] = this.fileInfo['parentPath'];
      }
      finalData['fileName'] = this.fileData.fileName;
      this.rows.forEach(element => {
        if(element.value === 'None'){
           element.value = "";
        }
    });
      finalData['propertyList'] = this.rows;
      this.savePropertyFileDetails(finalData);
      // change value "" to None
      this.changeToNone();
    }
  }

  changeToNone(){
    this.rows.forEach(element => {
        if(element.value === ""){
           element.value = 'None';
        }
    });
  }

  fatchPropertyFileDetails(fileInfo) {
    this._runtimePropertiesService.getPropertyFile(fileInfo).pipe(takeUntil(this.componetDestroyed)).subscribe((resultDetails: any) => {
      if (resultDetails) {
        this.rows = resultDetails.data.propertyList;
        // change value "" to None
         this.changeToNone();
        this.rows.forEach(el => {
          const validation = [];
          validation.push(Validators.required);
          this.formObj[el.key] = new UntypedFormControl(el.value, validation);
        });
        this.nzPageIndex = 1;
        this.rows = this.rows.sort(function(a, b){return b.isEditable - a.isEditable});

        this.rows = [...this.rows];
        this.isSubmit = (this.rows.find((item) => item.isEditable) ? true: false);
        this.infoForm = new UntypedFormGroup(this.formObj);
      }
    });
  }




  savePropertyFileDetails(fileInfo) {
    this._runtimePropertiesService.setPropertyFileData(fileInfo).subscribe((resultDetails: any) => {
      if (resultDetails) {
        this.rows = resultDetails.data.propertyList;
        // change value "" to None
         this.changeToNone();
        this.__alertService.responseMessage(resultDetails);
      }
    });
  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
