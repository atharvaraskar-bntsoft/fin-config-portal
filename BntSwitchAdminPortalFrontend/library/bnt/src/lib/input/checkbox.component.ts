import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rv-checkbox',
  styleUrls: ['./checkbox.component.css'],
  templateUrl: './checkbox.component.html',
})
export class RvCheckboxComponent implements OnInit {
  @Input() public valueChange: Function;

  @Input() model: boolean;

  @Output() modelChange = new EventEmitter();

  public value: any;

  constructor() {}

  ngOnInit() {
    this.value = this.model;
  }

  onChange(e) {
    this.modelChange.emit(this.value);
  }
}
