import {ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDisplayWorkflowComponent } from './group-display-workflow.component';

describe('GroupDisplayWorkflowComponent', () => {
  let component: GroupDisplayWorkflowComponent;
  let fixture: ComponentFixture<GroupDisplayWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDisplayWorkflowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDisplayWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
