import {ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessErrorComponent } from './access-error.component';

xdescribe('AccessErrorComponent', () => {
  let component: AccessErrorComponent;
  let fixture: ComponentFixture<AccessErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessErrorComponent);
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
