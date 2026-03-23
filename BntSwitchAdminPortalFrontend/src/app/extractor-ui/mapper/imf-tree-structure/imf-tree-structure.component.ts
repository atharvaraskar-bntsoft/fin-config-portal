import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { MainService } from '../main.service';

@Component({
  selector: 'app-imf-extract',
  templateUrl: './imf-tree-structure.component.html',
  styleUrls: ['./imf-tree-structure.component.scss'],
})
export class IMFExtractComponent implements OnInit {
  @Input() imfList = [];
  @Input() index;
  @Input() disabled = false;
  @Input() imfValue;
  @Input() readOnlyFlag = false;
  @Input() style = 'width: 280px';
  @Input() className;
  public selectedIMFValue;
  public imfToolTip;
  public imfFeature: any;
  @Input() feature: any;
  @Input() placeHolder = 'Select IMF';
  @Input() internalFormatError;
  @Output() public emitIMFValue: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private _store: Store<IAppState>,
    private _service: MainService) {
    this.imfFeature = this.feature;
    if (this.imfValue) {
      const data = JSON.parse(JSON.stringify(this.imfValue));
      this.getImfName(data);
    }
  }

  public ngOnInit() {
    this.imfFeature = this.feature;
    if (this.imfValue) {
      const data = JSON.parse(JSON.stringify(this.imfValue));
      this.getImfName(data);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.imfValue && changes.imfValue.currentValue) {
      const data = JSON.parse(JSON.stringify(this.imfValue));
      this.getImfName(data);
    }
  }

  public emitValue() {
    this.getToolTip(this.imfList);
    if (this.feature === "MAPPER") {
      this.emitIMFValue.emit({
        value: this.selectedIMFValue, id: this.index,
      });
    }
    else {
      this.emitIMFValue.emit(this.selectedIMFValue);
     }
  }


  private getToolTip(imfList) {
    imfList.forEach(val => {
      if (val.key === this.selectedIMFValue) {
        this.imfToolTip = val.nestedName;
      }
      else if (val.attributes) {
        this.getToolTip(val.attributes);
      }
    });
  }

  private getImfName = item => {
    this.valueFromImf(item, this.imfList);
  };

  private valueFromImf(field, list) {
    list.forEach(val => {
      if (field === val.title) {
        this.selectedIMFValue = val.key;
        this.imfToolTip = val.title;
      } else if (val.children) {
        this.valueFromImf(field, val.children);
      }
    });
  }
}
