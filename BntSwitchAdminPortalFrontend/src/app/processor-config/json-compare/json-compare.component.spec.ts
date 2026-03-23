import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JsonCompareComponent } from './json-compare.component';

describe('JsonCompareComponent', () => {
  let component: JsonCompareComponent;
  let fixture: ComponentFixture<JsonCompareComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
