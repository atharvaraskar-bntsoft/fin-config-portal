import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareConfigurationsComponent } from './share-configurations.component';

describe('ShareConfigurationsComponent', () => {
  let component: ShareConfigurationsComponent;
  let fixture: ComponentFixture<ShareConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
