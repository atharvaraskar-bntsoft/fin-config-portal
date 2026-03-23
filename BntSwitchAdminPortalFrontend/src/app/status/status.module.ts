import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertModule, DatePickerRvModule, PrettyJsonRvModule } from 'bnt';
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
import { StatusComponent } from './status.component';
import { StatusRoutingModule } from './status-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [StatusComponent],
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
    NgxJsonViewerModule,
    PrettyJsonRvModule,
    ReactiveFormsModule,
    StatusRoutingModule,
  ],
  providers: [AuthGuard],
})
export class StatusModule {}
