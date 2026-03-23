import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rv-pretty-json',
  styleUrls: ['./pretty-json.component.scss'],
  templateUrl: './pretty-json.component.html',
})
export class PrettyJsonComponent implements OnInit {
  @Input() public obj: any;

  constructor() {}

  ngOnInit() {}
}
