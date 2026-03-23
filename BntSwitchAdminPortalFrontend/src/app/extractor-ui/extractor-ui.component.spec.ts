import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExtractorUiComponent } from './extractor-ui.component';

xdescribe('ExtractorUiComponent', () => {
  let component: ExtractorUiComponent;
  let fixture: ComponentFixture<ExtractorUiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractorUiComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractorUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
