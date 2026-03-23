import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HttpUrlencodedComponent } from './http-urlencoded.component';

xdescribe('HttpUrlencodedComponent', () => {
  let component: HttpUrlencodedComponent;
  let fixture: ComponentFixture<HttpUrlencodedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpUrlencodedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpUrlencodedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
