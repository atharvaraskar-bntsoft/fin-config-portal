import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessorAdapterRoutingModule } from './processor-adapter-routing.module';
import { ProcessorAdapterComponent } from '../processor-adapter/processor-adapter.component';
import { AlertModule, BoxModule } from 'bnt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProcessorAdapterCreateComponent } from './processor-adapter-create/processor-adapter-create.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [ProcessorAdapterComponent, ProcessorAdapterCreateComponent],
  imports: [
    SharedModule,
    AlertModule,
    BoxModule,
    CommonModule,
    FormsModule,
    ProcessorAdapterRoutingModule,
    NgxDatatableModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard], 
})
export class ProcessorAdapterModule {}
