import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SafQueueComponent } from './saf-queue.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '@app/services/alert.service';
import { InvalidLogService } from '@app/services/invalid-log.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
//import { ImportFileModule } from '@app/import-file/import-file.module';
import { ILocationState } from '@app/store/state/location.state';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  exceptionalQueueList,
  moveToSAFQueue,
  safDDLSelector,
  safQueueList,
} from '@app/store/selectors/invalid-log.selector';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import {
  GetException,
  GetSAFQueue,
  GetSAFQueueDDL,
  MoveToSAFQueue,
} from '@app/store/actions/invalid-log.action';
import { any } from 'underscore';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventEmitter } from '@angular/core';

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

const safQueueJSON = {
  // status: 'success',
  // message: null,
  // data: {
    'total-record': 100,
    safList: [
      {
        id: '00012204MM67u84x44Z3',
        noOfAttempts: 2,
        lastAttemptTime: 1650360323000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '36d78d4a-38ac-4ddc-b07a-8bedec04248e',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204N7Y9684x44Z4',
        noOfAttempts: 1,
        lastAttemptTime: 1650360200000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '0a4d2e0b-1e6b-46c1-be96-2148a34c4b84',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122049uuN6ZHH4ZHx',
        noOfAttempts: 1,
        lastAttemptTime: 1649855601000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '36f4835f-d366-4a8c-a93c-ef81a1d7fe9f',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204M7YM6ZHH4Ze3',
        noOfAttempts: 1,
        lastAttemptTime: 1649855551000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '358c4852-3713-47c5-854f-61f923403b78',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204uWY5NZHH4ZKS',
        noOfAttempts: 1,
        lastAttemptTime: 1649855261000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '9c47b587-0823-4a67-8289-951675769efe',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204Y7tu7ZHH4ZSZ',
        noOfAttempts: 1,
        lastAttemptTime: 1649852756000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: 'b9e78a68-f06f-425a-85a3-3f60130ba821',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122049utt7ZHH4SH8',
        noOfAttempts: 1,
        lastAttemptTime: 1649848026000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: 'f441667f-3dda-4479-92fe-31c7fb0b3f43',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '0001220457Mt5ZHH4SxK',
        noOfAttempts: 1,
        lastAttemptTime: 1649837863000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '37c3a426-351b-43f6-9172-7ad25d1e0a10',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204u9WW7ZHH4SZx',
        noOfAttempts: 1,
        lastAttemptTime: 1649756960000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: 'ed5315c1-9ab7-47ac-a5da-f017c400f901',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204YWN55ZHH443e',
        noOfAttempts: 1,
        lastAttemptTime: 1649752950000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '307a7180-a8df-4a12-b358-bd410daebc33',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '0001220496Y5NZHH44ei',
        noOfAttempts: 1,
        lastAttemptTime: 1649752890000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '7583b470-5269-4219-9ac3-17a70f9206f0',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122046MNNNZHH448H',
        noOfAttempts: 1,
        lastAttemptTime: 1649751830000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '1499a231-59a0-4396-85ef-fc1acdba42fb',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122047YWMNZHH4443',
        noOfAttempts: 1,
        lastAttemptTime: 1649749908000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '0de15e46-5e8e-4e4d-bdc3-a8e6ac8c771d',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204M656uZHix4ZZ',
        noOfAttempts: 1,
        lastAttemptTime: 1649696083000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: 'd5ffef9e-477d-40ee-ae46-4668208d22a7',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204NtN9WZHi444K',
        noOfAttempts: 1,
        lastAttemptTime: 1649695653000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '68049e89-f209-49dc-80b4-2e8bebcae9f4',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122046M5M7ZHi444S',
        noOfAttempts: 1,
        lastAttemptTime: 1649695524000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '0714b9bd-253d-4e43-a089-e4599c598ce4',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122047tNYYZHxx4ii',
        noOfAttempts: 1,
        lastAttemptTime: 1649694474000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '295a1a4d-cd66-4f55-a452-303401ef5fe1',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204M5W6MZHxx4ei',
        noOfAttempts: 1,
        lastAttemptTime: 1649694344000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '07d92d6e-98f7-43e7-bc79-d9dc50c78b4f',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122047ttt6ZHx44ZS',
        noOfAttempts: 1,
        lastAttemptTime: 1649693373000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '765776ab-8ae9-4d4a-9cd3-cf807e34eb04',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '0001220456tN5ZiKxS3K',
        noOfAttempts: 1,
        lastAttemptTime: 1649430254000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'SUCCESS',
          name: 'Success',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: 'd51704d3-d7cc-407e-9d23-1f229785f656',
            safingStage: 'SUCCESS',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
    ],
    'page-no': 1,
    'total-filtered-record': 20,
  // },
};

const exceptionQueueJSON = {
  // status: 'success',
  // message: 'Find Excpetion-Queue-List',
  // data: {
    'total-record': 133,
    'page-no': 1,
    exceptionList: [
      {
        id: '00012204N6tN584x4484',
        noOfAttempts: 5,
        lastAttemptTime: 1650363858000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: '21',
            serviceId: '94c9a006-a959-4ddb-97ab-9c8300871f16',
            safingStage: 'REQUIRED',
            executionStatus: 'COMPLETED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122047666tZHH48x3',
        noOfAttempts: 5,
        lastAttemptTime: 1650359274000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '89cef633-d5b1-4f32-b080-3d51c6ac01ef',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '0001220479Nt7ZHH48xH',
        noOfAttempts: 5,
        lastAttemptTime: 1650359274000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '6774661c-e04a-45b3-8f36-a6b656fe1087',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122047N5W9ZHH48xi',
        noOfAttempts: 5,
        lastAttemptTime: 1650359274000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '20ca7d15-83a4-442c-9863-5a7195265ecf',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122046776MZHH48xe',
        noOfAttempts: 5,
        lastAttemptTime: 1650359264000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: 'b8c6202d-9d9d-4727-b488-0d9dd7926bb7',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122046Y6t7ZHH48xx',
        noOfAttempts: 5,
        lastAttemptTime: 1650359264000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: 'd77c0e3d-b11d-4131-9e1b-d0d31af700ea',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122045YN5MZHH48xS',
        noOfAttempts: 5,
        lastAttemptTime: 1650359254000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: 'fa007daf-40a4-43d1-a34f-1daea2fffc85',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122046WY6tZHH48x8',
        noOfAttempts: 5,
        lastAttemptTime: 1650359254000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '194ac791-ca39-4bef-9978-6e6b8a978782',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122045N9M7ZHH48x4',
        noOfAttempts: 5,
        lastAttemptTime: 1650359244000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '65636de1-7c23-46bf-bb26-8c9606b3daf5',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '000122045WWt9ZHH48K3',
        noOfAttempts: 5,
        lastAttemptTime: 1650359244000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: 'f14b7d69-c6ff-40f0-b154-5ad36b03fad3',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204Y7ttuZHH48Kx',
        noOfAttempts: 5,
        lastAttemptTime: 1650359234000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '728caba8-673a-44dd-902e-8011bfa0bef6',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204YMYYYZHH48KZ',
        noOfAttempts: 5,
        lastAttemptTime: 1650359224000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '8ab19ddc-64be-49d2-99c5-da4f8f5cc3dd',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204u9N77ZHH48K4',
        noOfAttempts: 5,
        lastAttemptTime: 1650359214000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '5fce6c4a-76b2-436b-89d6-ef6bdda81314',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204uW799ZHH488H',
        noOfAttempts: 5,
        lastAttemptTime: 1650359214000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: 'f3164886-dcc3-4060-b6f0-de3834f5c19b',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204tY59NZHH488e',
        noOfAttempts: 5,
        lastAttemptTime: 1650359204000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: 'c3a9eff1-2e17-49c9-a502-1d1f28bd238e',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204ttMtWZHH488x',
        noOfAttempts: 5,
        lastAttemptTime: 1650359204000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: 'b45094b6-ce64-4a9d-b1f1-f515d70d9228',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204NNY67ZHH488S',
        noOfAttempts: 5,
        lastAttemptTime: 1650359194000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: 'a7bd4a62-48d4-4e01-adcf-d799f819d450',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204NYNM6ZHH488Z',
        noOfAttempts: 5,
        lastAttemptTime: 1650359194000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '8f4d8c9f-529f-457d-afa5-7c69f61fec98',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204M77t7ZHH4884',
        noOfAttempts: 5,
        lastAttemptTime: 1650281193000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: '1b7a0a07-912e-48bb-a148-3e3c68fc4706',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
      {
        id: '00012204Mu5WMZHH48ZH',
        noOfAttempts: 5,
        lastAttemptTime: 1650281170000,
        nextAttemptTime: null,
        route: '',
        deleted: '0',
        status: {
          id: 'EXCEPTION',
          name: 'Exception',
        },
        dependentData: {
          name: 'AUTH_SERVICE',
          type: 'executeService',
          status: {
            routeId: null,
            serviceId: 'f7ce79d6-ee85-4caa-a271-e65ff55c7b3e',
            safingStage: 'REQUIRED',
            executionStatus: 'STOPPED',
          },
          safingCondition: 'saf_34_45',
        },
      },
    ],
    'total-filtered-record': 20,
  // },
};

const rowData = {
  deleted: '0',
  dependentData: {
    name: 'AUTH_SERVICE',
    safingCondition: 'saf_34_45',
    status: {
      executionStatus: 'COMPLETED',
      routeId: '21',
      safingStage: 'SUCCESS',
      serviceId: '070fb392-0d08-425e-90e4-4f863017c4f6',
    },
    type: 'executeService',
  },
  id: '00012204t9WW684x448S',
  lastAttemptTime: 1650363699000,
  nextAttemptTime: null,
  noOfAttempts: 2,
  route: '',
  status: {
    id: 'SUCCESS',
    name: 'Success',
  },
};

const safStatus = {
  status: 'success',
  message: 'Find Filter Status List',
  data: [
    {
      id: 'QUEUED',
      name: 'Queued',
    },
    {
      id: 'IN_PROGRESS',
      name: 'In Progress',
    },
    {
      id: 'COMPLETED',
      name: 'Completed',
    },
    {
      id: 'DECLINED',
      name: 'Declined',
    },
    {
      id: 'FAILED',
      name: 'Failed',
    },
    {
      id: 'FAILED_TIMEOUT',
      name: 'Failed Timeout',
    },
    {
      id: 'INTERRUPTED',
      name: 'Interrupted',
    },
    {
      id: 'SUCCESS',
      name: 'Success',
    },
  ],
};

const moveToSafJSONFailure = {
  status: 'failure',
  message: 'Queue movement failed',
  data: null,
};

xdescribe('SafQueueComponent', () => {
  let component: SafQueueComponent;
  let fixture: ComponentFixture<SafQueueComponent>;
  let mockStore: MockStore<IAppState>;
  let mocksafQueueList: MemoizedSelector<any, any>;
  let mockexceptionalQueueList;
  let mocksafDDLSelector;
  let setDefaultLangSpy: jasmine.Spy;
  let invalidLogService: InvalidLogService;
  let mockmoveToSAFQueue;
  let router: Router;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [SafQueueComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        AlertService,
        SnotifyService,
        HttpClient,
        NzModalService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        InvalidLogService,
        { provide: InvalidLogService, useValue: invalidLogService },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        // TabsModule,
        DatePickerRvModule,
        RouterTestingModule.withRoutes([{ path: 'logs/saf-queue', component: SafQueueComponent }]),
        HttpClientTestingModule,
        NgxDatatableModule,
        StoreModule.forRoot({}),
        //ImportFileModule,
        TranslateModule.forRoot({
          loader: {
            deps: [HttpClient],
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
          },
          missingTranslationHandler: {
            provide: MissingTranslationHandler,
            useClass: MyMissingTranslationHandler,
          },
          useDefaultLang: true,
        }),
      ],
    }).compileComponents();
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(SafQueueComponent);
    component = fixture.componentInstance;
    mockexceptionalQueueList = mockStore.overrideSelector(exceptionalQueueList, exceptionQueueJSON);
    mocksafQueueList = mockStore.overrideSelector(safQueueList, safQueueJSON);
    mocksafDDLSelector = mockStore.overrideSelector(safDDLSelector, safStatus);
    mockmoveToSAFQueue = mockStore.overrideSelector(moveToSAFQueue, safStatus);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
  });

  it('loadPage fuction should call after load the component', () => {
    spyOn(component as any, '_transFilters').and.callThrough();
    (component as any).loadPage(1);
    expect(component.request).toBe(false);
    expect((component as any)._transFilters).toHaveBeenCalled();
  });

  it('should render Table', () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('should render the dropdown ', () => {
    expect(component.safeStatusDDL).toEqual(safStatus.data);
  });

  it('Component should contain Property', () => {
    expect(component.loading).toBe(false);
    // expect(component.rows).toBeTruthy();
    expect(component.rowHeight).toBe(40);
    expect(component.headerHeight).toBe(40);
    expect(component.page).toBe(1);
    expect(component.request).toBe(false);
    expect(component.searchResetButton).toBe(true);
    expect(component.currentPagination).toBe('20');
  });

  it('should searchResetButton to be false', () => {
    component.searchResetButton = false;
    expect(component.searchResetButton).toBe(false);
  });

  it('should isException to be true', () => {
    component.isException = true;
    expect(component.isException).toBe(true);
  });

  it('should isException to be false', () => {
    component.isException = false;
    expect(component.isException).toBe(false);
  });

  it('should call navigateToSAF function', () => {
    component.navigateToSAF();
    expect(component.navigateToSAF).toBeDefined;
    expect(component.navigateToSAF).toHaveBeenCalled;
  });

  it('should dispatch GetSAFQueue in ngOnInit', () => {
    const expectedActionSaf = new GetSAFQueue(component.data);
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough(); // spy on the store
    mocksafQueueList = mockStore.overrideSelector(safQueueList, safQueueJSON);
    component.isException = false;
    (component as any).loadPage(component.page);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedActionSaf);
  });

  it('getFilterData fuction should call form HTMl', () => {
    const data = { id: 24 };
    component.getFilterData(data, 'status');
  });

  it('getFilterData fuction should call form HTMl if type is route', () => {
    const data = { id: 25 };
    component.getFilterData(data, 'route');
  });

  it('refreshPage fuction should call click on submit button form this HTMl', () => {
    component.refreshPage();
    expect(component.searchResetButton).toEqual(true);
    expect(component.isChecked).toEqual(false);
    expect(component.filter).toEqual('');
    expect(component.filterData).toEqual({});
  });

  it('viewData fuction should call click on view button form this HTMl', () => {
    component.viewData(rowData);
    expect(component.isTableVisible).toEqual(true);
  });

  it('should Angular calls getExceptionQueueList', () => {
    component.isException = true;
    component.getExceptionQueueList();
    // expect(component.rows).not.toBeNull();
  });

  it('should call resetFilter function', () => {
    component.resetFilter();
  });

  it('should call deleteFilter function', () => {
    component.deleteFilter();
  });

  it('should call deleteSAF function', () => {
    const data = { id: 56575 };
    component.deleteSAF(data);
  });

  afterEach(() => {
    component.isException = false;
    fixture.destroy();
  });
});
