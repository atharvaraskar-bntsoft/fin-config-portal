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
import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsComponent } from './approvals.component';
import { ApprovalsDetailsComponent } from './approvals-details/approvals-details.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [ApprovalsComponent, ApprovalsDetailsComponent],
  imports: [
    SharedModule,
    AlertModule,
    DatePickerRvModule,
    CommonModule,
    FormsModule,
    PrettyJsonRvModule,
    ModalModule,
    NgbAlertModule,
    NgxDatatableModule,
    NgbDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    ApprovalsRoutingModule,
  ],
  providers: [DatePipe, AuthGuard],
})
export class ApprovalsModule {}
