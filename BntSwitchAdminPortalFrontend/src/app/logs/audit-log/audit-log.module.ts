import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogComponent } from './audit-log.component';
import { AuditLogRoutingModule } from './audit-log-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerRvModule, AlertModule } from 'bnt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { AuditLogDetailsComponent } from './audit-log-details/audit-log-details.component';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { PrettyJsonRvModule } from 'bnt';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [AuditLogComponent, AuditLogDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    AuditLogRoutingModule,
    ModalModule,
    NgSelectModule,
    DatePickerRvModule,
    FormsModule,
    AlertModule,
    NgbAlertModule,
    NgbDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    PrettyJsonRvModule,
  ],
  providers: [AuthGuard],
})
export class AuditLogModule {}
