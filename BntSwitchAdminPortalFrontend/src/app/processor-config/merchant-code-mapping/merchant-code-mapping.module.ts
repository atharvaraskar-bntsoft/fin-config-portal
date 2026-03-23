import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule } from 'bnt';
import { MerchantCodeMappingRoutingModule } from './merchant-code-mapping-routing.module';
import { MerchantCodeMappingComponent } from './merchant-code-mapping.component';
import { MerchantCodeMappingCreateComponent } from './merchant-code-mapping-create/merchant-code-mapping-create.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [MerchantCodeMappingComponent, MerchantCodeMappingCreateComponent],
  imports: [
    SharedModule,
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    MerchantCodeMappingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    NzPopconfirmModule
  ],
  providers: [AuthGuard],
})
export class MerchantCodeMappingModule {}
