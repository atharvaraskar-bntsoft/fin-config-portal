import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { CommonParameterComponent } from '../commonParameter/commonParameter.component';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {
  @Input() readOnlyFlag = false;
  @Input() getField: any;
  @Input() authData: any;
  @Input() ipcList: any;
  @Input() jsonData: any;
  @Input() getListFunction: any;
  @Input() stepList: any;
  selectedStepParameterStringify: any = null;
  public listFunction = [];
  public selectedStepParameter:any = null;

  childrenVisible = false;

  public submit: any = false;

  constructor(private drawerService: NzDrawerService, private drawerRef: NzDrawerRef<string>) { }

  ngOnInit(): void {
    if (this.getListFunction != 'null') {
      this.listFunction = JSON.parse(this.getListFunction);
      this.dataTransform();
    }
  }

  dataTransform() {
    this.listFunction.forEach(element => {
      element.value = this.stepList.find(({ actionName }) => actionName === element.name);
    });
  }

  public addBlockStep() {
    this.listFunction.push({ type: 'execute_function', name: 'Step', value: null, params: [] });
  }

  public stepFunction(data, i, action) {
    if (data.actionName != null) {
      this.submit = false;
    }

    if (action === 'create') {
      this.listFunction[i].name = data.actionName;
      this.listFunction[i].type = data.type;
      this.listFunction[i].listParameters = [];
      this.dataMapping(data, this.listFunction[i].listParameters);
      this.selectedStepParameter = {
        data: data,
        index2: i,
        stepParam:
          this.listFunction[i].function && this.listFunction[i].function.parameters
            ? this.listFunction[i].function.parameters
            : [],
        listParameters: this.listFunction[i].listParameters,
        action: 'create'
      };
      this.selectedStepParameterStringify = JSON.stringify(this.selectedStepParameter);
    } else {
      let newlistParameters = [];
      this.dataMappingEdit(data, this.listFunction[i].listParameters, newlistParameters);
      this.listFunction[i].listParameters = [];
      this.listFunction[i].listParameters = newlistParameters;
      this.selectedStepParameter = {
        data: data,
        index2: i,
        action: 'edit',
        stepParam:
          this.listFunction[i].function && this.listFunction[i].function.parameters
            ? this.listFunction[i].function.parameters
            : [],
        listParameters: this.listFunction[i].listParameters,
      };
      this.selectedStepParameterStringify = JSON.stringify(this.selectedStepParameter);
    }
    if( this.selectedStepParameter.data.parameters.length > 0){
        this.openChildren();
    }

  }

  public dataMapping(data, listParameters): void {
    let parametersObject = {};
    if (data.parameters.length != 0) {
      data.parameters.forEach(element => {
        parametersObject = {
          dataType: element.dataType,
          ordinal: element.ordinal,
          name: element.name,
          label: element.displayName,
          possibleValue: element.possibleValue,
        };
        switch (element.dataType) {
          case 'Map':
            this.mapType(element, parametersObject, listParameters);
            listParameters.push(parametersObject);
            break;
          case 'List':
            this.listType(element, parametersObject, listParameters);
            listParameters.push(parametersObject);
            break;
          case 'String':
            this.stringType(element, parametersObject, listParameters);
            listParameters.push(parametersObject);
            break;
          case 'Integer':
            this.integerType(element, parametersObject, listParameters);
            listParameters.push(parametersObject);
            break;
          case 'Long':
            this.longType(element, parametersObject, listParameters);
            listParameters.push(parametersObject);
            break;
          case 'Object':
            this.objectType(element, parametersObject, listParameters);
            listParameters.push(parametersObject);
            break;
        }
      });
    }
  }

  public dataMappingEdit(data, listParameters, newlistParameters): any {
    let parametersObject = {};
    if (data.parameters.length != 0) {
      data.parameters.forEach(element => {
        parametersObject = {
          dataType: element.dataType,
          ordinal: element.ordinal,
          name: element.name,
          label: element.displayName,
          possibleValue: element.possibleValue,
        };
        switch (element.dataType) {
          case 'Map':
            this.mapType(element, parametersObject, listParameters);
            newlistParameters.push(parametersObject);
            break;
          case 'List':
            this.listType(element, parametersObject, listParameters);
            newlistParameters.push(parametersObject);
            break;
          case 'String':
            this.stringType(element, parametersObject, listParameters);
            newlistParameters.push(parametersObject);
            break;
          case 'Integer':
            this.integerType(element, parametersObject, listParameters);
            newlistParameters.push(parametersObject);
            break;
          case 'Long':
            this.longType(element, parametersObject, listParameters);
            newlistParameters.push(parametersObject);
            break;
          case 'Object':
            this.objectType(element, parametersObject, listParameters);
            newlistParameters.push(parametersObject);
            break;
        }
      });
    }
  }

  public mapType(item, parametersObject, listParameters) {
    if (listParameters.length === 0) {
      parametersObject.valueMap = [
        {
          key: null,
          isText: false,
          value: {
            useCase: null,
            text: null,
            service: 'GATEWAY_SERVICE',
            type: null,
          },
        },
      ];
    } else {
      const parameters = listParameters.find(({ ordinal }) => ordinal === parametersObject.ordinal);
      if (parameters) {
        parametersObject.valueMap = [];
        parameters.valueMap.forEach(elementMap => {
          if (elementMap.isText) {
            parametersObject.valueMap.push({
              key: elementMap.key,
              isText: elementMap.isText,
              value: {
                useCase: null,
                text: elementMap.value,
                service: 'GATEWAY_SERVICE',
                type: null,
              },
            });
          } else {
            parametersObject.valueMap.push({
              key: elementMap.key,
              isText: elementMap.isText,
              value: {
                useCase: elementMap.value.useCase,
                text: elementMap.value.text,
                service: elementMap.value.service,
                type: elementMap.value.type,
              },
            })
          }
        });
      }
    }
  }

  public stringType(data, parametersObject, listParameters) {
    if (listParameters.length !== 0) {
      const parameters = listParameters.find(({ ordinal }) => ordinal === parametersObject.ordinal);
      if (parameters) {
        parametersObject.value = parameters.value;
        if (this.checkNameHavingSourceKeyword(parametersObject)) {
          parametersObject.checked = parameters.checked;
          parametersObject.text = parameters.text;
        }
      }
    } else {
      parametersObject.value = null;
      if (this.checkNameHavingSourceKeyword(parametersObject)) {
        parametersObject.checked = false;
        parametersObject.text = null;
      }
    }
  }

  checkNameHavingSourceKeyword(param) {
    return param.name ? param.name.includes('source_') : false; // true
  }

  public listType(data, parametersObject, listParameters) {
    if (listParameters.length === 0) {
      parametersObject.value = [
        {
          textValue: null,
        },
      ];
    } else {
      const parameters = listParameters.find(({ ordinal }) => ordinal === parametersObject.ordinal);
      if (parameters) {
        parametersObject.value = [];
        parametersObject.value = parameters.value;
      }
    }
  }

  public integerType(data, parametersObject, listParameters) {
    parametersObject.value = null;
    if (listParameters.length !== 0) {
      const parameters = listParameters.find(({ ordinal }) => ordinal === parametersObject.ordinal);
      if (parameters) {
        parametersObject.value = parameters.value;
      }
    }
  }

  public objectType(data, parametersObject, listParameters) {
    parametersObject.value = null;
    if (listParameters.length !== 0) {
      const parameters = listParameters.find(({ ordinal }) => ordinal === parametersObject.ordinal);
      if (parameters) {
        parametersObject.value = parameters.value;
      }
    }
  }

  public longType(data, parametersObject, listParameters) {
    parametersObject.value = null;
    if (listParameters.length !== 0) {
      const parameters = listParameters.find(({ ordinal }) => ordinal === parametersObject.ordinal);
      if (parameters) {
        parametersObject.value = parameters.value;
      }
    }
  }

  public addParam(event) {
    if (event.action == 'save') {
      event.listParameter.forEach(element => {
        delete element.possibleValue;
        if (element.dataType == 'Map') {
          if ('valueMap' in element && element.valueMap && element.valueMap.length !== 0) {
            element.valueMap.forEach(ele => {
              if (ele.isText) {
                ele.text = ele.value.text;
                delete ele.value;
                ele.value = ele.text;
                delete ele.text;
              }
            });
          }
        }
      });
      this.listFunction[event.index2].listParameters = event.listParameter;
    } else {
      if (event.selectedStepParameter.action === 'edit') {
        this.listFunction[event.selectedStepParameter.index2].listParameters = event.listParameter;
      } else {
        this.listFunction[event.selectedStepParameter.index2].listParameters = [];
      }
    }
    this.childrenVisible = false;
  }

  public removeBlockStep(index) {
    this.listFunction.splice(index, 1);
  }

  saveSteps() {
    this.submit = false;
    this.listFunction.forEach(event => {
      delete event.params;
      if (event.value == null) {
        this.submit = true;
      } else {
        this.submit = false;
      }
    });

    if(this.submit == false){
      this.drawerRef.close({
        listFunction: this.listFunction,
        action: 'save',
      });
    }
  }

  saveAndclose(event) {
    if (event.action == 'save') {
      event.listParameter.forEach(element => {
        delete element.possibleValue;
        if (element.dataType == 'Map') {
          if ('valueMap' in element && element.valueMap && element.valueMap.length !== 0) {
            element.valueMap.forEach(ele => {
              if (ele.isText) {
                ele.text = ele.value.text;
                delete ele.value;
                ele.value = ele.text;
                delete ele.text;
              }
            });
          }
        }
      });
      this.listFunction[event.index2].listParameters = event.listParameter;
    } else {
      if (event.selectedStepParameter.action === 'edit') {
        this.listFunction[event.selectedStepParameter.index2].listParameters = event.listParameter;
      } else {
        this.listFunction[event.selectedStepParameter.index2].listParameters = [];
      }
    }
    this.childrenVisible = false;
    this.listFunction.forEach(event => {
      delete event.params;
      if (event.value == null) {
        this.submit = true;
      } else {
        this.submit = false;
      }
    });



    if(this.submit == false){
      this.drawerRef.close({
        listFunction: this.listFunction,
        action: 'save',
      });
    }
  }

  public cancel() {
    this.drawerRef.close({ action: 'close' });
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    if (this.selectedStepParameter['action'] === 'edit') {
      this.listFunction[this.selectedStepParameter['index2']].listParameters = this.selectedStepParameter['listParameter'];
    } else {
      this.listFunction[this.selectedStepParameter['index2']].listParameters = [];
    }
    this.childrenVisible = false;
    this.selectedStepParameter = {};
  }
}
