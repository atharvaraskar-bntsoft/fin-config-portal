import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubscribeService } from '@app/services/subscribe.services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import {
  selectTemplateJson,
  selectTemplateDetailsJson,
} from '../../../store/selectors/imf-json.selector';
import { GetTemplateJson, GetTemplateDetailsJson } from '../../../store/actions/imf-json.action';
import { takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { ImfJsonService } from '../../../services/imf-json.service';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-display-details',
  styleUrls: ['./display-details.component.css'],
  templateUrl: './display-details.component.html',
})
export class DisplayDetailsComponent implements OnInit {
  @Input() fieldData;
  @Input() dataTypeList;
  @Input() deleteid;
  public fieldtype;
  componetDestroyed = new Subject();
  @Output() public showFieldPopup = new EventEmitter<boolean>();
  public fieldTypeList = ['field', 'fields', 'template'];
  public templateArray = [];
  public templatetype;
  public valuetype;
  public inputKey;
  public addData = false;
  public editData = false;
  public currentLang: string;
  @Input() JsonData;

  /**
   * Creates an instance of display details component.
   * @param subscribeService
   * @param _ImfJsonService
   * @param _store
   * @param translate
   */
  constructor(
    public subscribeService: SubscribeService,
    private _ImfJsonService: ImfJsonService,
    private _store: Store<IAppState>,
    private translate: TranslateService,
  ) {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
  }

  /**
   * on init
   */
  ngOnInit() {
    debugger
    if (this.fieldData) {
      this.editData = true;
    } else {
      this.addData = true;
    }
    // this._ImfJsonService.currentData.subscribe(data => {
    //  this.JsonData = data;
    // });
  }

  /**
   * Determines whether changefieldtype on
   */
  onChangefieldtype(): void {
    debugger
    this.inputKey = null;
    if (this.fieldtype === 'template' && this.templateArray.length === 0) {
      this._store.dispatch(new GetTemplateJson());
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectTemplateJson))
        .subscribe((response: any) => {
          if (response && response.data) {
            this.templateArray = response.data;
            this.templatetype = this.templateArray[0];
          }
        });
    } else if (this.fieldtype === 'fields') {
      this.fieldData = {
        attributes: [],
        isEditable: true,
        name: null,
        type: 'fields',
      };
    } else {
      this.fieldData = {
        alias: '',
        fieldName: null,
        fieldType: null,
        isEditable: true,
        isHide: false,
        isPersist: false,
        isSensitive: false,
        type: 'field',
      };
    }
  }

  /**
   * Adds node
   */
  addNode(): void {
    debugger
    let value = this.fieldData;
    if (this.fieldtype === 'template') {
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectTemplateDetailsJson))
        .subscribe((response: any) => {
          if (response && response.data) {
            // tslint:disable-next-line: no-shadowed-variable
            const data = response.data.template;
            value = JSON.parse(data);
          }
        });
    }
    this.JsonData[this.deleteid].attributes.push(value);
    this.showFieldPopup.emit(false);
  }

  /**
   * Changes key
   */
  changeKey(): void {
    debugger
    if (this.templatetype) {
      const data = this.templateArray.find(item => item.id === parseInt(this.templatetype));
      this.inputKey = data.name;
      this._store.dispatch(new GetTemplateDetailsJson(data.id));
    }
  }

  /**
   * Cancels display details component
   */
  cancel() {
    this.showFieldPopup.emit(false);
  }

  /**
   * Deletes node
   */
  deleteNode() {
    debugger
    if (this.JsonData[0].name === 'message') {
      this.JsonData[0].attributes.splice(this.deleteid, 1);
    } else {
      this.JsonData.splice(this.deleteid, 1);
    }
    this.showFieldPopup.emit(false);
  }

  /**
   * Saves node
   */
  saveNode() {
    debugger
    if (this.JsonData[0].name === 'message') {
      this.JsonData[0].attributes[this.deleteid] = this.fieldData;
    } else {
      this.JsonData[this.deleteid] = this.fieldData;
      this.showFieldPopup.emit(false);
    }
  }
}
