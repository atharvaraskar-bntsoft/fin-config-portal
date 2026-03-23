// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AlertService } from '@app/services/alert.service';
// import { SharedModule } from '@app/shared/shared.module';
// import { IAppState } from '@app/store/state/app.state';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { StoreModule } from '@ngrx/store';
// import { MockStore, provideMockStore } from '@ngrx/store/testing';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { SnotifyService, ToastDefaults } from 'ng-snotify';
// import { NzModalService } from 'ng-zorro-antd/modal';
// import { AlertModule } from 'bnt';
// // import { MainService } from '../main.service';
// // import { MainComponent } from './main.component';
// import { EventEmitter } from '@angular/core';
// import { of } from 'rxjs'
// import { L1AdminPermissionComponent } from './l1-admin-permission.component';
// import { L1AdapterService } from '@app/services/l1-adapter.service';
// class translateServiceMock {
//   public onLangChange: EventEmitter<any> = new EventEmitter();
//   public onTranslationChange: EventEmitter<any> = new EventEmitter();
//   public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
//   public get(key: any): any {
//     return of(key);
//   }
// };
// xdescribe('L1AdminPermissionComponent', () => {
//   let component: L1AdminPermissionComponent;
//   let fixture: ComponentFixture<L1AdminPermissionComponent>;
//   let mockStore: MockStore<IAppState>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ L1AdminPermissionComponent ],
//       providers : [TranslateService,NzModalService,AlertService,
//         SnotifyService,L1AdapterService,FormBuilder,
//         { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
//         { provide: TranslateService,  useClass: translateServiceMock },
//         provideMockStore(),
//       ],
//       imports: [
//         StoreModule,
//         SharedModule,
//         FormsModule,
//         RouterTestingModule,
//         ReactiveFormsModule,
//         // MockStoreModule.forRoot('Location', {}),
//         AlertModule,
//         StoreModule.forRoot({}),
//         BrowserAnimationsModule,
//         HttpClientTestingModule,
//         TranslateModule,
//       ],
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MainComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   it(' fuction should make click close button', () => {
//     component.oncancel();
//     expect(component.visible).toEqual(false);
//   });
//   it(' fuction should make edit tha data list in html', () => {
//     component.editExtract();
//     expect(component.visible).toEqual(true);
//   });
//   it(' fuction should open customMapper list in html', () => {
//     component.opensetCustomMapper();
//     expect(component.setCustomMapper).toEqual(true);
//   });
//   it(' fuction should close script list in html', () => {
//     component.closeScript(event);
//     expect(component.visible).toEqual(false);
//   });
//   it(' fuction should close script list in html', () => {
//     component.closeMapperReq(event);
//     expect(component.visible).toEqual(false);
//   });
//   it(' fuction should close script Mapper list in html', () => {
//     component.closeMapperRes(event);
//     expect(component.visible).toEqual(false);
//   });
//   it(' fuction should close script Mapper list in html', () => {
//     component.closeJoin(event);
//     expect(component.visible).toEqual(false);
//   });
//   it(' fuction should save script Mapper list in html', () => {
//     component.saveJoin(event);
//     expect(component.visible).toEqual(false);
//   });
//   it(' fuction should save extract Mapper list in html', () => {
//     component.saveExtract(event);
//     expect(component.visible).toEqual(false);
//   });
//   it(' fuction should close extract Mapper list in html', () => {
//     component.closeExtract(event);
//     expect(component.visible).toEqual(false);
//   });
//   it(' fuction should close extract Mapper list in html', () => {
//     component.close(event);
//     expect(component).toBeTruthy;
//   });
//   it(' fuction should select  list in html', () => {
//     component.selectType(event);
//     expect(component.currentItem.networkService).toHaveBeenCalled;
//     // expect(component).toBeTruthy;
//   });
//   it(' fuction should close extract Mapper list in html', () => {
//     component.submitForm();
//     expect(component.isCopyAsIs).toEqual(false);
//   });
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });