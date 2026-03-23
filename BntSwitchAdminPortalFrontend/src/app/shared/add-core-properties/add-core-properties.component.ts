import { AlertService } from './../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Utils } from 'src/utils';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NumberOutline } from '@ant-design/icons-angular/icons';

export interface ICopyObj {
  type: string;
  mandatory: boolean;
  label: string;
  key: string;
  defaultvalue: string;
  listvalues?: string;
}

interface IDialogData {
  corePropertyData: any[]
}

@Component({
  selector: 'app-add-core-properties',
  templateUrl: './add-core-properties.component.html',
  styleUrls: ['./add-core-properties.component.scss'],
})
export class AddCorePropertiesComponent implements OnInit {
  public utils = Utils;
  listvalueError: any;
  public copyObj: ICopyObj = {
    type: 'core',
    mandatory: false,
    label: null,
    defaultvalue: null,
    key: null,
  };
  addNewProperty: UntypedFormGroup;
  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<AddCorePropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.addNewProperty = this.formBuilder.group({
      type: ['core', Validators.required],
      key: ['', Validators.required],
      label: ['', [Validators.required, Validators.pattern('(?!^ +$)^.+$')]],
      defaultvalue: [''],
      mandatory: [false],
    });
  }

  isFieldValid(field: string) {
    return !this.addNewProperty.get(field).valid && this.addNewProperty.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }
  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  checkStatus() {
    this.copyObj.mandatory = !this.copyObj.mandatory;
  }

  public saveItem(copyObj: ICopyObj) {
    this.submitted = true;
    if (this.addNewProperty.valid) {
      let valid = false;
      if (copyObj.type) {
        this.data.corePropertyData.unshift(
          this._setFieldValue(copyObj.type)
        );
      }
      // this.addNewProperty.setValue({
      //   type: 'core',
      //   key: null,
      //   label: null,
      //   defaultvalue: null,
      //   mandatory: false,
      // });
      this.dialogRef.close('success');
    } else {
      this.validateAllFormFields(this.addNewProperty);
    }
  }

  private _setFieldValue(type: string) {
    return {
      datatype: 'String',
      field: this.addNewProperty.value.key,
      hidden: false,
      format: "",
      label: this.addNewProperty.value.label.replace(/^\s+/, '').replace(/\s+$/, ''),
      listvalues: null,
      value: this.addNewProperty.value.defaultvalue,
      mandatory: this.addNewProperty.value.mandatory,
      fileName: null
    };
  }
}
