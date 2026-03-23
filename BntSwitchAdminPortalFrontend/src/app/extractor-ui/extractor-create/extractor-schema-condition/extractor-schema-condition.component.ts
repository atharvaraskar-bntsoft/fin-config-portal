import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SchemaJsonComponent } from '@app/extractor-ui/schema-json/schema-json.component';
import { differenceInCalendarDays } from 'date-fns';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Utils } from 'src/utils';
import { getIfmList } from '@app/store/selectors/imf-json.selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetImfJsonView } from '@app/store/actions/imf-json.action';
import { ExtractorService } from '@app/services/extractor.service';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-extractor-schema-condition',
  templateUrl: './extractor-schema-condition.component.html',
  styleUrls: ['./extractor-schema-condition.component.css'],
})
export class ExtractorSchemaConditionComponent implements OnInit {
  @Output() schemaForm = new EventEmitter<any>();
  @Input() initialJson: any;
  @Input() templateValueList: any;
  public isVisible = false;
  public submitForm: UntypedFormGroup = null;
  public adapterData: any;
  public jsonPayload: any;
  @Input() name: any;
  @Input() public readOnlyFlag = false;
  @Output() public changeTemplate: EventEmitter<Object> = new EventEmitter<Object>();
  public getIfmList: any = [];
  private subscriptions = []; // for memory leakage
  public componetDestroyed = new Subject();
  public disable: boolean = false;
  public cronRegex =
    /(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})[? *\w#-]+/;
  today = new Date();
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) > 0;
  public mode = [
    {
      id: 1,
      name: 'REAL',
    },
    {
      id: 2,
      name: 'TIME',
    },
  ];
  public reader = [
    {
      id: 1,
      name: 'DBReader',
    },
  ];
  conditionObj: any;
  condition: any;
  confirmModal?: NzModalRef;
  imfList: any;
  getImf: any;
  jsonData: any;

  constructor(
    private fb: UntypedFormBuilder,
    private drawerService: NzDrawerService,
    private alertService: AlertService,
    private _store: Store<IAppState>,
    private modal: NzModalService,
    private extractorService: ExtractorService,
  ) {
    this._store.dispatch(new GetImfJsonView());

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(getIfmList))
      .subscribe((response: any) => {
        if (response) {
          let IfmList = response.data.imfStructureList;
          IfmList = IfmList.filter(item => item.version !== 0);
          if (this.getIfmList.length === 0) {
            if (IfmList && IfmList.length > 2) {
              this.getIfmList.push(IfmList[0]);
              this.getIfmList.push(IfmList[1]);
            } else {
              this.getIfmList = IfmList;
            }
            this.getIfmList = this.getIfmList.map(item => {
              return {
                id: item.id,
                name: item.name,
                version: item.version,
              };
            });
          }
        }
      });
  }

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      readFrom: null,
      batchMode: null,
      readIndex: null,
      batchSize: null,
      type: null,
      class: null,
      cronExp: null,
      repeatTime: null,
      filterCondition: null,
      packager: null,
      imfId: null,
    });
  }

  private transformLogicNew(data) {
    return data.map(item => {
      const payload: any = {};
      if (!item.attributes) {
        payload.title = item.alias;
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

  public getImfVersion(eventData: any) {
    this.submitForm.get('filterCondition').patchValue(null);
    this.conditionObj = null;
    const imfId = this.getIfmList.find(item => {
      if (eventData == item.version) {
        return item.id;
      }
    });
    this.getImfData(imfId.id);
  }

  getImfData(imfId) {
    if (imfId) {
      this.subscriptions.push(
        this.extractorService.getMessageContextList(imfId).subscribe(item => {
          this.jsonData = item.data.messageContextFieldsByVersion;
        }),
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialJson) {
      this.getImfData(this.initialJson.details.imfId.id); // imfId pass
      this.submitForm = this.fb.group({
        readFrom: [this.initialJson?.details?.etlJson?.reader?.readFrom, [Validators.required]],
        batchMode: [this.initialJson?.details?.batchMode, [Validators.required]],
        readIndex: [this.initialJson?.details?.etlJson?.reader?.readIndex, [Validators.required]],
        batchSize: [this.initialJson?.details?.batchSize, [Validators.required]],
        type: [this.initialJson?.details?.etlJson?.reader?.type, [Validators.required]],
        class: [this.initialJson?.details?.jobClass, [Validators.required]],
        cronExp: [
          this.initialJson?.details?.cronExp,
          [Validators.required, Validators.pattern(this.cronRegex)],
        ],
        repeatTime: [this.initialJson?.details?.repeatTime, [Validators.required]],
        filterCondition: [
          this.initialJson?.details?.etlJson?.reader?.filterCondition,
          Validators.required,
        ],
        packager: [this.initialJson.details?.packager, Validators.required],
        imfId: [this.initialJson.details?.imfId?.version, Validators.required],
      });
    }
    if (this.initialJson.id) {
      this.disable = true;
    }
  }

  get f() {
    return this.submitForm.controls;
  }

  public onSubmit(value: any): void {
    if (this.submitForm.value.class !== null) {
      this.submitForm.value.class = this.submitForm.value.class.replace(/<[^>]*>/g, '');
    }
    this.validationCheck(this.submitForm.value);
    if (this.submitForm.valid) {
      value.imfId = this.getIfmList.find(item => {
        if (value.imfId == item.version) {
          const data: any = {};
          data.id = item.id;
          data.name = item.name;
          data.version = item.version;
          return data;
        }
      });
      this.schemaForm.emit(value);
    }
  }

  public validationCheck(value) {
    if (
      (value.readFrom &&
        value.batchMode &&
        value.readIndex &&
        value.batchSize &&
        value.type &&
        value.class &&
        value.cronExp &&
        value.repeatTime &&
        value.filterCondition &&
        value.packager &&
        value.imfId) === null
    ) {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please Enter All Mandatory Fields',
      });
    }
  }

  private transformLogic(data) {
    return data.map(item => {
      if (!item.attributes) {
        item.title = item.alias;
        item.key = item.nestedName;
        item.isLeaf = true;
      } else {
        item.title = item.name;
        item.key = item.nestedName;
        if (item.useCase !== '3') {
          item.disabled = true;
        }
      }
      if (item.attributes) {
        item.children = this.transformLogic(item.attributes);
      }
      return item;
    });
  }

  openCondition() {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

  public getRule(value: any) {
    if (value.condition) {
      this.conditionObj = JSON.parse(JSON.stringify(value.condition));
      this.condition = JSON.parse(JSON.stringify(value.condition));
      this.submitForm.patchValue({
        filterCondition: this.conditionObj,
      });
      this.isVisible = false;
      this.submitForm.patchValue({
        filterCondition: this.conditionObj,
      });
    }
  }

  deleteCondition() {
    this.conditionObj = null;
    this.submitForm.patchValue({
      filterCondition: this.conditionObj,
    });
  }

  deleteSchema() {
    this.confirmModal = this.modal.confirm({
      nzTitle: Utils.deleteWarning('Schema'),
      nzOnOk: () => {
        this.jsonPayload = null;
        this.submitForm.patchValue({
          packager: this.jsonPayload,
        });
      },
    });
  }

  createSchemaJson() {
    let tabIndex = 0;
    let isEdit = false;
    if (this.initialJson.details.packager) {
      tabIndex = 1;
      isEdit = true;
    }
    const drawerRef = this.drawerService.create<
      SchemaJsonComponent,
      {
        value: string;
      },
      any
    >({
      nzWidth: '80%',
      nzTitle: 'Json Payload',
      nzContent: SchemaJsonComponent,
      nzMaskClosable: false,
      nzContentParams: {
        isEdit: isEdit,
        tabIndex: tabIndex,
        initialJson: this.initialJson,
        jsonPayLoad: this.initialJson.details.packager,
        readOnlyFlag: this.readOnlyFlag,
      },
    });
    drawerRef.afterOpen.subscribe(() => {});
    drawerRef.afterClose.subscribe((event: any) => {
      if (event && event.action === 'save') {
        this.jsonPayload = event.jsonPayload;
        this.initialJson.details.packager = event.jsonPayload;
        this.submitForm.patchValue({
          packager: this.jsonPayload,
        });
      }
    });
  }
}
