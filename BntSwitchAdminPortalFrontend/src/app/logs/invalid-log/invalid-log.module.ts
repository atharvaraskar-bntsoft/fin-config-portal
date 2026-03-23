import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidLogRoutingModule } from './invalid-log-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerRvModule, PrettyJsonRvModule } from 'bnt';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { InvalidLogComponent } from './invalid-log.component';
import { SafQueueComponent } from '../saf-queue/saf-queue.component';

@NgModule({
  declarations: [InvalidLogComponent, SafQueueComponent],
  imports: [
    SharedModule,
    CommonModule,
    NgxDatatableModule,
    InvalidLogRoutingModule,
    ModalModule,
    NgSelectModule,
    DatePickerRvModule,
    FormsModule,
    PrettyJsonRvModule,
  ],
  providers: [AuthGuard],
})
export class InvalidLogModule {}
