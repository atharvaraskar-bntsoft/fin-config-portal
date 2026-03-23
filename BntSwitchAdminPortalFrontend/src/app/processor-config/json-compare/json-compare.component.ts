
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { JsonCompareService } from '@app/services/json-compare.service';
import { select, Store } from '@ngrx/store';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { NgxObjectDiffService } from "ngx-object-diff";
@Component({
  selector: 'app-json-compare',
  templateUrl: './json-compare.component.html',
  styleUrls: ['./json-compare.component.scss']
})

export class JsonCompareComponent implements OnInit {
  @Input() type: any;
  @Input() selectedAdapterName: any;
  public jsonForm: UntypedFormGroup;
  public currentLang: string;
  typeList = ['L1', 'L3', 'IMF', 'Workflow'];
  subTypeList = null;
  selectedType: any;
  jsonList = {
    "type": null,
    "name": null,
    "subtype": null,
    "v1": [],
    "v2": []
  }
  componetDestroyed = new Subject();
  subscription = new Subscription();
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
  public componentList: any = [];
  object1: any = {};
  object1View: any;
  object2: any = {};
  object2View: any;
  diffView: any;
  ver: any;
  text: string;
  selectedVer1: any;
  ver2: any;
  versions = [];
  version2 = [];
  version1List = [];
  diffReport: any;
  selectedComponentName;
  selectedSubType;
  selectedV2;
  selectedV1;
  createdBy: any;
  public error: boolean = false;
  readOnlyFlag: boolean = false;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _jsonCompareService: JsonCompareService,
    private objectDiff: NgxObjectDiffService,
  ) { }

  public loadComponentList(event) {
    this.versions = [];
    this.version1List = [];
    this.version2 = [];
    this.object1View = null;
    this.object2View = null;
    this.diffView = null;
    this.selectedV2 = null;
    this.selectedV1 = null;
    this.selectedComponentName = null;
    this.selectedSubType = null;
    this.jsonForm.controls['type'].disable();
    if (event === 'IMF' || this.selectedType === 'IMF') {
      this.selectedComponentName = null;
      this.selectedSubType = null;
      this.readOnlyFlag = true;
      this.jsonForm.controls['name'].disable();
      this.jsonForm.controls['subtype'].disable();
      this._jsonCompareService.getComponentTypeList(event).subscribe(response => {
        if (response) {
          this.versions = response.data.nameversionsdata[0].versions;
          this.version1List = JSON.parse(JSON.stringify(this.versions));

        }
      })
    }
    else {
      this.selectedComponentName = this.selectedAdapterName;
      this.jsonForm.controls['name'].enable();
      this.jsonForm.controls['subtype'].enable();
      this._jsonCompareService.getComponentTypeList(event).subscribe(response => {
        if (response) {
          this.componentList = response.data.nameversionsdata;
          this.componentList.forEach(x=> {
           if(x.name === this.selectedComponentName){
            this.getVersionList(x);
           }
          })             
        }
      })
      
    }
  }

  ngOnInit() {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find((item: any) => item.id === this.corePropertiesId);
        this.permissionObject = this.permission;
      }
    });
    this.createFormGroup();
    this.selectedType = this.type;
    this.loadComponentList(this.selectedType);
    // if(this.selectedType === "IMF" && this.selectedType != null){
    //   this.jsonForm.controls['type'].disable();
    //   this.jsonForm.controls['name'].disable();
    //   this.jsonForm.controls['subtype'].disable();
    // }
  }

  getVersionList(event: any) {
    this.subTypeList = [];
    this.selectedSubType = null;
    this.selectedV1 = null;
    this.selectedV2 = null;
    this.object1View = null;
    this.object2View = null;
    this.diffView = null;
    if (event.template && (event.template == 'JSON' || event.template == 'HTTP-URLENCODED')) {
      this.subTypeList = ['request_mapping', 'properties', 'response_code', 'packager'];
    }
    else {
      this.subTypeList = ['request_mapping', 'properties', 'response_code'];
    }
    event.versions.forEach((element, index) => {
      if (element == 0) {
        event.versions.splice(index, 1);
      }
    });
    this.versions = event.versions;
    this.version1List = JSON.parse(JSON.stringify(event.versions));
    return;
  }

  public selectVersion(event: any) {
    this.selectedVer1 = event;
    this.version2 = JSON.parse(JSON.stringify(this.version1List));
    this.version2.forEach((element, index) => {
      if (element == event) {
        this.version2.splice(index, 1);
        return;
      }
    });
  }

  public selectVersion2(event) {
    this.ver2 = event;
  }

  public createFormGroup() {
    this.jsonForm = new UntypedFormGroup({
      type: new UntypedFormControl(this.jsonList.type, Validators.required),
      name: new UntypedFormControl(this.jsonList.name),
      subtype: new UntypedFormControl(this.jsonList.subtype),
      v1: new UntypedFormControl(this.jsonList.v1, Validators.required),
      v2: new UntypedFormControl(this.jsonList.v2, Validators.required),

    });
  }

  onSubmit(form) {
    let data;
    if (this.jsonForm.valid) {
      if (form.controls['type'].value === "IMF") {
        data = {
          type: form.controls['type'].value,
          v1: form.controls['v1'].value,
          v2: form.controls['v2'].value
        }
      }
      else {
        data = {
          type: form.controls['type'].value,
          name: form.controls['name'].value,
          subtype: form.controls['subtype'].value,
          v1: form.controls['v1'].value,
          v2: form.controls['v2'].value,
        }
      }
      const payload = Object.assign({}, data);
      console.log(payload);
      this._jsonCompareService.postJson(payload).subscribe(response => {
        if (response) {
          this.object1 = response.data.jsondatalist.jsondata[0].json;
          this.createdBy = response.data.jsondatalist.jsondata[0].createdBy;
          if (response.data.jsondatalist.jsondata[1]) {
            this.object2 = response.data.jsondatalist.jsondata[1].json;
          }
          else {
            this.object2 = response.data.jsondatalist.jsondata[0].json;
          }
          this.transformJson(this.object1, this.object2);
          //calculate JSON difference
          let diff = this.objectDiff.diff(JSON.parse(this.object1), JSON.parse(this.object2));
          this.diffView = this.objectDiff.toJsonView(diff);
        }
      })
    }
    else {
      this.validateAllFormFields(this.jsonForm);
    }
  }


  public transformJson(obj1, obj2) {
    this.object1View = this.objectDiff.objToJsonView(JSON.parse(obj1));
    this.object2View = this.objectDiff.objToJsonView(JSON.parse(obj2));
  }

  reset() {
    this.object1View = null;
    this.object2View = null;
    this.selectedV1 = null;
    this.selectedV2 = null;
    this.selectedSubType = null;
    this.selectedComponentName = null;
  }
  isFieldValid(field: string) {
    return !this.jsonForm.get(field).valid && this.jsonForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
