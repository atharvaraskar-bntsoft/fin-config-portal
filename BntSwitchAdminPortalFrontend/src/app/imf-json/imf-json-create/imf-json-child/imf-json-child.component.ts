import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
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
import * as _ from 'underscore';
import { MatMenuTrigger } from '@angular/material/menu';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'json-tree-child',
  styleUrls: ['./imf-json-child.component.scss'],
  templateUrl: './imf-json-child.component.html',
})
export class ImfJsonChildComponent implements OnInit {
  @Input() json: any = {};
  @Input() editLevel?: any;
  @Input() collapsedLevel = 0;
  @Input() types = [];
  componetDestroyed = new Subject();
  public fieldtypes = ['field', 'fields', 'template'];
  public templateArray = [];
  public templatetype;
  public fieldtype;
  public valuetype;
  public inputKey;
  public addTpl: any;
  currentLang: string;
  @ViewChild(MatMenuTrigger, { static: true })
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  imfTableConfigFields; 
  /*
  {
    fieldTypes: this.fieldtypes,
    types: this.types,
    fieldtype: this.fieldtype,
    valuetype: this.valuetype,
    fieldChange: this.onChangefieldtype,
    templatetype: this.templatetype,
    inputKey: this.inputKey,
    isSensitive: false,
  };
  */
  public node = {
    /* check node is collapsed */
    isCollapsed: this.collapsedLevel && +this.collapsedLevel ? +this.collapsedLevel <= 0 : false,
    /* set up isCollapsed properties, by default - true */

    /* check editing level is high */
    isHighEditLevel: this.editLevel !== 'low',

    /* if childs[key] is dragging now, dragChildKey matches to key  */
    dragChildKey: null,

    /* used to get info such as coordinates (top, left, height, width, meanY) of draggable elements by key */
    dragElements: {},

    /* check current node is object or array */
    isObject: () => {
      return this.isObject(this.json);
    },

    /* get type for current node */
    type: () => {
      return this.getType(this.json);
    },

    isDisable: () => {
      return this.isObject(this.json);
    },

    /* calculate collection length for object or array */
    length: () => {
      return this.json instanceof Object ? Object.keys(this.json).length : 1;
    },
  };

  constructor(
    public subscribeService: SubscribeService,
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
   * on changes
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.fieldtype = this.fieldtypes[0];
    this.valuetype = this.types[0];
  }

  /**
   * Selected imf
   * @param $event
   */
  selectedIMF($event) {
    this.imfTableConfigFields = { ...this.imfTableConfigFields, ...this.json };
    this.addTpl = true;
    console.log('event is', $event);
  }

  /**
   * on init
   */
  ngOnInit() {}

  /**
   * Keys imf json child component
   * @param obj
   * @returns
   */
  keys(obj) {
    return obj instanceof Object ? Object.keys(obj) : [];
  }

  /**
   * Clicks node
   * @param node
   */
  clickNode(node): void {
    node.isCollapsed = !node.isCollapsed;
  }

  /**
   * Checks disable
   * @param json
   * @returns true if disable
   */
  checkDisable(json): boolean {
    return json['isEditable'] === true ? false : true;
  }

  /**
   * Gets type
   * @param val
   * @returns
   */
  getType(val) {
    if (val === null) {
      return 'null';
    } else if (val === undefined) {
      return 'undefined';
    } else if (val.constructor === Array) {
      return 'array';
    } else if (val.constructor === Object) {
      return 'object';
    } else if (val.constructor === String) {
      return 'string';
    } else if (val.constructor === Number) {
      return 'number';
    } else if (val.constructor === Boolean) {
      return 'boolean';
    } else if (val.constructor === Function) {
      return 'function';
    } else {
      return 'object';
    }
  }

  /**
   * Adds node
   * @param fieldtype
   * @param type
   * @param key
   */
  addNode(fieldtype, type, key): void {
    let value;
    const json = null;
    if (fieldtype === 'fields') {
      value = {
        type: 'fields',
        name: key,
        attributes: [],
        isEditable: true,
      };
    } else if (fieldtype === 'field') {
      value = {
        type: 'field',
        fieldName: key,
        fieldType: type,
        isSensitive: false,
        isHide: false,
        isPersist: false,
        alias: '',
        isEditable: true,
      };
    } else if (fieldtype === 'template') {
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectTemplateDetailsJson))
        .subscribe((response: any) => {
          if (response && response.data) {
            // tslint:disable-next-line: no-shadowed-variable
            const data = response.data.template;
            value = JSON.parse(data);
          }
        });
      // const data = this.templateData.find(item => item.Key === key);
      // value = data.value;
    }
    /* add element to the object */
    if (type === 'array' || true) {
      if (json !== null) {
        if (json.constructor === Array) {
          /* push new array elements to the array */
          this.json.push.apply(this.json, json);
        } else {
          /* push single element to the array */
          this.json.push(json);
        }
      } else {
        if (this.node.type() === 'object') {
          this.json.attributes.push(value);
        } else {
          this.json.push(value);
        }
      }
    }
  }

  /**
   * Resets node
   * @param key
   */
  resetNode(key): void {
    this.json[key] = null;
  }

  /**
   * Determines whether object is
   * @param value
   * @returns
   */
  isObject(value) {
    return this.getType(value) === 'object';
  }

  /**
   * Determines whether last index is
   * @param node
   * @param index
   * @returns
   */
  isLastIndex(node, index) {
    if (node === undefined || node === null) {
      return true;
    } else {
      return index >= node.length();
    }
  }

  /**
   * Removes node
   * @param key
   */
  removeNode(key) {
    // if (this.node.type() === 'object') {
    //   delete this.json[key];
    // } else if (this.node.type() === 'array') {
    //   this.json.splice(key, 1);
    // }
    this.json = null;
    console.log('after deletion', this.json);
  }

  /**
   * Inits imf json child component
   * @param key
   */
  init(key): void {
    if (this.json[key] !== null) {
      this.json[key] = this.json[key].toString().trim();
    }
  }

  /**
   * Changes key
   */
  changeKey(): void {
    if (this.templatetype) {
      const data = this.templateArray.find(item => item.id === parseInt(this.templatetype));
      this.inputKey = data.name;
      this._store.dispatch(new GetTemplateDetailsJson(data.id));
    }
  }

  /**
   * Lengths imf json child component
   * @returns
   */
  length() {
    return this.json instanceof Object ? Object.keys(this.json).length : 1;
  }

  /**
   * Adds field
   * @param item
   */
  addField(item) {
    console.log('item', this.json);
  }

  /**
   * Adds nested field
   * @param item
   */
  addNestedField(item) {
    this.addTpl = true;
    this.inputKey = null;
  }

  /**
   * Determines whether context menu on
   * @param event
   * @param item
   * @param index
   */
  onContextMenu(event: MouseEvent, item, index) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  /**
   * Fields type change
   * @param $event
   */
  fieldTypeChange($event) {
    this.fieldtype = $event;
    this.onChangefieldtype();
  }

  /**
   * Determines whether imfsubmitted is
   * @param $event
   * @returns
   */
  isIMFSubmitted($event) {
    if ($event === 'cancel') {
      this.addTpl = false;
      return;
    } else if ($event === 'delete') {
      this.addTpl = false;
      // delete the current node;
      this.removeNode('');
      return;
    }
    // else submit the form
    const { fieldtype, valuetype, inputKey } = this.imfTableConfigFields;
    this.addTpl = false;
    this.addNode(fieldtype, valuetype, inputKey);
  }

  /**
   * Determines whether changefieldtype on
   */
  onChangefieldtype(): void {
    this.inputKey = '';
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
    }
  }
}
