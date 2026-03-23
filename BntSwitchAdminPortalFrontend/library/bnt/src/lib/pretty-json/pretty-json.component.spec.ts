import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PrettyJsonComponent } from './pretty-json.component';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
xdescribe('PrettyJsonComponent', () => {
  let component: PrettyJsonComponent;
  let fixture: ComponentFixture<PrettyJsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrettyJsonComponent],
      imports:[SharedModule,FormsModule,CommonModule,ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettyJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
