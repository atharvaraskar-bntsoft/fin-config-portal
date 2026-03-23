import { AlertService } from './../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Utils } from 'src/utils';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

export interface ICopyObj {
  type: string;
  mandatory: boolean;
  label: string;
  key: string;
  defaultvalue: string;
  isFile?: boolean;
  listvalues?: string;
}

export interface INetworkProps {
  type: 'message' | 'network';
  item: any;
}

interface INetworkData {
  message: any[];
  network: any[];
}

interface IDialogData {
  networkData: {
    properties: INetworkData;
    persistRequired?: string;
  };
}

@Component({
  selector: 'app-add-network',
  templateUrl: './add-network.component.html',
  styleUrls: ['./add-network.component.scss'],
})
export class AddNetworkComponent implements OnInit {
  public utils = Utils;
  listvalueError: any;
  public copyObj: ICopyObj = {
    type: 'message',
    mandatory: false,
    label: null,
    defaultvalue: null,
    key: null,
    isFile: false,
  };
  addNewProperty: UntypedFormGroup;
  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<AddNetworkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder,
  ) {}

  // [^[^\s]+[-a-zA-Z \s]+([-a-zA-Z ]+)*$
  ngOnInit(): void {
    this.addNewProperty = this.formBuilder.group({
      type: ['message', Validators.required],
      key: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._]*$')]],
      label: ['', [Validators.required, Validators.pattern('(?!^ +$)^.+$')]],
      isFile: [false],
      defaultvalue:[''],
      listvalues: [''],
      mandatory: [false],
    });
    this.isFileControlValueChanged();
  }

  isFileControlValueChanged() {
    const listvaluesControl = this.addNewProperty.get('listvalues');
    this.addNewProperty.get('isFile').valueChanges.subscribe((isfileTrue: boolean) => {
      //  console.log(isfileTrue);
      if (isfileTrue === true) {
        listvaluesControl.setValidators([Validators.required]);
      } else {
        listvaluesControl.clearValidators();
      }
      listvaluesControl.updateValueAndValidity();
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
      // console.log(field);
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

  checkFileStatus() {
    this.copyObj.isFile = !this.copyObj.isFile;
  }
  public saveItem(copyObj: ICopyObj) {
    this.submitted = true;
    if (this.addNewProperty.valid) {
      let valid = false;
      let list_values;
      const { label, key, listvalues, isFile } = copyObj;
      if (!isFile) {
        list_values = listvalues && listvalues.length ? listvalues.split(',') : null;
      } else if (isFile) {
        list_values = listvalues;
        this.addNewProperty.value.defaultvalue = null;
      }
      if (copyObj.type) {
        this.data.networkData.properties[copyObj.type].unshift(
          this._setFieldValue(copyObj.type, list_values),
        );
      }
      this.addNewProperty.setValue({
        type: 'message',
        key: null,
        label: null,
        defaultvalue :null,
        isFile: false,
        listvalues: '',
        mandatory: false,
      });
      this.dialogRef.close('success');
    } else {
      this.validateAllFormFields(this.addNewProperty);
    }
  }

  private _setFieldValue(type: string, list_values: string[]) {
    this.addNewProperty.value.key = type + '--' + this.addNewProperty.value.key;
    return {
      datatype: this.addNewProperty.value.isFile ? 'file' : 'String',
      field: this.addNewProperty.value.key,
      hidden: false,
      label: this.addNewProperty.value.label.replace(/^\s+/, '').replace(/\s+$/, ''),
      listvalues: list_values,
      value: this.addNewProperty.value.defaultvalue,
      mandatory: this.addNewProperty.value.mandatory,
      mtype: type,
      custom: 2,
    };
  }
}
