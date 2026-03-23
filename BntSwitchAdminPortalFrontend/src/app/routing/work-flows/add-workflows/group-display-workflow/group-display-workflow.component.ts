import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-display-workflow',
  templateUrl: './group-display-workflow.component.html',
  styleUrls: ['./group-display-workflow.component.scss'],
})
export class GroupDisplayWorkflowComponent implements OnInit {
  @Input() services;
  @Input() serviceId;
  @Input() readOnlyFlag = false;
  constructor() {}

  ngOnInit() {}
}
