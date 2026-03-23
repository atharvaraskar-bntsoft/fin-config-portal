import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChildWorkflowsV1Component } from './child-workflows-v1.component';
//@TODO :: ChildWorkflowsV1Component not used in application verify and delete
xdescribe('ChildWorkflowsV1Component', () => {
  let component: ChildWorkflowsV1Component;
  let fixture: ComponentFixture<ChildWorkflowsV1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChildWorkflowsV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildWorkflowsV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
