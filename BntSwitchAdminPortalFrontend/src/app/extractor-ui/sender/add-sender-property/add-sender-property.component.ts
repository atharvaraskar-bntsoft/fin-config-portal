import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ExtractorService } from '@app/services/extractor.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-add-sender-property',
  templateUrl: './add-sender-property.component.html',
  styleUrls: ['./add-sender-property.component.scss'],
})
export class AddSenderPropertyComponent implements OnInit, OnDestroy {

  senderPropertyForm: UntypedFormGroup;
  senderConfig: UntypedFormArray;
  submitted: boolean = false;
  editFlag: boolean = false;

  componetDestroyed = new Subject();

  constructor(
    public dialogRef: MatDialogRef<AddSenderPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,
    private extractorservice: ExtractorService,
  ) { }

  ngOnInit(): void {
    this.senderPropertyForm = this.formBuilder.group({
      senderType: ['KAFKA', Validators.required],
      senderConfig: this.formBuilder.array([])
    });

    this.loadData();
  }

  loadData() {
    if (this.data['editItem']) {
      this.senderConfig = this.senderPropertyForm.get('senderConfig') as UntypedFormArray;
      this.editFlag = this.data['editItem'];
      for (const item in this.data['currentData']['config']) {
        this.senderConfig.push(this.viewData(item));
      }
    } else {
      this.senderConfig = this.senderPropertyForm.get('senderConfig') as UntypedFormArray;
      this.extractorservice.getSenderDefaultProperty().pipe(takeUntil(this.componetDestroyed))
        .subscribe(response => {
          if (response && response.status == 'success') {
            let data = response.data ? response.data : {};
            data = data['dummy1'] ? JSON.parse(data['dummy1']) : [];
            if (data && data.length > 0) {
              for (let item of data) {
                this.senderConfig.push(this.renderData(item));
              }
            }
          } else {

          }
        });
    }
  }

  renderData(obj: any) {
    return this.formBuilder.group({
      property: [obj.name, [Validators.required, this.noWhitespaceValidator]],
      value: [obj.possibleValue, [Validators.required, this.noWhitespaceValidator]]
    });
  }

  viewData(value: any) {
    return this.formBuilder.group({
      property: [value, [Validators.required, this.noWhitespaceValidator]],
      value: [this.data.currentData['config'][value], [Validators.required, this.noWhitespaceValidator]]
    });
  }

  createItem(): UntypedFormGroup {
    return this.formBuilder.group({
      property: ['', [Validators.required, this.noWhitespaceValidator]],
      value: ['', [Validators.required, this.noWhitespaceValidator]]
    });
  }

  addProperty() {
    this.senderConfig = this.senderPropertyForm.get('senderConfig') as UntypedFormArray;
    this.senderConfig.push(this.createItem());
  }

  removeProperty(i: number) {
    this.senderConfig = this.senderPropertyForm.get('senderConfig') as UntypedFormArray;
    this.senderConfig.removeAt(i);
  }

  public noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control?.value?.charAt(0) || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  configData(sConfig: any) {
    const config = {};
    for (let item of sConfig) {
      config[item.property] = item.value;
    }
    return config;
  }

  public saveSenderProperty() {
    this.submitted = true;
    if (this.senderPropertyForm.valid) {
      if (this.editFlag) {
        const formValue = this.senderPropertyForm.value;
        this.data.senderData[this.data.index].senderType = formValue.senderType;
        this.data.senderData[this.data.index].config = this.configData(formValue.senderConfig);
        this.dialogRef.close('success');
      } else {
        const formValue = this.senderPropertyForm.value;
        const finalData = {
          'type': 'kafkaSender',
          'senderType': formValue.senderType,
          'config': this.configData(formValue.senderConfig)
        }
        this.data.senderData.push(finalData);
        this.dialogRef.close('success');
      }
    }
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }

}
