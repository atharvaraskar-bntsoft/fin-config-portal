import { Subscription, Subject } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { SubscribeService, IMFTableButtonActions } from '@app/services/subscribe.services';
import { AlertService } from '@app/services/alert.service';
import { takeUntil } from 'rxjs/operators';

interface IFields {
  type: string;
  name: string;
  attributes?: [];
  isEditable: boolean;
}

interface IField {
  type: string;
  fieldName: string;
  fieldType: string;
  isSensitive: boolean;
  isHide: boolean;
  isPersist: boolean;
  alias: string;
  isEditable: boolean;
  pattern: string;
}

@Component({
  selector: 'app-imf-creation-table',
  templateUrl: './imf-creation-table.component.html',
  styleUrls: ['./imf-creation-table.component.scss'],
})
export class ImfCreationTableComponent implements OnInit, OnDestroy {
  private buttonActions = {
    save: IMFTableButtonActions.SUBMIT,
    cancel: IMFTableButtonActions.CANCEL,
    delete: IMFTableButtonActions.DELETE,
  };
  public visibleAnimate = false;
  public visible = false;
  @Input() fieldValue;
  @Input() types;
  @Input() templateArray: any[];
  @Input() node: object;
  @Input() readOnlyFlag = false;
  componetDestroyed = new Subject();
  @Output() fieldTypeChange = new EventEmitter<any>();
  public fieldTypes = ['field', 'fields', 'template'];
  public TypesfieldsList = [{ label: 'LIST', value: 'LIST' }, { label: 'OBJECT', value: 'SIMPLE' }];
  subscription: Subscription;
  isTableVisible: boolean = false;
  isSaveEnable: boolean;
  imfPattern: string =
    '1.Masking all chars except first & last 3 characters : (?<=\\w{3}).(?=[^.]*?\\w{3}) \n 2. Masking all chars except first 3 characters : (?<=\\w{3}).(?=[^.]*?\\w{0})\n 3.Masking all chars except last 3 characters : (?<=\\w{0}).(?=[^.]*?\\w{3})';

  public imfObj = {
    fieldType: null,
    fieldName: null,
    isPersist: false,
    isEditable: true,
    isHide: false,
    isSensitive: false,
    inputKey: '',
    type: '',
    alias: '',
    pattern: null,
    name: '',
    attributes: [],
    expandable: false,
    fieldsType: '',
    isInvalid: true
  };

  mandatoryProperties = {
    alias: false,
    fieldName: false,
    name: false,
    fieldType: false,
  };

  /**
   * Creates an instance of imf creation table component.
   * @param alertService
   * @param subscribeService
   */
  constructor(private alertService: AlertService, private subscribeService: SubscribeService) {
    // Commenting this after the defect BNTSW-3411
    // if (this.types) {
    //   this.imfObj.fieldType = this.types[0];
    // }
  }

  /**
   * on init
   */
  ngOnInit() {
    this.subscription = this.subscribeService
      .getSelectedIMF()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(res => {
      if (res && res.name  && res.name !=='incomingPackager' && res.name !=='outgoingPackager' && res.type !== '') {
          this.resetIMFObj();
          setTimeout(() => {
          this.isTableVisible = true;
            this.imfObj = { ...this.imfObj, ...res };
            this.isFormValid();
          }, 0);
      } if(res && !res.name && res.type !== ''){
          this.resetIMFObj();
          setTimeout(() => {
            this.isTableVisible = true;
            this.imfObj = { ...this.imfObj, ...res };
            this.isFormValid();
          }, 0);
      } else {
        this.isTableVisible = false;
        }
      });
  }

  /**
   * Determines whether form valid is
   */
  public isFormValid(): void {
    const { alias, fieldName, name, type, fieldType } = this.imfObj;
    this.mandatoryProperties.alias = alias && alias.length > 0;
    this.mandatoryProperties.fieldName = fieldName && fieldName.length > 0;
    this.mandatoryProperties.name = name && name.length > 0;
    this.mandatoryProperties.fieldType = fieldType && fieldType.trim().length > 0;
    if (
      (type === 'field' &&
        this.mandatoryProperties.fieldName &&
        this.mandatoryProperties.fieldType) ||
      (type === 'fields' && this.mandatoryProperties.name)
    ) {
      this.isSaveEnable = true;
    } else {
      this.isSaveEnable = false;
    }
  }

  /**
   * Submits imf
   * @param value
   */
  public submitIMF(value): void {
    var checkText = true;
    if (this.imfObj.type === 'fields') {
      delete this.imfObj.isHide;
      delete this.imfObj.pattern;
      delete this.imfObj.fieldName;
      delete this.imfObj.isPersist;
      delete this.imfObj.isSensitive;
      delete this.imfObj.fieldType;
      delete this.imfObj.alias;
      delete this.imfObj.inputKey;
      if(value === 'save'){
        checkText = this.checkAlphaWithUndernd(this.imfObj.name);
    }
    } else {
      delete this.imfObj.attributes;
      delete this.imfObj.fieldsType;
      this.imfObj.isPersist = true;
      delete this.imfObj.expandable;
      delete this.imfObj.inputKey;
      delete this.imfObj.name;
      if(value === 'save'){
        checkText = this.checkAlphaWithUndernd(this.imfObj.fieldName)
    }
    }
    this.imfObj.isInvalid = checkText;
    if(checkText){
    const fieldValues = {
      actions: this.buttonActions[value],
      payload: this.imfObj,
    };
    this.subscription.add(this.subscribeService.setButtonAction(fieldValues));
    this.isTableVisible = false;
    this.resetIMFObj();
    if (value === 'delete') {
      this.cancel();
    }
   }else{
    this.alertService.responseMessage({
        status: 'failure',
        message: 'Invaild Field Name',
      });
    }

  }


  public checkAlphaWithUndernd(text) {
    const regex = /^[A-Za-z_]+$/;
    return regex.test(text);
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    this.subscribeService.updateSelectedIMF(null);
    this.resetIMFObj();
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.subscription.unsubscribe();
    this.componetDestroyed.unsubscribe();
  }

  /**
   * Opens delete dialog
   */
  public openDeleteDialog() {
    this.open();
  }

  /**
   * Opens imf creation table component
   */
  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }

  /**
   * Cancels imf creation table component
   */
  public cancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  /**
   * Reset imfobj of imf creation table component
   */
  private resetIMFObj = () => {
    this.imfObj = {
      alias: '',
      fieldName: '',
      fieldType: null,
      inputKey: '',
      isEditable: true,
      isHide: false,
      isPersist: false,
      isSensitive: false,
      name: '',
      pattern: null,
      type: '',
      attributes: [],
      expandable: false,
      fieldsType: 'SIMPLE',
      isInvalid: true

    };
    this.isTableVisible = false;
  };
}
