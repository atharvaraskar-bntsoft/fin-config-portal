import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarLeftComponent } from './sidebar-left.component';

import { BoxModule } from 'bnt';

describe('SidebarLeftComponent', () => {
  let component: SidebarLeftComponent;
  let fixture: ComponentFixture<SidebarLeftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarLeftComponent],
      imports: [BoxModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
