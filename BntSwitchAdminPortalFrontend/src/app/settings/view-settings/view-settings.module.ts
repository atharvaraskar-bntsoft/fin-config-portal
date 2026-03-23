import { MasterConfigurationDetailsComponent } from './../master-configuration/master-configuration-details/master-configuration-details.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ViewSettingsComponent } from './view-settings.component';
import { ViewSettingsRoutingModule } from './view-settings-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MasterConfigurationComponent } from '../master-configuration/master-configuration.component';

@NgModule({
  declarations: [
    ViewSettingsComponent,
    MasterConfigurationComponent,
    MasterConfigurationDetailsComponent,
  ],
  imports: [
    SharedModule,
    AlertModule,
    DatePickerRvModule,
    CommonModule,
    FormsModule,
    ModalModule,
    NgbAlertModule,
    NgxDatatableModule,
    NgbDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    ViewSettingsRoutingModule,
  ],
  providers: [DatePipe],
})
export class ViewSettingsModule {}
