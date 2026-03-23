import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { AlertModule } from 'bnt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { HistoryComponent } from './history.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [HistoryComponent, HistoryDetailComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
  ],
  providers: [AuthGuard],
})
export class HistoryModule {}
