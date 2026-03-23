import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-constant-extractor',
  templateUrl: './constant-extractor.component.html',
  styleUrls: ['./constant-extractor.component.css'],
})
export class ConstantExtractorComponent implements OnInit, OnChanges {
  @Input() authData: Array<any> = [];
  @Input() constantArray: Array<any> = [];
  @Output() closeConstant: EventEmitter<any> = new EventEmitter();
  @Output() constantValue = new EventEmitter<any>();
  @Input() jsonData: Array<any> = [];

  constantForm: UntypedFormGroup;
  constantConfig: UntypedFormArray;
  submitted: boolean = false;

  packageList: any = [];
  conditionObj: any;
  index: number;
  extConstantArray: any = [];

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.authData && changes.authData.currentValue) {
      this.packageList = changes.authData.currentValue;
    }

    if (changes && changes.constantArray && changes.constantArray.currentValue) {
      this.extConstantArray = changes.constantArray.currentValue;
    }
  }

  ngOnInit(): void {
    this.constantForm = this.formBuilder.group({
      constantConfig: this.formBuilder.array([]),
    });

    this.loadData();
  }

  loadData() {
    if (this.extConstantArray.length > 0) {
      this.constantConfig = this.constantForm.get('constantConfig') as UntypedFormArray;
      for (const item of this.extConstantArray) {
        this.constantConfig.push(this.viewData(item));
      }
    }
  }

  viewData(data: any) {
    return this.formBuilder.group({
      packagerField: [data.packagerField, Validators.required],
      source: [data.source, Validators.required],
      condition: [data.condition],
    });
  }

  createItem(): UntypedFormGroup {
    return this.formBuilder.group({
      packagerField: [null, Validators.required],
      source: [null, Validators.required],
      condition: [null],
    });
  }

  addConstant() {
    this.conditionObj = null;
    this.constantConfig = this.constantForm.get('constantConfig') as UntypedFormArray;
    this.constantConfig.push(this.createItem());
  }

  removeConstant(i: number) {
    this.constantConfig = this.constantForm.get('constantConfig') as UntypedFormArray;
    this.constantConfig.removeAt(i);
  }

  saveConstant(value: any): void {
    if (this.constantForm.valid) {
      this.constantValue.emit(value);
    }
  }

  closeDrawer() {
    this.closeConstant.emit();
  }

  close(): void {
    this.isVisible = false;
  }

  isVisible = false;
  openCondition(ind: number) {
    this.isVisible = true;
    this.index = ind;
    this.constantConfig = this.constantForm.get('constantConfig') as UntypedFormArray;
    if (this.constantConfig.controls[this.index].get('condition').value) {
      this.conditionObj = this.constantConfig.controls[this.index].get('condition').value;
    } else {
      this.conditionObj = null;
    }
  }

  deleteCondition(ind: number) {
    this.constantConfig = this.constantForm.get('constantConfig') as UntypedFormArray;
    this.constantConfig.controls[ind].patchValue({ condition: null });
    this.conditionObj = undefined;
  }

  public getRule(value: any) {
    if (value.condition) {
      let conObject = JSON.parse(JSON.stringify(value.condition));
      this.constantConfig = this.constantForm.get('constantConfig') as UntypedFormArray;
      this.constantConfig.controls[this.index].patchValue({ condition: conObject });
      this.isVisible = false;
    }
  }
}
