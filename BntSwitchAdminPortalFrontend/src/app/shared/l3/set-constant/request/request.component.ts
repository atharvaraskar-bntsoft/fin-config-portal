import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'l3-set-constant-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class L3SetConstantRequestComponent implements OnInit {
  @Input() selectedTransactionType = false;
  @Input() showReqEnrichVisible;
  @Input() adapterData;
  @Input() jsonData;
  @Input() readOnlyFlag = false;
  @Input() enrichfields;
  @Output() public closePopup = new EventEmitter<any>();
  @Input() l3ReqConstant = [];
  public aphaNumeric = new RegExp('^[A-Za-z0-9s]+$');
  public valueValidError = false;
  public queryObjDropDown = [];
  public queryObjDropDownModel;
  public enrichModelObject: any;
  public mappings: any = [];
  public dataEnrichmentScreenError = false;
  @Input() row: any;
  @Output() closeDrawer = new EventEmitter<boolean>();

  ngOnInit() {}

  public changeImfDestination(data, event) {
    if (event) {
      data.resImfValue = event.split('%')[0];
      data.useCase = event.split('%')[1];
    } else {
      data.resImfValue = null;
      data.useCase = null;
    }
  }

  open(): void {
    this.showReqEnrichVisible = true;
  }


  close(){
    this.showReqEnrichVisible = false;
  }

  public valueValidation(data) {
    if (this.aphaNumeric.test(data)) {
      this.valueValidError = false;
    } else {
      this.valueValidError = true;
    }
  }

  public addItemfn() {
    this.l3ReqConstant.push({
      destination: null,
      ipc: 'SYSTEM_ERROR',
      source: null,
      type: 'field',
      isVisible: false,
      condition: null,
    });
  }

  public removeItemfn(index) {
    this.l3ReqConstant.splice(index, 1);
  }

  public saveEnrichPopupFn() {
    if(!this.ValidateData()){
    this.closePopup.emit({
      l3ReqConstant: this.l3ReqConstant,
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
      l3ReqConstant: this.l3ReqConstant,
    });
  }


  public ValidateData(): boolean {
    let validationFlag = false;
    this.l3ReqConstant.forEach(each => {
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
