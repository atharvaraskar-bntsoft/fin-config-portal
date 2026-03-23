import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChildWorkflowComponent } from './child-workflow.component';

xdescribe('ChildWorkflowComponent', () => {
  let component: ChildWorkflowComponent;
  let fixture: ComponentFixture<ChildWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildWorkflowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildWorkflowComponent);
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
