import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BinTableRoutingModule } from './bin-table-routing.module';
import { BinTableComponent } from './bin-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { SharedModule } from '@app/shared/shared.module';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { BinTableDetailsComponent } from './bin-table-details/bin-table-details.component';
import { AccountTypeDetailsComponent } from './account-type-details/account-type-details.component';
import { EmvMappingComponent } from '../emv-mapping/emv-mapping.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [
    BinTableComponent,
    EmvMappingComponent,
    BinTableDetailsComponent,
    AccountTypeDetailsComponent,
  ],
  imports: [
    CommonModule,
    BinTableRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AlertModule,
    SharedModule,
    DatePickerRvModule,
    MonacoEditorModule,
  ],
  providers: [AuthGuard],
})
export class BinTableModule {}
