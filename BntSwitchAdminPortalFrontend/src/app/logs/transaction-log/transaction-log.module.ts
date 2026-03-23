import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionLogComponent } from './transaction-log.component';
import { TransactionLogRoutingModule } from './transaction-log-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import { RequestMatrixComponent } from './request-matrix/request-matrix.component';
import { ResponseMatrixComponent } from './response-matrix/response-matrix.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { PrettyJsonRvModule, DatePickerRvModule } from 'bnt';
import { TransactionLogDetailsComponent } from './transaction-log-details/transaction-log-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ViewJsonComponent } from './view-json/view-json.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@NgModule({
  declarations: [
    TransactionLogComponent,
    RequestMatrixComponent,
    ResponseMatrixComponent,
    TransactionLogDetailsComponent,
    ViewJsonComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    NgxDatatableModule,
    TransactionLogRoutingModule,
    ModalModule,
    DatePickerRvModule,
    PrettyJsonRvModule,
    NgSelectModule,
    FormsModule,
    ClipboardModule,
    NzToolTipModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzCollapseModule
  ],
  providers: [AuthGuard],
})
export class TransactionLogModule {}
