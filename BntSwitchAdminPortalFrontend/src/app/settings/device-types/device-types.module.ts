import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  InputRvModule } from 'bnt';
import { DeviceTypesRoutingModule } from './device-types-routing.module';
import { DeviceTypesComponent } from './device-types.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [DeviceTypesComponent],
  imports: [
    SharedModule,
    CommonModule,
    InputRvModule,
    DeviceTypesRoutingModule,
    NgxDatatableModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [AuthGuard],
})
export class DeviceTypesModule {}
