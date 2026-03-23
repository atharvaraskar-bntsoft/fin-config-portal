import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MainService } from '../main.service';
import { removeListeners, removeSubscriptions } from '../helpers';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { EvaluateComponent } from '../evaluate/evaluate.component';
import { PostValidationComponent } from '../post-validation/post-validation.component';
import { StepComponent } from '../step/step.component';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss'],
})
export class ExtractComponent implements OnInit {
  private subscriptions = []; // for memory leakage
  private listeners = [];
  public validationList = [];
  @Input() serviceList: any = [];
  @Input() typeList: any = [];
  @Input() field;
  @Input() sourceList;
  @Input() ipcList;
  @Input() networkService;
  public listValidationFunction = null;
  @Input() isRequest;
  @Input() imfId;
  authData = [];
  @Input() readOnlyFlag = false;
  @Input() sources: any;
  isSave = false;
  @Input() public copyItem: any;
  @Output() public oncancel = new EventEmitter<boolean>();
  @Output() public saveExtract = new EventEmitter<Object>();
  public extractObject: any = {
    networkService: null,
    adpType: null,
    tab: null,
    template: null,
    feature: 'EXTRACT',
    field: null,
    listExtractMapping: [],
  };
  @Input() fieldDataList = [];
  public listExtractMapping: any = [];
  public imfList: any = [];
  public isVisible: boolean = false;
  public conditionalData;
  public lookupList = [];
  public jsonData;
  public ruleData: any;
  public ruleData2: any;
  public currentIndex: any;
  public ruleDataOutput: any;
  public inputfields: Array<any> = [];
  public conditionObj: any;
  public editnode: any;
  public destinationsValues: any = '';
  public description: String = '';
  public name: String = '';
  public enabled = false;
  public selectdestinations: any = [];
  public evaluateObj: any = null;
  public stepList = [];
  public result: any;
  public multiple = [];
  public noErrorFlag;
  public outpustLabel: String;
  public isEditable: Boolean = false;
  public showscreen: Boolean = false;
  @Input() conditionDropDown: Array<any> = [];
  @Input() imfVersionData: Array<any> = [];
  public imfAliasValue = null;

  constructor(
    private _service: MainService,
    private _l1AdapterService: L1AdapterService,
    private drawerService: NzDrawerService,
  ) {
    this.subscriptions.push(
      this._service.GetStepListMethod().subscribe((response: any) => {
        if (response && response.data) {
          this.stepList = [];
          response.data.forEach(element => {
            if (element && element.type === 'execute_function') {
              this.stepList.push(element);
            }
            if (element && element.type === 'in_built_validation') {
              this.validationList.push(element);
            }
          });
          if (this.stepList && this.isRequest) {
            this.stepList = this.stepList.filter(item => item.request);
          } else if (this.stepList && !this.isRequest) {
            this.stepList = this.stepList.filter(item => item.response);
          }
        }
      }),
    );

    this.subscriptions.push(
      this._l1AdapterService.getLookUpList().subscribe((response: any) => {
        if (response && response.data && response.data.list) {
          this.lookupList = this.transformLogic(response.data.list);
        }
      }),
    );

    this.subscriptions.push(
      this._service.getIPC().subscribe(item => {
        this.ipcList = item.data;
      }),
    );

    if (this.conditionObj && this.conditionObj !== null) {
      this.result = JSON.parse(JSON.stringify(this.conditionObj));
      if (this.conditionObj) {
        this.conditionObj = JSON.parse(JSON.stringify(this.conditionObj));
      }
      this._transFrom(this.result);
    }
  }

  private transformLogic(data) {
    return data.map(item => {
      if (!item.values) {
        item.title = item.lookupvalue;
        item.key = item.lookupvalue;
        item.isLeaf = true;
      } else {
        item.title = item.lookuptype;
        item.key = item.lookuptype;
        item.disabled = true;
      }
      if (item.values) {
        item.children = this.transformLogic(item.values);
      }
      return item;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.conditionDropDown && changes.conditionDropDown.currentValue) {
      changes.conditionDropDown.currentValue.map(item => {
        this.authData.push({ id: item.id, name: item.name });
      });
    }

    if (changes && changes.imfVersionData && changes.imfVersionData.currentValue) {
      this.jsonData = changes.imfVersionData.currentValue;
      this.imfList = this.transformLogicNew(changes.imfVersionData.currentValue.attributes);
      if (
        this.sources &&
        this.sources.listExtractMapping &&
        this.sources.listExtractMapping.length > 0
      ) {
        this.editDataBinding();
      }
      this.showscreen = true;
    }
  }

  ngOnInit() {
    if (!this.sources.hasOwnProperty('listExtractMapping')) {
      let parentField = null;
      if (this.sources.hasOwnProperty('parentField')) {
        parentField = this.sources.parentField;
      }
      this.extractObject.listExtractMapping.push({
        parentField: parentField,
        packagerField: this.sources.source,
        imfField: {
          useCase: null,
          text: null,
          service: 'GATEWAY_SERVICE',
          type: 'request',
        },
        type: 'request',
        ipc: 'SYSTEM_ERROR',
        condition: null,
        status: 'M',
        listValidationFunction: [],
        listFunction: [],
        customMapperList: null,
      });
    }
  }

  editDataBinding() {
    let parentField = null;
    if (this.sources.hasOwnProperty('parentField')) {
      parentField = this.sources.parentField;
    }
    this.sources.listExtractMapping.forEach(element => {
      let value_mapper = null;
      if (element.listFunction[0] === null) {
        element.listFunction = [];
      }
      if (element && element.listFunction && element.listFunction.length > 0) {
        let valueMapperIndex = element.listFunction.findIndex(x => x.type == 'value_mapper');
        value_mapper = element.listFunction[valueMapperIndex];
        element.listFunction.splice(valueMapperIndex, 1);
      }
      let data = JSON.parse(JSON.stringify(this.imfList));
      this.findUseCaseValue(data, element);
      this.extractObject.listExtractMapping.push({
        parentField: parentField,
        packagerField: this.sources.source,
        imfField: element.imfField,
        type: element.type,
        ipc: element.ipc,
        condition: element.condition,
        status: element.status,
        listValidationFunction: element.listValidationFunction,
        listFunction: element.listFunction,
        customMapperList: value_mapper,
      });
    });
  }

  public findUseCaseValue(data, element) {
    const result = data.find((each: any) => each.key.nestedName === element.imfField.text);
    if (!result) {
      data.forEach(item => {
        if (item.attributes) {
          this.findUseCaseValue(item.attributes, element);
        }
      });
    } else {
      element.imfField.key = result.key;
    }
  }

  private _transFrom(result: any) {
    if (result && result.data !== null) {
      this.editnode = result.data;
      this.destinationsValues = result.data.rule.destinations;
      this.description = result.data.rule.description;
      this.name = result.data.rule.name;
      this.enabled = result.data.rule.active;
      this.selectdestinations = this.destinationsValues.map(item => {
        return this.ruleDataOutput.find(
          (fielddata: any) => parseInt(fielddata.value, 0) === item.id,
        );
      });
      this.inputfields = this.inputfields.map(field => {
        if (field.dtoField === 'ruleName') {
          field.value = result.data.rule.name;
        } else if (field.dtoField === 'ruleDesc') {
          field.value = result.data.rule.description;
        } else {
          if (result.data.rule.additionalInfo) {
            const outputfield = result.data.rule.additionalInfo.find(element => {
              return field.dtoField === element.name;
            });
            if (outputfield) {
              field.value = outputfield.value;
            }
          }
        }
        return field;
      });
    }
  }

  private transformLogicNew(data) {
    return data.map(item => {
      const payload: any = {};
      if (!item.attributes) {
        payload.title = item.nestedName;
        payload.key = item;
        payload.isLeaf = true;
      } else {
        payload.title = item.name;
        payload.key = item;
      }
      if (item.attributes) {
        payload.children = this.transformLogicNew(item.attributes);
      }
      return payload;
    });
  }

  onChange(event: any, item) {
    item.imfField = {
      useCase: event.useCase,
      text: event.name,
      service: '',
      type: '',
      alias: event.nestedName,
    };
    this.imfAliasValue = item.imfField;
    if (item.validateImfField) {
      delete item.validateImfField;
    }
  }

  public addBlockStep(block) {
    block.push({ type: 'execute_function', name: 'Step', value: null, params: [] });
  }

  addMore() {
    this.extractObject.listExtractMapping.push({
      packagerField: this.sources.source,
      imfField: {
        useCase: null,
        text: null,
        service: 'GATEWAY_SERVICE',
        type: 'request',
      },
      type: 'request',
      ipc: 'SYSTEM_ERROR',
      condition: null,
      status: 'M',
      listValidationFunction: [],
      listFunction: [],
      customMapperList: null,
    });
  }

  removeBlock(index) {
    this.extractObject.listExtractMapping.splice(index, 1);
  }

  saveResConditionalData(event: any) {
    this.conditionObj = event.condition;
    this.extractObject.listExtractMapping[this.currentIndex].condition = event.condition;
    this.conditionObj;
    this.isVisible = false;
  }

  ngOnDestroy() {
    this.listeners = removeListeners(this.listeners);
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }

  public removeBlockStep(index: number, block) {
    block.pop();
  }

  closeCondition() {
    this.isVisible = false;
  }

  createCondition(obj, ind) {
    this.isVisible = true;
    this.currentIndex = ind;
    if (obj.condition) {
      this.conditionObj = obj.condition;
    } else {
      this.conditionObj = null;
    }
  }

  public getRule(value) {
    if (value.condition) {
      this.conditionObj = JSON.parse(JSON.stringify(value.condition));
      this.extractObject.listExtractMapping[this.currentIndex].condition = this.conditionObj;
      delete this.extractObject.listExtractMapping[this.currentIndex].validateCondition;
      this.isVisible = false;
    }
  }

  selectService(item: any) {
    delete item.validateServiceField;
  }

  selectType(item: any) {
    delete item.validateTypeField;
  }

  public save() {
    this.extractObject.listExtractMapping.forEach(element => {
      element.listFunction.forEach(ele => {
        if (ele) {
          delete ele.value;
        }
      });
      if (!element.imfField.text) {
        element.validateImfField = true;
      } else {
        delete element.validateImfField;
      }
      if (
        !element.imfField.service &&
        (element.imfField.useCase == 2 || element.imfField.useCase == 3)
      ) {
        element.validateServiceField = true;
      } else {
        delete element.validateServiceField;
      }
      if (!element.imfField.type && element.imfField.useCase == 3) {
        element.validateTypeField = true;
      } else {
        delete element.validateTypeField;
      }
      if (!element.condition && element.status == 'C') {
        element.validateCondition = true;
      } else {
        delete element.validateCondition;
      }
    });
    for (let item of this.extractObject.listExtractMapping) {
      if (
        item['validateImfField'] ||
        item['validateCondition'] ||
        item['validateServiceField'] ||
        item['validateTypeField']
      ) {
        return;
      }
    }
    this.pushEvaluateObjFunction();
    this.isSave = true;
    this.onSubmit();
  }

  public pushEvaluateObjFunction() {
    this.extractObject.listExtractMapping.forEach(mapping => {
      mapping.listFunction.push(mapping.customMapperList);
      delete mapping.customMapperList;
    });
  }

  public onSubmit(): void {
    this.subscriptions.push(
      this._service.postData(this.extractObject).subscribe(res => {
        if (res && res.status == 'success') {
        }
      }),
    );
    this.saveExtract.emit(this.extractObject);
  }

  close() {
    if (this.extractObject.listExtractMapping && this.extractObject.listExtractMapping.length > 0) {
      this.extractObject.listExtractMapping.forEach((element: any) => {
        if (element.customMapperList) {
          element.listFunction.push(element.customMapperList);
        }
      });
    }

    this.oncancel.emit(false);
  }

  createPostValidation(item, index) {
    this.currentIndex = index;
    const drawerRef = this.drawerService.create<
      PostValidationComponent,
      {
        value: string;
      },
      any
    >({
      nzWidth: '60%',
      nzTitle: 'Post Validation',
      nzContent: PostValidationComponent,
      nzMaskClosable: false,
      nzContentParams: {
        value: 'ng',
        currentIndex: index,
        isVisiblePostValidation: true,
        listValidation: JSON.stringify(item.listValidationFunction),
        sourceList: this.sourceList,
        imfList: this.imfList,
        validationList: this.validationList,
        readOnlyFlag: this.readOnlyFlag,
      },
    });
    drawerRef.afterOpen.subscribe(() => {});
    drawerRef.afterClose.subscribe((event: any) => {
      if (event && event.action === 'save') {
        item.listValidationFunction = event.listValidationFunction;
      }
    });
  }

  createEvaluate(item, index) {
    const drawerRef = this.drawerService.create<EvaluateComponent, { value: string }, string>({
      nzTitle: 'Evaluate',
      nzContent: EvaluateComponent,
      nzMaskClosable: false,
      nzWidth: '60%',
      nzContentParams: {
        readOnlyFlag: this.readOnlyFlag,
        lookupList: this.lookupList,
        getEvaluateObj: JSON.stringify(item.customMapperList),
      },
    });
    drawerRef.afterOpen.subscribe(() => {});

    drawerRef.afterClose.subscribe((event: any) => {
      if (event && event.action === 'save') {
        item.customMapperList = null;
        item.customMapperList = event.evaluateValue;
      } else {
        item.customMapperList = item.customMapperList;
      }
    });
  }

  deleteCondition(item) {
    item.condition = null;
  }

  collapseBlockList(item) {
    item.collapse = !item.collapse;
  }

  createStep(item) {
    const drawerRef = this.drawerService.create<StepComponent, { value: string }, string>({
      nzTitle: 'Steps',
      nzContent: StepComponent,
      nzMaskClosable: false,
      nzWidth: '70%',
      nzContentParams: {
        readOnlyFlag: this.readOnlyFlag,
        getField: this.sources,
        authData: this.authData,
        ipcList: this.ipcList,
        jsonData: this.jsonData,
        getListFunction: JSON.stringify(item.listFunction),
        stepList: this.stepList,
      },
    });
    drawerRef.afterOpen.subscribe(() => {});

    drawerRef.afterClose.subscribe((event: any) => {
      if (event && event.action === 'save') {
        item.listFunction = null;
        item.listFunction = event.listFunction;
      }
    });
  }

  conditionNull(item, event) {
    if (event != 'C') {
      item.condition = null;
    }
  }
}
