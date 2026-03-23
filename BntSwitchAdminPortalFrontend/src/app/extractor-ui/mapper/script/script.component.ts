import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SubscribeService } from '@app/services/subscribe.services';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.css'],
})
export class ScriptComponent implements OnInit {
  @Input() conditionDropDown: Array<any> = [];
  authData = [];
  public visible: any;
  @Input() scriptItem;
  @Input() sources: any;
  currentIndex: any;
  field;
  public scriptText;
  public scriptError = false;
  public conditionalData;
  public jsonData;
  public ruleData: any;
  public ruleData2: any;
  public ruleDataOutput: any;
  public inputfields: Array<any> = [];
  public conditionObj: any;
  public outpustLabel: String;
  public isEditable: Boolean = false;
  public result: any;
  public editnode: any;
  public destinationsValues: any = '';
  public description: String = '';
  public name: String = '';
  public enabled = false;
  public selectdestinations: any = [];
  public multiple = [];
  public isVisible: boolean = false;
  public conditionError = true;

  @Output() public oncancel = new EventEmitter<boolean>();
  @Output() public scriptData = new EventEmitter<Object>();
  @Output() closeScript = new EventEmitter<boolean>();
  @Output() saveScriptData = new EventEmitter<boolean>();

  @Input() main: any;

  public scriptObject: any = {
    listScriptMapping: {
      type: null,
      packagerField: null,
      status: null,
      condition: null,
    },
  };

  constructor(private subscribeService: SubscribeService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.conditionDropDown && changes.conditionDropDown.currentValue) {
      this.jsonData = changes.conditionDropDown.currentValue;
    }

    if (this.sources && this.sources.listScriptMapping) {
      this.editScript(this.sources.listScriptMapping);
    }
  }

  ngOnInit() {
    if (!this.sources.hasOwnProperty('listScriptMapping')) {
      (this.scriptObject.listScriptMapping.packagerField = this.sources.source),
        (this.scriptObject.listScriptMapping.condition = null),
        (this.scriptObject.listScriptMapping.status = 'M'),
        (this.scriptObject.listScriptMapping.type = 'groovy_executor'),
        (this.scriptObject.listScriptMapping.script = null);
    }
  }

  onChange(text) {
    this.scriptText = text;
    this.scriptObject.listScriptMapping.script = this.scriptText;
    this.scriptError = false;
  }

  editScript(data) {
    this.scriptObject.listScriptMapping = this.sources.listScriptMapping;
  }

  conditionNull(item, event) {
    if (event != 'C') {
      item.condition = null;
    }
  }

  deleteCondition(item) {
    item.condition = null;
  }

  close() {
    this.isVisible = false;
  }

  createCondition(item, index) {
    this.isVisible = true;
    this.currentIndex = index;
    if (item.listScriptMapping.condition) {
      this.conditionObj = item.listScriptMapping.condition;
    } else {
      this.conditionObj = null;
    }
  }

  public getRule(value) {
    if (value.condition) {
      this.conditionObj = JSON.parse(JSON.stringify(value.condition));
      this.scriptObject.listScriptMapping.condition = JSON.parse(JSON.stringify(value.condition));
      this.isVisible = false;
    }
  }

  public saveScript(item: any) {
    if (item.status == 'C' && !item.condition) {
      this.conditionError = false;
    }

    if (item.script == null || item.script == '') {
      this.scriptError = true;
    }

    if (
      this.scriptError == false &&
      ((item.status == 'C' && item.condition) || item.status == 'M' || item.status == 'O')
    ) {
      this.saveScriptData.emit(this.scriptObject);
    }
    this.subscribeService.setServiceType(true);
  }

  public cancel() {
    this.closeScript.emit(false);
  }
}
