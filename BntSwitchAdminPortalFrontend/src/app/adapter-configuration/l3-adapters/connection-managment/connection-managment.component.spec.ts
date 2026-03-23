import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConnectionManagmentComponent } from './connection-managment.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';
import { SubscribeService } from '@app/services/subscribe.services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  public setDefaultLang(key: any): any {
    return of(key);
  }
}
class matDialogMock {

  public close(key: any): any { }
}

describe('ConnectionManagmentComponent', () => {
  let component: ConnectionManagmentComponent;
  let fixture: ComponentFixture<ConnectionManagmentComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  let matDialog: MatDialogRef<ConnectionManagmentComponent>;

  beforeEach((() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [ConnectionManagmentComponent],
      providers: [
        SnotifyService,
        SubscribeService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: AlertService, useValue: alertService },
        { provide: MatDialogRef, useClass: matDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        StoreModule.forRoot({}),
      ],
    })
      .compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ConnectionManagmentComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    fixture.detectChanges();
  }));



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
