import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpPageComponent } from './help-page.component';

describe('HelpPageComponent', () => {
  let component: HelpPageComponent;
  let fixture: ComponentFixture<HelpPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HelpPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show message help-page works!!!', () => {
    const p: HTMLElement = fixture.nativeElement.querySelector('p');
    const text = p.innerText;
    expect(text).toBe('help-page works!');
  });
});
