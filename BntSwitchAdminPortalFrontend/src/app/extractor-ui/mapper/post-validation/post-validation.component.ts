import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
@Component({
  selector: 'app-post-validation',
  templateUrl: './post-validation.component.html',
  styleUrls: ['./post-validation.component.css']
})
export class PostValidationComponent implements OnInit {

  public listValidationFunction: any = [] ;
  @Input() validationList = [];
  @Input() sourceList = [];
  @Input() imfList = [];
  @Input() currentIndex: any;
  @Input() listValidation: any =[];
  @Input() isVisiblePostValidation: boolean = false;
  @Input() value = '';
  @Input() readOnlyFlag;
  public error: any = false;
  public submit: any = false;
  public paramatersList: any;
  constructor(private drawerRef: NzDrawerRef<string>) { }

  ngOnInit(): void {
    if (this.listValidation != 'null') {
      this.listValidationFunction = JSON.parse(this.listValidation);
    }
  }

  close(): void {
    this.listValidationFunction = [];
    this.drawerRef.close({
      action: 'close',
    });
  }

  checkCssClass(data) {
    let flag = 'col-md-11';
    if (data.listValidationFunctionArgs && data.listValidationFunctionArgs.length == 0) {
      flag = 'col-md-11';
    } else if (data.listValidationFunctionArgs && data.listValidationFunctionArgs.length == 1) {
      flag = 'col-md-5';
    } else if (data.listValidationFunctionArgs && data.listValidationFunctionArgs.length == 2) {
      flag = 'col-md-5';
    }
    return flag
  }


  savePostValidation() {
    this.error = false;
    this.submit = false;
    this.listValidationFunction.forEach(element => {
      element.name === null
      if (element.name == null) {
        this.error = true;
        this.submit = true;
      } else if (element.name != null && element.listValidationFunctionArgs.length > 0) {
        element.listValidationFunctionArgs.forEach(x => {
          if (x.value == '') {
            this.error = true;
            this.submit = true;
          } else {
            this.error = false;
            this.submit = false;
          }
        });
      }
    });

    if (this.error == false && this.submit == false) {
      this.drawerRef.close({
        action: 'save',
        isVisiblePostValidation: false,
        listValidationFunction: this.listValidationFunction,
        currentIndex: this.currentIndex,
      });
    }
  }

  public addValidation() {
    this.error == false;
    this.listValidationFunction.push({
      name: null,
      operator: null,
      operatorList: [],
      params: [],
      validation: null,
    });
  }

  public validationParam(block, indexj) {
    if (block.name != null) {
      this.error = false;
      this.submit = false;
    }
    // block.parameters = this.validationList.find(x => x.actionName == block.name).parameters;
    this.validationList.forEach(x=>{
      if(x.actionName == block.name){
        block.parameters = x.parameters
      }
    })

    const parameter = block.parameters;
    block.params = [];
    if (parameter) {
      parameter.forEach(param => {
        if (param.name !== 'operator') {
          if (param.name.indexOf('source') !== -1) {
            block.params.push({
              label: 'source',
              list: this.sourceList,
              name: param.name,
              value: null,
            });
          } else if (param.name.indexOf('imf') !== -1) {
            block.params.push({
              label: 'imf',
              list: this.imfList,
              name: param.name,
              value: null,
            });
          } else {
            param.value = '';
            delete param.possibleValue
            block.params.push(param);
          }
        }
      });
      block.operatorList = parameter.operator ? parameter.operator : [];
    }
    this.listValidationFunction[indexj] = {
      "name": block.name,
      listValidationFunctionArgs: block.params
    }
  }

  public removeValidation(index) {
    this.listValidationFunction.splice(index, 1);
  }

}
