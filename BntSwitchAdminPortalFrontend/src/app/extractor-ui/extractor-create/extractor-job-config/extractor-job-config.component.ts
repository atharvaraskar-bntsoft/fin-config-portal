import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-extractor-job-config',
  templateUrl: './extractor-job-config.component.html',
  styleUrls: ['./extractor-job-config.component.css']
})
export class ExtractorJobConfigComponent implements OnInit {
  @Output() jobForm = new EventEmitter<any>();
  @Input() jobFormEdit: any;
  @Input() public panels = [];
  public editId: any;
  @Input() initialJson: any;
  public submitForm: UntypedFormGroup;
  public disable: boolean = false;
  public type = [
    {
      'id': 1,
      'name': 'json'
    }
  ];
  constructor(private formBuilder: UntypedFormBuilder,) {

  }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({

      jobName: null,
      jobGroup: null,
      type: null,
      jobDesc :null,

      active: null,

      

    })
  }

  ngOnChanges(): void {
    this.disable = false;
    if (this.initialJson) {
      this.submitForm = this.formBuilder.group({
        jobName: [this.initialJson.jobName, [Validators.required]],
        jobGroup: [this.initialJson.jobGroup, [Validators.required]],
        jobDesc: [this.initialJson.jobDesc, [Validators.required]],
        type: [this.initialJson.type, [Validators.required]],
        active: this.initialJson.active
      });
      if(this.initialJson.id){
        this.editId = this.initialJson.id;
        this.submitForm.get('jobName').disable();
        this.submitForm.get('jobGroup').disable();
        this.submitForm.get('jobDesc').disable();
        this.submitForm.get('type').disable();
        this.disable = true;
      }
    }
  }

  public onSubmit(value: any): void {
    this.submitForm.value.jobName = this.submitForm.value.jobName.replace(/<[^>]*>/g, '');
    this.submitForm.value.jobGroup = this.submitForm.value.jobGroup.replace(/<[^>]*>/g, '');
    this.submitForm.value.jobDesc = this.submitForm.value.jobDesc.replace(/<[^>]*>/g, '');    
    if (this.submitForm.valid) {
      this.jobForm.emit({
        value: value,
        panels: this.panels
      });
    }
  }

}
