import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'l3-set-constant-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class L3SetConstantResponseComponent implements OnInit {
  @Input() mappings;
  @Input() selectedTransactionType;
  @Input() showReqEnrichVisible;
  @Input() adapterData;
  @Input() jsonData;
  @Input() readOnlyFlag = false;
  @Input() queryObjDropDown;
  @Input() enrichModelObject: any;
  @Input() enrichfields;
  @Input() isDataEnrichmentScreenVisible = false;
  @Input() entityMappingList;
  @Output() public closePopup = new EventEmitter<any>();
  @Input() entityList;
  public aphaNumeric = new RegExp('^[A-Za-z0-9s]+$');
  public valueValidError = false;
  public queryObjDropDownModel;
  public dataEnrichmentScreenError = false;
  public entitywhereName;
  public entityColumn = [];

  ngOnInit() {
    this.addEntityFn();
   }

  open(): void {
    this.isDataEnrichmentScreenVisible = true;
  }

  close(){
    this.isDataEnrichmentScreenVisible = false;
  }

  public changeImfDestination(data, event) {
    if (event) {
      data.resImfValue = event.split('%')[0];
      data.useCase = event.split('%')[1];
    } else {
      data.resImfValue = null;
      data.useCase = null;
    }
  }

  public valueValidation(data) {
    if (this.aphaNumeric.test(data)) {
      this.valueValidError = false;
    } else {
      this.valueValidError = true;
    }
  }

  public selectConfigFn(value) {
    this.enrichModelObject = value.value;
  }

  public changeDestination(data, event) {
    data.destination = event;
    if (event) {
      data.resImfValue = event.split('%')[0];
      data.useCase = event.split('%')[1];
    } else {
      data.resImfValue = null;
      data.useCase = null;
    }
  }

  public pushrepeatImfList(item) {
    item.fields.push({
      destination: null,
      ipc: 'SYSTEM_ERROR',
      source: null,
      type: 'field',
    });
    item.lookupType.query.select.columns.push({
      alias: { type: 'alias', name: null, alias: null },
      type: 'aliasColumn',
    });
  }

  public saveDataModal() {
    this.checkConfigError();
    if (this.dataEnrichmentScreenError == false) {
      this.closePopup.emit({
        queryObjDropDown: this.queryObjDropDown,
        mappings: this.mappings,
        enrichfields: this.enrichfields,
        close: true,
        save: true,
      });
    }
  }

  public pullConstItem(index) {
    this.mappings.splice(index, 1);
  }

  public pushConstItem() {
    this.mappings.push({ type: 'field', source: null, destination: null, ipc: '',condition : null });
  }
  public pullWhereConditions(index) {
    this.enrichModelObject.lookupType.query.condition.conditions.splice(index, 1);
  }
  public selectWhereField(element, event) {
    element.value = event;
    element.fieldName = this.entitywhereName;
  }

  public entityMapChange(item): void {
    // reset field if change entity
    item.fields = [];
    // this.entitywhereList = [];
    // get entity column list
    const data = this.entityList[item.lookupType.query.from.mapName];
    this.entityColumn = data.filter(x => x.indexOf('(where)') === -1);
    if (this.entityColumn.length !== 0) {
      item.fields.push({
        destination: null,
        ipc: 'SYSTEM_ERROR',
        source: null,
        type: 'field',
      });
    }
    const wheredata = data.filter(x => x.indexOf('(where)') !== -1);
    wheredata.forEach(item1 => {
      this.entitywhereName = item1.split('(where)')[0];
    });
  }

  public clearEnrichModel() {
    this.enrichModelObject = {
      fields: [],
      ipc: 'SYSTEM_ERROR',
      lookupType: {
        query: {
          from: { mapName: null, type: 'from' },
          select: {
            columns: [
              {
                alias: { type: 'alias', name: null, alias: null },
                type: 'aliasColumn',
              },
            ],
            type: 'select',
          },
          type: 'search',
          condition: {
            conditions: [{ fieldName: null, type: 'equal', value: null }],
            type: 'and',
          },
        },
        type: 'imdg_enrich',
      },
      type: 'imdg_enrich',
    };
  }

  public removeEntityFn(value, i): void {
    this.queryObjDropDown.splice(i, 1);
    if (JSON.stringify(value.value) === JSON.stringify(this.enrichModelObject)) {
      this.clearEnrichModel();
    }
  }

  public removeEntityItem() {
    this.enrichModelObject = undefined;
  }

  public checkConfigError() {
    if (this.enrichfields === 'configuration') {
      this.dataEnrichmentScreenError = false;
      if (this.enrichModelObject) {
        if (!this.enrichModelObject.lookupType.query.from.mapName) {
          this.dataEnrichmentScreenError = true;
        } else {
          this.dataEnrichmentScreenError = false;
        }
        this.enrichModelObject.fields.map(field => {
          if (!field.destination.trim() || !field.source.trim()) {
            this.dataEnrichmentScreenError = true;
          } else {
            this.dataEnrichmentScreenError = false;
          }
          return field;
        });
        this.enrichModelObject.lookupType.query.condition.conditions.map(condition => {
          if (!condition.fieldName || !condition.value) {
            this.dataEnrichmentScreenError = true;
          } else {
            this.dataEnrichmentScreenError = false;
          }
          return condition;
        });
      }
    } else {
      this.mappings.map(item => {
        if (!item.source.trim() || !item.destination.trim()) {
          this.dataEnrichmentScreenError = true;
        } else {
          this.dataEnrichmentScreenError = false;
        }
        return item;
      });
    }
  }

  public addEntityFn(): void {
    this.dataEnrichmentScreenError = false;
    if (this.enrichModelObject) {
      this.checkConfigError();
      if (!this.dataEnrichmentScreenError) {
        const data = this.queryObjDropDown.find(
          field => field && JSON.stringify(field.value) === JSON.stringify(this.enrichModelObject),
        );
        if (!data) {
          this.queryObjDropDown.push({
            id: this.queryObjDropDown.length,
            name: this.enrichModelObject.lookupType.query.from.mapName,
            value: this.enrichModelObject,
          });
        }
        this.clearEnrichModel();
      }
    } else {
      this.clearEnrichModel();
    }
  }

  public closeReqConstant() {
    this.closePopup.emit({
      queryObjDropDown: this.queryObjDropDown,
      mappings: this.mappings,
      enrichfields: this.enrichfields,
      close: true,
      save: false,
    });
  }

  public enrichChangeFn() {
    this.dataEnrichmentScreenError = false;
  }

  public pushWhereConditions() {
    const obj = {
      fieldName: null,
      type: 'equal',
      value: null,
    };
    this.enrichModelObject.lookupType.query.condition.conditions.push(obj);
  }

  public pullrepeatImfList(item, index) {
    item.fields.splice(index, 1);
  }

  addCondition(row) {
    row.isVisible = true;
  }

  public saveReqCondition(value, row) {
    row.condition = JSON.parse(JSON.stringify(value.condition));
    row.isVisible = false;
    delete row.isVisible;
  }

  public cancel(row) {
    row.isVisible = false;
    delete row.isVisible;
  }

  public removeCondition(row) {
    row.condition = null;
  }


}
