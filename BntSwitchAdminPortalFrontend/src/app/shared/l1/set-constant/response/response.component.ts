import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { each } from 'underscore';

@Component({
  selector: 'l1-set-constant-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class L1SetConstantResponseComponent implements OnInit {
  @Input() selectedTransactionType;
  @Input() adapterData;
  @Input() jsonData;
  @Input() enrichfields;
  @Output() public closePopup = new EventEmitter<any>();
  @Input() l1ResConstant = [];
  @Input() readOnlyFlag = false;
  @Input() showReqEnrichVisible = false;
  @Input() row: any;

  @Output() closeDrawer = new EventEmitter<boolean>();

  public aphaNumeric = new RegExp('^[A-Za-z0-9s]+$');
  public valueValidError = false;
  public queryObjDropDown = [];
  public queryObjDropDownModel;
  public enrichModelObject: any;
  public mappings: any = [];
  public dataEnrichmentScreenError = false;

  ngOnInit() {}

  open(): void {
    this.showReqEnrichVisible = true;
  }

  close(): void{
    this.showReqEnrichVisible = false;
  }


  public changeImfDestination(data, event) {
    if (event) {
      data.resImfValue = event.split('%')[0];
      data.useCase = event.split('%')[1];
    } else {
      data.resImfValue = null;
      data.useCase = null;
    }
  }

  public valueValidation(data) {
    if (this.aphaNumeric.test(data)) {
      this.valueValidError = false;
    } else {
      this.valueValidError = true;
    }
  }

  public addItemfn() {
    this.l1ResConstant.push({
      destination: null,
      source: null,
      type: 'field',
      isVisible: false,
      condition: null,
    });
  }

  public removeItemfn(index) {
    this.l1ResConstant.splice(index, 1);
  }

  public ValidateData(): boolean {
    let validationFlag = false;
    this.l1ResConstant.forEach(each => {
        if(each.destination===null){
            each['destinationValidation'] = true;
            validationFlag = true;
        }else{
            if(Object.hasOwnProperty('destinationValidation')){
                  delete each.destinationValidation;
            }
        }
        if(each.source===null){
            each['sourceValidation'] = true;
            validationFlag = true;
        }else{
            if(Object.hasOwnProperty('sourceValidation')){
                  delete each.sourceValidation;
            }
        }
    });
    return validationFlag;
  }

  public saveEnrichPopupFn() {
    if(!this.ValidateData()){
    this.closePopup.emit({
      l1ResConstant: this.l1ResConstant,
      close: true,
      save: true,
    });
  }
  }


  public closePopWindow() {
    this.ValidateData();
    this.closePopup.emit({
      close: true,
      save: false,
      l1ResConstant: this.l1ResConstant,
    });
  }

  addCondition(row) {
    row.isVisible = true;
  }

  public getRule(value, row) {
    row.condition = value.condition;
    row.isVisible = false;
  }

  public cancel(row) {
    row.isVisible = false;
  }

  public removeCondition(row) {
    row.condition = null;
  }

}
