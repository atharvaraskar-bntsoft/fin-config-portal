import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MainService } from '@app/extractor-ui/mapper/main.service';
import { AlertService } from '@app/services/alert.service';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule } from 'bnt';
import { SharedModule } from '../shared.module';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { AddRoleComponent } from './add-role.component';
import { AddRoleService } from '@app/services/add-role.service';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}
xdescribe('AddRoleComponent', () => {
  let component: AddRoleComponent;
  let fixture: ComponentFixture<AddRoleComponent>;
  let mockStore: MockStore<IAppState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoleComponent],
      imports: [
        StoreModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        MainService,
        UntypedFormBuilder,
        AddRoleService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(' fuction should make click close button', () => {
    component.close();
    expect(component.visibleRolePopup).toEqual(false);
  });
  it('click button fuction should save the data in html list', () => {
    component.save();
    expect(component.saveRoles.emit).toBeTruthy;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
