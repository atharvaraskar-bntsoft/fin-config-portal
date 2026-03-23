import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rv-ui-switch',
  styleUrls: ['./ui-switch.component.scss'],
  templateUrl: './ui-switch.component.html',
})
export class UiSwitchComponent implements OnInit {
  @Input() public valueChange: Function;

  @Input() title: string;

  @Input() model: boolean;

  @Output() modelChange = new EventEmitter();

  @Input() value: any;

  public widgetId;

  constructor() {}

  ngOnInit() {
    this.value = this.value;
  }

  onChange() {
    this.modelChange.emit(this.model);
  }
}
