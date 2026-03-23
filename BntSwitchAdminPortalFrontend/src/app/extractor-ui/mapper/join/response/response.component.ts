import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { removeSubscriptions } from '../../helpers';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Subscription } from 'rxjs';
import { MainService } from '../../main.service';
import { PostValidationComponent } from '../../post-validation/post-validation.component';
import { EvaluateComponent } from '../../evaluate/evaluate.component';
import { StepComponent } from '../../step/step.component';

@Component({
  selector: 'app-join-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class JoinResponseComponent implements OnInit, OnChanges {
  @Input() conditionDropDown: Array<any> = [];
  evaluateValue: any;
  public ruleData: any;
  public ruleData2: any;
  @Input() serviceList: any = [];
  @Input() typeList: any = [];
  public currentIndex: any;
  public ruleDataOutput: any;
  public inputfields: Array<any> = [];
  public outpustLabel: String;
  public isEditable: Boolean = false;
  public result: any;
  public multiple = [];
  public editnode: any;
  public destinationsValues: any = '';
  public description: String = '';
  public name: String = '';
  public enabled = false;
  public selectdestinations: any = [];
  @Output() public oncancelJoin = new EventEmitter<boolean>();
  @Output() public saveJoin = new EventEmitter<Object>();
  panels = [
    {
      active: true,
      name: 'Source 1',
      disabled: false,
    },
    {
      active: false,
      disabled: false,
      name: 'Source 2',
    },
    {
      active: false,
      disabled: true,
      name: 'Source 3',
    },
  ];
  public evaluateObj: any = null;
  conditionObj = null;
  isVisible = false;
  readOnlyFlag = false;
  public joinSchema = {
    packagerField: null,
    imfField: {
      useCase: null,
      text: null,
      key: null,
      service: null,
      type: null,
      resultText: null,
      alias: null,
    },
    type: null,
    ipc: null,
    condition: null,
    status: 'O',
    listValidationFunction: [],
    multiBlock: false,
    blockName: null,
    listFunction: [],
    customMapperList: null,
    listJoinSource: [],
  };
  @Input() jsonDataValue: any;
  @Input() sourceList;
  @Input() sources: any;
  public imfSource = {
    sourceType: 'IMF',
    sourceImf: {
      useCase: null,
      text: null,
      service: null,
      type: null,
      alias: null,
    },
    ipc: 'APPROVED',
    listFunction: [],
    condition: null,
  };
  public imfText = {
    sourceType: 'TEXT',
    sourceImf: null,
    sourceText: 'TextSource',
    targetText: 'TextTarget',
    ipc: 'APPROVED',
    listFunction: [],
    condition: null,
  };
  public imfList: any = [];
  public stepList = [];
  public validationList = [];
  public conditionPosition = null;
  private subscriptions: Subscription[] = [];
  public lookupList = [];
  public ipcList;
  public authData = [];
  evaluateIndex: any;
  internalFormatError: boolean = true;
  imfAliasValue = null;
  public conditionError = true;
  conditionData: any;
  submit: boolean = false;
  old_MapperList: any = null;

  constructor(
    private _service: MainService,
    private drawerService: NzDrawerService,
    private _l1AdapterService: L1AdapterService,
  ) {
    this.authData = [];

    this.subscriptions.push(
      this._service.getIPC().subscribe(item => {
        this.ipcList = item.data;
      }),
    );

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
          if (this.stepList) {
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

    if (this.conditionObj && this.conditionObj !== null) {
      this.result = JSON.parse(JSON.stringify(this.conditionObj));
      if (this.conditionObj) {
        this.conditionObj = JSON.parse(JSON.stringify(this.conditionObj));
      }
      this._transFrom(this.result);
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

  deleteCondition(item) {
    item.condition = null;
    this.conditionObj = null;
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

  collapseClick(item) {
    item.collapse = !item.collapse;
  }

  addSource(objectClone) {
    objectClone.listJoinSource.push({
      packagerField: this.sources.source,
      sourceType: 'imf',
      sourceImf: {
        useCase: null,
        text: null,
        service: null,
        type: null,
      },
      targetImf: null,
      ipc: 'APPROVED',
      condition: null,
      listValidationFunction: [],
      listFunction: [],
      customMapperList: null,
    });
    this.submit = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.jsonDataValue && changes.jsonDataValue.currentValue) {
      this.jsonDataValue = changes.jsonDataValue.currentValue;
      this.imfList = this.transformLogicNew(changes.jsonDataValue.currentValue.attributes);
      if (this.sources && this.sources.listJoinMapping && this.sources.listJoinMapping.length > 0) {
        this.editDataBinding();
      }
    }
    if (changes && changes.conditionDropDown && changes.conditionDropDown.currentValue) {
      changes.conditionDropDown.currentValue.map(item => {
        this.authData.push({ id: item.id, name: item.name });
      });
    }
  }

  ngOnInit(): void {
    if (!this.sources.hasOwnProperty('listJoinMapping')) {
      (this.joinSchema.packagerField = this.sources.source),
        (this.joinSchema.type = 'request'),
        (this.joinSchema.ipc = 'SYSTEM_ERROR'),
        (this.joinSchema.condition = null),
        (this.joinSchema.status = 'M'),
        (this.joinSchema.listValidationFunction = []),
        (this.joinSchema.listFunction = []),
        (this.joinSchema.customMapperList = null);
    }
  }

  editDataBinding() {
    this.sources.listJoinMapping.forEach(element => {
      let value_mapper = null;
      let listJoinSourceValueMapper = null;
      if (element.listFunction[0] === null) {
        element.listFunction = [];
      }
      if (element && element.listFunction && element.listFunction.length > 0) {
        let valueMapperIndex = element.listFunction.findIndex(x => x.type == 'value_mapper');
        value_mapper = element.listFunction[valueMapperIndex];
        this.old_MapperList = value_mapper;
        element.listFunction.splice(valueMapperIndex, 1);
      }

      let data = JSON.parse(JSON.stringify(this.imfList));
      (this.joinSchema.packagerField = this.sources.source),
        (this.joinSchema.imfField = element.imfField),
        (this.joinSchema.type = element.type),
        (this.joinSchema.ipc = element.ipc),
        (this.joinSchema.condition = element.condition),
        (this.joinSchema.status = element.status),
        (this.joinSchema.listValidationFunction = element.listValidationFunction),
        (this.joinSchema.listFunction = element.listFunction),
        (this.joinSchema.customMapperList = value_mapper);
      element.listJoinSource.forEach(items => {
        if (items.listFunction.length > 0) {
          let JoinSourceMapperIndex = items.listFunction.findIndex(x => x.type == 'value_mapper');
          listJoinSourceValueMapper = items.listFunction[JoinSourceMapperIndex];
          items.customMapperList = listJoinSourceValueMapper;
          items.listFunction.splice(JoinSourceMapperIndex, 1);
        }
        this.joinSchema.listJoinSource.push(items);
      });
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
    this.imfAliasValue = event.alias;
    this.submit = false;
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

  close() {
    if (this.old_MapperList) {
      this.joinSchema.listFunction.push(this.old_MapperList);
    }
    if (this.joinSchema.listJoinSource && this.joinSchema.listJoinSource.length > 0) {
      this.joinSchema.listJoinSource.forEach(element => {
        if (element.customMapperList) {
          element.listFunction.push(element.customMapperList);
        }
      });
    }

    this.oncancelJoin.emit(false);
  }

  public save(item) {
    this.onSubmit(item);
  }

  public pushEvaluateObjFunction() {
    if (this.joinSchema.customMapperList) {
      this.joinSchema.listFunction.push(this.joinSchema.customMapperList);
    }
    if (this.joinSchema.listJoinSource.length > 0) {
      this.joinSchema.listJoinSource.forEach((element, index) => {
        if (element.customMapperList) {
          element.listFunction.push(element.customMapperList);
        }
        delete element.customMapperList;
      });
    } else {
      this.joinSchema.listJoinSource.forEach((element, index) => {
        delete element.customMapperList;
      });
    }
    delete this.joinSchema.customMapperList;
  }

  public onSubmit(item: any): void {
    if (item.status == 'C' && !item.condition) {
      this.conditionError = false;
    }

    if (item.imfField.text == null || item.imfField.text == '') {
      this.submit = true;
    } else if (
      (item.imfField.service == null || item.imfField.service == '') &&
      (item.imfField.useCase == 2 || item.imfField.useCase == 3)
    ) {
      this.submit = true;
    } else if (
      (item.imfField.type == null || item.imfField.type == '') &&
      item.imfField.useCase == 3
    ) {
      this.submit = true;
    } else {
      this.submit = false;
    }

    if (item.listJoinSource && item.listJoinSource.length > 0) {
      for (let obj of item.listJoinSource) {
        if (obj.sourceType == 'imf') {
          if (obj.sourceImf.text == null || obj.sourceImf.text == '') {
            this.submit = true;
          } else if (
            (obj.sourceImf.service == null || obj.sourceImf.service == '') &&
            (obj.sourceImf.useCase == 2 || obj.sourceImf.useCase == 3)
          ) {
            this.submit = true;
          } else if (
            (obj.sourceImf.type == null || obj.sourceImf.type == '') &&
            obj.sourceImf.useCase == 3
          ) {
            this.submit = true;
          } else {
            this.submit = false;
          }
        } else {
          if (obj.sourceText == null || obj.sourceText == '') {
            this.submit = true;
          } else {
            this.submit = false;
          }
        }
      }
    } else {
      this.submit = true;
    }

    if (
      this.submit == false &&
      ((item.condition && item.status == 'C') || item.status == 'M' || item.status == 'O')
    ) {
      this.pushEvaluateObjFunction();
      this.saveJoin.emit(this.joinSchema);
    }
  }

  createPostValidation(item, index) {
    const drawerRef = this.drawerService.create<
      PostValidationComponent,
      {
        value: string;
        currentIndex;
        isVisiblePostValidation;
        listValidationFunction;
        sourceList;
        imfList;
        validationList;
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
      },
    });
    drawerRef.afterOpen.subscribe(() => {});
    drawerRef.afterClose.subscribe((event: any) => {
      if (event && event.action === 'save') {
        if (index == -1) {
          this.joinSchema.listValidationFunction = event.listValidationFunction;
        }
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
        currentIndex: index,
        readOnlyFlag: this.readOnlyFlag,
        lookupList: this.lookupList,
        getEvaluateObj: JSON.stringify(item.customMapperList),
      },
    });
    drawerRef.afterOpen.subscribe(() => {
      this.evaluateObj = item.listFunction.find(item => item.type === 'value_mapper');
    });

    drawerRef.afterClose.subscribe((event: any) => {
      this.evaluateIndex = event.currentIndex;
      if (event && event.action === 'save') {
        item.customMapperList = null;
        item.customMapperList = event.evaluateValue;
      } else {
        item.customMapperList = item.customMapperList;
      }
    });
  }

  removeSource(objectClone, index) {
    objectClone.listJoinSource.splice(index, 1);
  }

  public getRule(value) {
    if (value.condition) {
      this.conditionObj = JSON.parse(JSON.stringify(value.condition));
      if (this.currentIndex == -1) {
        this.joinSchema.condition = this.conditionObj;
      } else {
        this.joinSchema.listJoinSource[this.currentIndex].condition = this.conditionObj;
      }
      this.isVisible = false;
    }
  }

  createCondition(data, index) {
    this.isVisible = true;
    this.currentIndex = index;
    if (index === -1 && this.joinSchema.condition) {
      this.conditionObj = this.joinSchema.condition;
    } else if (index !== -1 && this.joinSchema.listJoinSource[this.currentIndex].condition) {
      this.conditionObj = this.joinSchema.listJoinSource[this.currentIndex].condition;
    } else {
      this.conditionObj = null;
    }
  }

  closeDrawer() {
    this.isVisible = false;
  }

  createStep(item, ind) {
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
        jsonData: this.jsonDataValue,
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

  saveResConditionalData(event: any) {
    if (this.conditionPosition === -1) {
      this.joinSchema.condition = event.condition;
    } else {
      this.joinSchema.listJoinSource[this.conditionPosition].condition = event.condition;
    }
    this.conditionObj = null;
    this.isVisible = false;
  }

  public addBlockStep(block) {
    block.push({ type: 'execute_function', name: 'Step', value: null, params: [] });
  }

  closeCondition() {
    this.isVisible = false;
    this.conditionObj = null;
  }

  onSourceTypeChange(event, item) {
    if (event === 'imf') {
      delete item.sourceText;
      delete item.targetText;
      item.sourceImf = {
        useCase: event.useCase,
        text: event.alias,
        service: '',
        type: '',
      };
    } else {
      delete item.sourceImf;
      delete item.targetImf;
      item.targetText = null;
      item.sourceText = null;
    }
    this.submit = false;
  }

  onSourceChange(event, item, type) {
    if (type === 'imf') {
      item.sourceImf = {
        useCase: event.useCase,
        text: event.name,
        service: '',
        type: '',
        alias: event.nestedName,
      };
    } else {
      item.sourceText = event;
    }
  }

  ngOnDestroy() {
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }
}
