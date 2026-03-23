import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RuntimePropertiesComponent } from './runtime-properties.component';
import { RuntimePropertiesService } from '@app/services/runtime-Properties.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { FileService } from '../services/file.service';
class RuntimePropertiesServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public getRuntimeProperty(): any {
    return of(runtimePropertyJson);
  }
} 
const runtimePropertyJson = {
  status: 'success',
  message: 'Get all files',
  data: { pageNo: 0, totalRecords: 0, totalFilterRecords: 0, content: [] },
};
describe('RuntimePropertiesComponent', () => {
  let component: RuntimePropertiesComponent;
  let fixture: ComponentFixture<RuntimePropertiesComponent>;
  let mockStore: MockStore<IAppState>;
  let runtimePropertiesService: RuntimePropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuntimePropertiesComponent],
      providers: [
        RuntimePropertiesService,
        FileService,
        { provide: RuntimePropertiesService, useClass: RuntimePropertiesServiceMock },
        provideMockStore(),
      ],
      imports: [],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(RuntimePropertiesComponent);
    component = fixture.componentInstance;
    component.fatchFolderData();
    component.folderList = [];
    component.folderList.length = 0;
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
