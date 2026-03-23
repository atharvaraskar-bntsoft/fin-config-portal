import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertModule, DatePickerRvModule, InputRvModule } from 'bnt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import { DeviceInfoComponent } from './device-info/device-info.component';
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [DeviceComponent, DeviceInfoComponent],
  imports: [
    SharedModule,
    AlertModule,
    DatePickerRvModule,
    CommonModule,
    DeviceRoutingModule,
    FormsModule,
    InputRvModule,
    ModalModule,
    NgbAlertModule,
    NgxDatatableModule,
    NgbDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe, AuthGuard],
})
export class DeviceModule {}
