import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child-workflow',
  templateUrl: './child-workflow.component.html',
  styleUrls: ['./child-workflow.component.scss'],
})
export class ChildWorkflowComponent implements OnInit {
  @Input() services;
  @Input() serviceId;

  constructor() {}

  ngOnInit() {}
}
