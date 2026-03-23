import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarRightInnerComponent } from './sidebar-right-inner.component';
import { TabsModule, LayoutModule } from 'bnt';

describe('SidebarRightInnerComponent', () => {
  let component: SidebarRightInnerComponent;
  let fixture: ComponentFixture<SidebarRightInnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarRightInnerComponent],
      imports: [LayoutModule.forRoot(null), TabsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRightInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
