import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tree-structure',
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.scss'],
})
export class TreeStructureComponent implements OnInit {
  @Input() jsonData;
  @Input() resimf;
  @Input() useCase;
  @Input() disabled = false;
  @Input() readOnlyFlag = false;
  @Output() public ImfValue = new EventEmitter<Object>();
  public isAttribute = [];
  public imfToolTip;
  expandKeys = ['account_number'];
  value?: string;
  constructor() {}
  nodes = [];
  ngOnInit() {
    const data = this.jsonData?.attributes || [];
    this.nodes = this.transformLogic(data, null);
    this.imfToolTip = this.resimf ? JSON.parse(JSON.stringify(this.resimf)) : '';
    this.value = this.resimf;
    if (this.useCase) {
      this.value = this.value + '%' + this.useCase;
    }
  }

      ngOnChanges(changes: SimpleChanges): void {
        const data = this.jsonData?.attributes || [];
        this.nodes = this.transformLogic(data, null);
        this.imfToolTip = this.resimf ? JSON.parse(JSON.stringify(this.resimf)) : '';
        this.value = this.resimf;
        if (this.useCase) {
          this.value = this.value + '%' + this.useCase;
        }
      } 

  transformLogic(data, value) {
    return data.map(item => {
      if (!item.attributes) {
        item.title = item.alias;
        item.key = item.nestedName;
        item.isLeaf = true;
        if (item.useCase) {
          item.key = item.key + '%' + item.useCase;
        }
      } else {
        item.title = item.name;
        item.key = item.nestedName;
        if (item.useCase !== '3') {
          item.disabled = true;
        }
        if (item.useCase) {
          item.key = item.key + '%' + item.useCase;
        }
      }
      if (item.attributes) {
        item.children = this.transformLogic(item.attributes, '');
      }
      return item;
    });
  }

  onChange($event: string): void {
    if ($event && $event.indexOf('%') !== -1) {
      this.imfToolTip = $event.split('%')[0];
    }
    this.ImfValue.emit($event);
  }

  public selectImfFn(value) {
    if (this.jsonData.name) {
      if (this.jsonData.name === 'message') {
        this.ImfValue.emit(value);
      } else {
        const imf = this.jsonData.name + '.' + value;
        this.ImfValue.emit(imf);
      }
    } else {
      this.ImfValue.emit(value);
    }
  }
  public callfn(i) {
    this.isAttribute[i] = true;
  }
}
