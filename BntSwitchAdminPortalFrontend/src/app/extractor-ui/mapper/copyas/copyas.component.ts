import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MainService } from '../main.service';
import { removeListeners, removeSubscriptions } from '../helpers';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { PostValidationComponent } from '../post-validation/post-validation.component';

@Component({
  selector: 'app-copyas',
  templateUrl: './copyas.component.html',
  styleUrls: ['./copyas.component.css'],
})
export class CopyasComponent implements OnInit, OnChanges {
  radioValue = 'M';
  options = [
    { label: 'Mandatory', value: 'M' },
    { label: 'Optional', value: 'O' },
    { label: 'Conditional', value: 'C' },
  ];
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: {
      value: string;
      currentIndex: boolean;
      isVisiblePostValidation: any;
      listValidationFunction: any;
      sourceList: any;
      imfList: any;
      validationList: any;
    };
    drawerRef: NzDrawerRef<string>;
  }>;

  private subscriptions = []; // for memory leakage
  private listeners = [];
  public validationList = [];
  @Input() sourceList;
  @Input() serviceList: any = [];
  @Input() typeList: any = [];
  @Input() ipcList;
  @Input() networkService;
  @Input() isRequest;
  @Input() imfId;
  @Input() editMode;
  @Input() readOnlyFlag = false;
  @Input() public copyItem: any;
  @Input() sources: any;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() saveCopyAsIs: EventEmitter<any> = new EventEmitter();
  public copyAsObject: any = {
    field: null,
    listMappingCopyAsIs: {
      parentField: null,
      packagerField: null,
      imfField: {
        useCase: '',
        text: '',
        networkService: '',
        type: '',
      },
      type: null,
      ipc: 'SYSTEM_ERROR',
      condition: null,
      status: 'M',
      listValidationFunction: [],
    },
  };
  public visible: any;
  public currentIndex: any;
  public currentInd: any;
  public paramIndex: any;
  responseData: any;
  public copyPostvalidation = [];
  public listMappingCopyAsIs: any = [];
  public imfList: any = [];
  public isVisible: boolean = false;
  public conditionalData;
  public jsonData;
  public ruleData: any;
  public ruleData2: any;
  public ruleDataOutput: any;
  public inputfields: Array<any> = [];
  public conditionObj: any;
  public editnode: any;
  public destinationsValues: any = '';
  public description: String = '';
  public name: String = '';
  public enabled = false;
  public selectdestinations: any = [];
  public result: any;
  public contextImf = [];
  public multiple = [];
  public noErrorFlag;
  public collapsed1: any;
  public outpustLabel: String;
  public isEditable: Boolean = false;
  public field: any = [];
  public authData = [];
  public imfValue;
  public ipcValue;
  public listValidationFunction = [];
  public isVisiblePostValidation: boolean = false;
  selectedLevel: any;
  public stepList = [];
  selectedIMFValue: [];
  imfToolTip: any;
  value: any;
  oldField: any;
  public imfAliasValue = null;
  @Input() conditionDropDown: Array<any> = [];
  public conditionData = null;
  public submit: any = false;

  constructor(private _service: MainService, private drawerService: NzDrawerService) {
    this.authData = [];

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
      this._service.getIPC().subscribe(item => {
        this.ipcList = item.data;
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.conditionDropDown && changes.conditionDropDown.currentValue) {
      this.jsonData = changes.conditionDropDown.currentValue;
      this.imfList = this.transformLogicNew(changes.conditionDropDown.currentValue.attributes);
      if (
        this.sources &&
        this.sources.listCopyAsIsMapping &&
        this.sources.listCopyAsIsMapping.length > 0
      ) {
        this.editDataBinding();
      }
    }
  }

  ngOnInit() {
    if (!this.sources.hasOwnProperty('listCopyAsIsMapping')) {
      let parentField = null;
      if (this.sources.hasOwnProperty('parentField')) {
        parentField = this.sources.parentField;
      }
      this.copyAsObject.listMappingCopyAsIs = {
        parentField: parentField,
        packagerField: this.sources.source,
        imfField: {
          useCase: '',
          text: '',
          networkService: '',
          type: '',
        },
        type: this.copyAsObject.tab,
        ipc: 'SYSTEM_ERROR',
        condition: null,
        status: 'M',
        listValidationFunction: [],
      };
    } else {
      this.selectedIMFValue = this.copyAsObject.listMappingCopyAsIs.imfField;
    }
  }

  editDataBinding() {
    let parentField = null;
    if (this.sources.hasOwnProperty('parentField')) {
      parentField = this.sources.parentField;
    }
    this.sources.listCopyAsIsMapping.forEach(element => {
      this.copyAsObject.listMappingCopyAsIs = {
        parentField: parentField,
        packagerField: this.sources.source,
        imfField: element.imfField,
        type: element.type,
        ipc: element.ipc,
        condition: element.condition,
        status: element.status,
        listValidationFunction: element.listValidationFunction,
      };
    });
  }

  deleteCondition(item) {
    item.condition = null;
    this.conditionObj = null;
  }

  close() {
    this.isVisible = false;
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

  changeStatus(item) {
    this.submit = false;
    if (item.status == 'C' && item.condition != null) {
      item.condition = null;
    }
  }

  public getRule(value) {
    if (value.condition) {
      this.conditionObj = JSON.parse(JSON.stringify(value.condition));
      this.copyAsObject.listMappingCopyAsIs.condition = JSON.parse(JSON.stringify(value.condition));
      this.isVisible = false;
    }
  }

  createCondition(obj) {
    this.isVisible = true;
    if (obj.condition) {
      this.conditionObj = obj.condition;
    }
  }

  createPostValidation(item) {
    const drawerRef = this.drawerService.create<
      PostValidationComponent,
      {
        value: string;
      },
      any
    >({
      nzWidth: '70%',
      nzTitle: 'Post Validation',
      nzContent: PostValidationComponent,
      nzMaskClosable: false,
      nzContentParams: {
        value: 'ng',
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

  public cancel() {
    this.visible = false;
    this.closeDrawer.emit(this.visible);
  }

  public onSubmit(item: any): void {
    if ((item.condition == null || item.condition == '') && item.status === 'C') {
      this.submit = true;
    } else if (item.imfField.text == null || item.imfField.text == '') {
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

    if (this.submit == false) {
      this.saveCopyAsIs.emit(this.copyAsObject);
    }
  }

  ngOnDestroy() {
    this.listeners = removeListeners(this.listeners);
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }
}
