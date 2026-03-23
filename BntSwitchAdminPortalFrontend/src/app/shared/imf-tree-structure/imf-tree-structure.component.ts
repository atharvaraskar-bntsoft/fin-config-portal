import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectMessageContextList } from '../../store/selectors/l1-adapter.selectors';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';

@Component({
  selector: 'app-imf-tree-structure',
  templateUrl: './imf-tree-structure.component.html',
  styleUrls: ['./imf-tree-structure.component.scss'],
})
export class IMFTreeStructureComponent implements OnInit {
  public imfList = [];
  @Input() imfId = 0;
  @Input() index;
  @Input() disabled = false;
  @Input() imfValue;
  @Input() isMapper = false;
  @Input() isRequest = false;
  @Input() networkService = false;
  @Input() readOnlyFlag = false;
  @Input() style = 'width: 280px';
  @Input() className;
  public selectedIMFValue;
  public imfToolTip;
  @Input() placeHolder = 'Select IMF';
  @Output() public emitIMFValue: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private _store: Store<IAppState>) {

    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.imfList = this.transformLogicNew(
          response.data.messageContextFieldsByVersion.attributes,
        );
        if (this.imfValue) {
          const data = JSON.parse(JSON.stringify(this.imfValue));
          this.getImfName(data);
        }
      }
    });
  }

  ngOnChanges() {
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.imfList = this.transformLogicNew(
          response.data.messageContextFieldsByVersion.attributes,
        );
        if (this.imfValue) {
          const data = JSON.parse(JSON.stringify(this.imfValue));
          this.getImfName(data);
        }
      }
    });
  }

  public ngOnInit() {
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.imfList = this.transformLogicNew(
          response.data.messageContextFieldsByVersion.attributes,
        );
        if (this.imfValue) {
          const data = JSON.parse(JSON.stringify(this.imfValue));
          this.getImfName(data);
        }
      }
    });
  }

  public emitValue() {
    this.getToolTip(this.imfList);
    this.emitIMFValue.emit({ value: this.selectedIMFValue, id: this.index });
  }

  private getToolTip(imfList) {
    imfList.forEach(val => {
      if (val.key === this.selectedIMFValue) {
        this.imfToolTip = val.nestedName;
      } else if (val.attributes) {
        this.getToolTip(val.attributes);
      }
    });
  }
  
  private transformLogicNew(data) {
    return data.map(item => {
      if (!item.attributes) {
        item.title = item.alias;
        item.key = this.nameLogic(item);
        item.isLeaf = true;
      } else {
        item.title = item.name;
        if (item.useCase !== '3') {
          item.key = item.alias;
          item.disabled = true;
        } else {
          item.key = this.nameLogic(item);
        }
      }
      if (item.attributes) {
        item.children = this.transformLogicNew(item.attributes);
      }
      return item;
    });
  }

  private nameLogic(item) {
    let name;
    if (item.useCase === '1' && !this.isMapper) {
      name = '${' + item.nestedName + '}';
    } else if (item.useCase === '2' && !this.isMapper) {
      name = '${message_exchange[GATEWAY_SERVICE].' + item.nestedName + '}';
    } else if (!this.isMapper) {
      name = '${message_exchange[GATEWAY_SERVICE].request_message[' + item.nestedName + ']}';
    } else {
      name = item.nestedName;
    }
    return name;
  }

  private getImfName = item => {
    let useCase = '1';
    if (item.indexOf('_message[') === -1 && !this.isMapper) {
      if (item.indexOf(']') === -1) {
        this.selectedIMFValue = item;
      } else {
        useCase = '2';
        let imfName = item.split('].');
        if (imfName && imfName[1]) {
          imfName = imfName[1].split('}');
          if (imfName && imfName[0]) {
            this.valueFromImf(imfName[0], this.imfList, useCase);
          }
        }
      }
    } else if (!this.isMapper) {
      useCase = '3';
      let imfName = item.split('message[');
      if (imfName && imfName[1]) {
        imfName = imfName[1].split(']');
        if (imfName && imfName[0]) {
          this.valueFromImf(imfName[0], this.imfList, useCase);
        }
      }
    } else {
      this.selectedIMFValue = item;
    }
  };

  private valueFromImf(field, list, useCase) {
    list.forEach(val => {
      if (
        field === val.nestedName &&
        (val.useCase === useCase || useCase === 3 || useCase === '3')
      ) {
        this.selectedIMFValue = val.key;
        this.imfToolTip = val.nestedName;
      } else if (val.attributes) {
        this.valueFromImf(field, val.attributes, useCase);
      }
    });
  }
}
