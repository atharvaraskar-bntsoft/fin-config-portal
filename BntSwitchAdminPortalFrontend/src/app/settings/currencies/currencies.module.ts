import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule, InputRvModule } from 'bnt';
import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [CurrenciesComponent],
  imports: [
    SharedModule,
    AlertModule,
    CommonModule,
    CurrenciesRoutingModule,
    FormsModule,
    InputRvModule,
    NgSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
})
export class CurrenciesModule {}
