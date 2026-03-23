import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css'],
})
export class EvaluateComponent implements OnInit {
  @Input() readOnlyFlag = false;
  @Input() lookupList = [];
  @Input() getEvaluateObj: any;
  @Input() currentIndex: any;
  public evaluateObj = {
    type: 'value_mapper',
    name: 'VALUE_MAPPER',
    defaultValue: null,
    useSameOnMatchFail: false,
    listParameters: [],
  };

  public listParametersObj = {
    dataType: null,
    ordinal: null,
    label: null,
    value: [],
  };

  public submit: any = false;

  constructor(private drawerRef: NzDrawerRef<string>) { }

  ngOnInit(): void {
    if (this.getEvaluateObj && this.getEvaluateObj !== 'null') {
      const parseObj = JSON.parse(this.getEvaluateObj);
      parseObj.listParameters[0].value.forEach(element => {
        let obj = element;
        let unkownKey = Object.keys(obj)[0];
        element.key = unkownKey;
        element.value = obj[unkownKey];
        delete obj[unkownKey];
      });
      this.listParametersObj = parseObj.listParameters[0];
      this.evaluateObj = parseObj;
    }
  }

  public addEvaluate(): void {
    this.submit = false;
    this.listParametersObj.value.push({
      key: null,
      value: null,
    });
  }

  public removeCustomMap(item) {
    // item.customMapper = undefined;
  }

  public addMap(item) {

  }
  public remove(i) {
    debugger
    this.listParametersObj.value.splice(i, 1);
  }

  public cancel() {
    debugger
    this.evaluateObj = {
      type: 'value_mapper',
      name: 'VALUE_MAPPER',
      defaultValue: null,
      useSameOnMatchFail: false,
      listParameters: [],
    };
    // this.drawerRef.close({ action: 'close' });
  }

  public save() {
    debugger
    this.submit = false;
    for (let item of this.listParametersObj.value) {
      if (item.key == null || item.value == null) {
        this.submit = true;
      }
    }

    if (this.submit == false) {
      if (this.listParametersObj.value.length > 0) {
        let parameter = this.listParametersObj.value;
        this.listParametersObj.value = [];
        parameter.forEach(each => {
          this.listParametersObj.value.push({
            [each.key]: each.value
          });
        });
        this.evaluateObj.listParameters.push(this.listParametersObj);
      } else {
        this.evaluateObj = null;
      }
      this.drawerRef.close({
        currentIndex: this.currentIndex,
        evaluateValue: this.evaluateObj,
        action: 'save'
      });
    }
  }
}
