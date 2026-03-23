import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TxnKeyLableRoutingModule } from './txn-key-lable-routing.module';
import { TxnKeyLableComponent } from './txn-key-lable.component';
import { TxnKeyLableCreateComponent } from './txn-key-lable-create/txn-key-lable-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  InputGroupModule,
  InputTextModule as mkInputTextModule,
  BoxModule,
  AlertModule,
  InputRvModule,
} from 'bnt';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [TxnKeyLableComponent, TxnKeyLableCreateComponent],
  imports: [
    CommonModule,
    TxnKeyLableRoutingModule,
    SharedModule,
    AlertModule,
    BoxModule,
    InputRvModule,
    FormsModule,
    InputGroupModule,
    mkInputTextModule,
    NgxDatatableModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
})
export class TxnKeyLableModule {}
