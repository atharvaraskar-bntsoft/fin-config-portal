import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-workflow',
  templateUrl: './display-workflow.component.html',
  styleUrls: ['./display-workflow.component.scss'],
})
export class DisplayWorkflowComponent implements OnInit {
  @Input() services;
  @Input() serviceId;

  constructor() {}

  ngOnInit() {}
}
