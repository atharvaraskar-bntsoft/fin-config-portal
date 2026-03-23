import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UiSwitchComponent } from './ui-switch.component';

xdescribe('UiSwitchComponent', () => {
  let component: UiSwitchComponent;
  let fixture: ComponentFixture<UiSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UiSwitchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
